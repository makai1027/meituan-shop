import { defineEventHandler, getRouterParam } from 'h3'
import User from '../models/user'

export default defineEventHandler((event) => {
  const email = getRouterParam(event, 'email')
  return User.find({
    email,
  }).lean(true).exec()
})
