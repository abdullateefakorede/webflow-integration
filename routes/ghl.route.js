const express = require('express')
const {
  fetchContact,
  updateContactInformation,
  updateContactPaymentInformation,
  uploadInstalledPanelImages
} = require('../controllers/ghl.controller')
const { upload } = require('../constants/file-upload')

const router = express.Router()

router.get('/contact/fetch', fetchContact)

router.put('/contact/update-contact-information', updateContactInformation)
router.put(
  '/contact/update-contact-payment-information',
  updateContactPaymentInformation
)

router.post('/contact/upload-installed-panel-images', upload.array('panelImages', 3), uploadInstalledPanelImages)

module.exports = router
