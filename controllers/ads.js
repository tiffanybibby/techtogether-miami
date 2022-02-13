import Ad from '../models/ad.js'

export const getAds = async (req, res) => {
  try {
    const ads = await Ad.find()
    res.json(ads)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: error.message })
  }
}

export const getAd = async (req, res) => {
  try {
    const { id } = req.params
    const ad = await Ad.findById(id).populate('userId')
    if (ad) {
      return res.json(ad)
    }
    res.status(404).json({ message: 'ad not found!' })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: error.message })
  }
}

export const createAd = async (req, res) => {
  try {
    const ad = new Ad(req.body)
    await ad.save()
    res.status(201).json(ad)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
}

export const updateAd = async (req, res) => {
  const { id } = req.params
  const ad = await Ad.findByIdAndUpdate(id, req.body, { new: true })
  res.status(200).json(ad)
}

export const deleteAd = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Ad.findByIdAndDelete(id)
    if (deleted) {
      return res.status(200).send('ad deleted')
    }
    throw new Error('ad not found')
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: error.message })
  }
}