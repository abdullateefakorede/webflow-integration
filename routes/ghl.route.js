const express = require('express')
const {
  fetchContact,
  updateContactInformation,
  updateContactPaymentInformation
} = require('../controllers/ghl.controller')

const router = express.Router()

router.get('/contact/fetch', fetchContact)

router.put('/contact/update-contact-information', updateContactInformation)
router.put(
  '/contact/update-contact-payment-information',
  updateContactPaymentInformation
)

module.exports = router
