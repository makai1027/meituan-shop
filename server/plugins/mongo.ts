import mongoose from 'mongoose'
import User from '../models/user'

const config = useRuntimeConfig()

export default function () {
  mongoose.set('debug', true)

  mongoose.connect(config.mongoUrl)

  mongoose.connection.on('disconnected', () => {
    mongoose.connect(config.mongoUrl)
  })
  mongoose.connection.on('error', (err) => {
    console.error(err)
  })

  mongoose.connection.on('open', async () => {
    let user = await User.findOne({
      email: '403756835@qq.com',
    }).exec()

    if (!user) {
      user = new User({
        email: '403756835@qq.com',
        password: 'mk@9527+Xa',
        role: 'admin',
      })

      await user.save()
    }
  })
}
