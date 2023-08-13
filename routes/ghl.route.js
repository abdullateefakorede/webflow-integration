const express = require('express')
const {
  fetchContact,
  updateContactInformation,
  updateContactPaymentInformation,
  uploadInstalledPanelImages,
  submitConquerJobApplication,
  submitDealerInformation
} = require('../controllers/ghl.controller')
const { upload } = require('../constants/file-upload')

const router = express.Router()

router.get('/contact/fetch', fetchContact)

router.put('/contact/update-contact-information', updateContactInformation)
router.put(
  '/contact/update-contact-payment-information',
  updateContactPaymentInformation
)

router.post(
  '/contact/upload-installed-panel-images',
  upload.array('panelImages', 3),
  uploadInstalledPanelImages
)
router.post(
  '/contact/upload-installed-panel-images',
  upload.array('panelImages', 3),
  uploadInstalledPanelImages
)
router.post(
  '/submit/conquer-job-application',
  upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'coverLetter', maxCount: 1 }
  ]),
  submitConquerJobApplication
)
router.post('/submit/dealer-information', submitDealerInformation)

module.exports = router
