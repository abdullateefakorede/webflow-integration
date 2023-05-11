const express = require('express')
const { upload } = require('../constants/file-upload')
const { updateContactInfo, fetchContact } = require('../controllers/ghl.controller')

const router = express.Router()

router.get('/contact/fetch', fetchContact)

router.put('/contact/update', upload.single('profilePicture'), updateContactInfo)

module.exports = router
