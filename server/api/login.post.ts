import { defineEventHandler, readBody } from 'h3'
import User from '../models/user'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  let match = false

  const user = await User.findOne({ email: body.email }).exec()
  console.log(user, '1111111111')
  if (user) {
    match = await user.comparePassword(body.password, user.password)
    return {
      status: match,
      msg: match ? '匹配成功' : '找不到该用户',
      data: {
        user: match ? user : null,
      },
    }
  }
  else {
    return {
      status: false,
      msg: '找不到该用户',
      data: {
        user,
      },
    }
  }
})
