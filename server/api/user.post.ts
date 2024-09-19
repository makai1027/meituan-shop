import { defineEventHandler, readBody } from 'h3'
import User from '../models/user'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const user = new User(body)

  try {
    await user.save()
    return {
      status: true,
      msg: '保存成功',
    }
  }
  catch (error) {
    return {
      msg: '保存失败',
      status: false,
      error,
    }
  }
})
