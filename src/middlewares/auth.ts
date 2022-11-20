import jwt, { JwtPayload } from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User, { IUser } from '../models/User'

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]
      console.log({token})

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload

      // Get user from the token
      const foundUser = await User.findById(decoded.id).select('-password')
      req.user = foundUser as IUser

      next()
    } 
    catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

export { protect }
