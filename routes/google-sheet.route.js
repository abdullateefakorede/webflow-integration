const express = require('express')
const { createGoogleSheetRecord } = require('../controllers/google-sheet.controller')

const router = express.Router()

router.post('/create-record', createGoogleSheetRecord)

module.exports = router
