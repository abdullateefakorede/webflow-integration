const GhlService = require('../services/ghl.service')

exports.fetchContact = async (req, res) => {
  try {
    const { email } = req.query

    if (!email) {
      return res
        .status(400)
        .json({ status: 400, message: 'Please provide the contact email.' })
    }

    const response = await GhlService.fetchContact(email)

    return res.status(200).json(response)
  } catch (error) {
    console.log('Error => ', error)
    return res
      .status(400)
      .json({ status: 400, message: 'Error fetching contact', data: null })
  }
}

exports.updateContactInfo = async (req, res) => {
  try {
    const response = await GhlService.updateContactInfo(req.body, req.file)

    return res.status(200).json(response)
  } catch (error) {
    console.log('Error => ', error)
    return res
      .status(400)
      .json({ status: 400, message: 'Error updating contact', data: null })
  }
}