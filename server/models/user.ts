import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

export interface UserModel {
  role: string
  id: string
  nickname: string
  address: string
  province: string
  country: string
  city: string
  sex: 0 | 1
  email: string
  avatarUrl: string
  password: string
  hashed_password: string
  loginAttempts: number
  lockUntil: number
  meta: {
    createdAt: number
    updatedAt: number
  }
}

const SALT_WORK_FACTOR = 10
const MAX_LOGIN_ATTEMPTS = 5
const LOCK_TIME = 2 * 60 * 60 * 1000
const Schema = mongoose.Schema

const UserSchema = new Schema<UserModel>({
  role: {
    type: String,
    default: 'user',
  },
  id: String,
  nickname: String,
  address: String,
  province: String,
  country: String,
  city: String,
  sex: String,
  email: String,
  avatarUrl: String,
  password: String,
  hashed_password: String,
  loginAttempts: {
    type: Number,
    required: true,
    default: 0,
  },
  lockUntil: Number,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
})

UserSchema.virtual('isLocked').get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now())
})

UserSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  }
  else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

UserSchema.pre('save', function (next) {
  if (!this.isModified('password'))
    return next()

  bcrypt.genSalt(SALT_WORK_FACTOR, (err: mongoose.CallbackError | undefined, salt: any) => {
    if (err)
      return next(err)

    bcrypt.hash(this.password, salt, (error: mongoose.CallbackError | undefined, hash: string) => {
      if (error)
        return next(error)

      this.password = hash
      next()
    })
  })
})

UserSchema.methods = {
  comparePassword(_password: string, password: string) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err: mongoose.CallbackError | undefined, isMatch: boolean) => {
        if (!err)
          resolve(isMatch)
        else reject(err)
      })
    })
  },

  incLoginAttempts() {
    const that = this

    return new Promise((resolve, reject) => {
      if (that.lockUntil && that.lockUntil < Date.now()) {
        that.update({
          $set: {
            loginAttempts: 1,
          },
          $unset: {
            lockUntil: 1,
          },
        }, (err: any) => {
          if (!err)
            resolve(true)
          else reject(err)
        })
      }
      else {
        const updates = {
          $inc: {
            loginAttempts: 1,
          },
          $set: {
            lockUntil: 0,
          },
        }

        if (that.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !that.isLocked) {
          updates.$set = {
            lockUntil: Date.now() + LOCK_TIME,
          }
        }

        that.update(updates, (err: any) => {
          if (!err)
            resolve(true)
          else reject(err)
        })
      }
    })
  },
}

export default mongoose.model('User', UserSchema)
