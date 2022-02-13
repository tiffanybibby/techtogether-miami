import { Router } from 'express'
import * as controllers from '../controllers/ads.js'
import restrict from '../helpers/restrict.js'

const router = Router()

router.get('/ads', controllers.getAds)
router.get('/ads/:id', controllers.getAd)
router.post('/ads', restrict, controllers.createAd)
router.put('/ads/:id', restrict, controllers.updateAd)
router.delete('/ads/:id', restrict, controllers.deleteAd)

export default router