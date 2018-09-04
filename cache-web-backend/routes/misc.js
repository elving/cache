import express from 'express'
import infiltrator from '../lib/infiltrator'

const router = express.Router()

router.get('/page/', function (req, res) {
  const { url } = req.query

  if (!url) {
    res.status(500).json({ error: 'No url provided.' })
  } else {
    infiltrator(url).then((data) => {
      res.status(200).json(data)
    }).catch((error) => {
      res.status(500).json(error)
    })
  }
})

export default router
