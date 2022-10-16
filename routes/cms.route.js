const express = require('express')
const { upload } = require('../constants/file-upload')
const { uploadCMS } = require('../controllers/cms.controller')

const router = express.Router()

router.post('/upload', upload.single('image'), uploadCMS)

module.exports = router
