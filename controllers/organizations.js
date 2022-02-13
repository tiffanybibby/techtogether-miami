import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Organization from '../models/organization.js'

const SALT_ROUNDS = process.env.SALT_ROUNDS
const TOKEN_KEY = process.env.TOKEN_KEY

// for JWT expiration
const today = new Date()
const exp = new Date(today)
exp.setDate(today.getDate() + 30)

export const signUp = async (req, res) => {
  try {
    const { name, rep_name, phone, email, password } = req.body
    const password_digest = await bcrypt.hash(password, SALT_ROUNDS)
    const organization = new Organization({
      name,
      rep_name,
      phone,
      email,
      password_digest,
    })

    await organization.save()

    const payload = {
      id: organization._id,
      name: organization.name,
      rep_name: organization.rep_name,
      phone: organization.phone,
      email: organization.email,
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
    const organization = await Organization.findOne({ email: email }).select(
      'name email password_digest'
    )
    if (await bcrypt.compare(password, organization.password_digest)) {
      const payload = {
        id: organization._id,
        name: organization.name,
        rep_name: organization.rep_name,
        phone: organization.phone,
        email: organization.email,
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
