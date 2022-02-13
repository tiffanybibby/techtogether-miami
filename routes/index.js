import { Router } from 'express'
import adsRoutes from './ads.js'
import usersRoutes from './users.js'
import organizationRoutes from './organizations.js'

const router = Router()

router.get('/', (req, res) => res.send('This is the api root!'))

router.use('/', usersRoutes)
router.use('/', organizationRoutes)
router.use('/', adsRoutes)

export default router
