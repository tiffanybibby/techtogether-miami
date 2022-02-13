import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const SALT_ROUNDS = process.env.SALT_ROUNDS
const TOKEN_KEY = process.env.TOKEN_KEY

// for JWT expiration
const today = new Date()
const exp = new Date(today)
exp.setDate(today.getDate() + 30)

export const signUp = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body
    const password_digest = await bcrypt.hash(password, SALT_ROUNDS)
    const user = new User({
      first_name,
      last_name,
      email,
      password_digest,
    })

    await user.save()

    const payload = {
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      exp: parseInt(exp.getTime() / 1000),
    }

    const token = jwt.sign(payload, TOKEN_KEY)
    res.status(201).json({ token })
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ error: error.message })
  }
}

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email }).select(
      'first_name email password_digest'
    )
    if (await bcrypt.compare(password, user.password_digest)) {
      const payload = {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        exp: parseInt(exp.getTime() / 1000),
      }

      const token = jwt.sign(payload, TOKEN_KEY)
      res.status(201).json({ token })
    } else {
      res.status(401).send('Invalid Credentials')
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: error.message })
  }
}

export const verify = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, TOKEN_KEY)
    if (payload) {
      res.json(payload)
    }
  } catch (error) {
    console.log(error.message)
    res.status(401).send('Not Authorized')
  }
}

export const changePassword = async (req, res) => {}
