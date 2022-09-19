require('dotenv').config()
const express = require('express')
const axios = require('axios')
const { upload } = require('../constants/file-upload')
const cloudinary = require('cloudinary')
const fs = require('fs')

const router = express.Router()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { name, slug } = req.body
    const file = req.file

    const response = await cloudinary.v2.uploader.upload(file.path, {
      public_id: 'lessar-energy/' + Date.now()
    })

    const webflowPayload = {
      fields: {
        name,
        slug,
        _archived: false,
        _draft: false,
        image: response.url
      }
    }

    const cmsCreationConfig = {
      method: 'post',
      url: 'https://api.webflow.com/collections/631ea9414f23e879cdc73896/items',
      headers: {
        Authorization: `Bearer ${process.env.BEARER}`,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(webflowPayload)
    }

    await axios(cmsCreationConfig)

    fs.unlinkSync(file.path)
    await cloudinary.v2.uploader.destroy(response.public_id)

    const data = JSON.stringify({
      domains: process.env.DOMAINS?.split(',')
    })

    const publishSiteConfig = {
      method: 'post',
      url: 'https://api.webflow.com/sites/628df71d5ed89e266f1c49e6/publish',
      headers: {
        Authorization: `Bearer ${process.env.BEARER}`,
        'Content-Type': 'application/json'
      },
      data: data
    }

    await axios(publishSiteConfig)

    return res.status(200).json({status: 200, message: 'CMS uploaded successfully' })
  } catch (error) {
    console.log('Error => ', error)
    return res.status(400).json({ status: 400, message: 'Error uploading CMS' })
  }
})

module.exports = router
