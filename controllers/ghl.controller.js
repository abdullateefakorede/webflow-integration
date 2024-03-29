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

exports.updateContactInformation = async (req, res) => {
  try {
    const response = await GhlService.updateContactInformation(req.body)

    return res.status(200).json(response)
  } catch (error) {
    console.log('Error => ', error)
    return res.status(400).json({
      status: 400,
      message: 'Error updating contact information',
      data: null
    })
  }
}

exports.updateContactPaymentInformation = async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res
        .status(400)
        .json({ status: 400, message: 'Please provide the contact email.' })
    }
    const response = await GhlService.updateContactPaymentInformation(req.body)

    return res.status(200).json(response)
  } catch (error) {
    console.log('Error => ', error)
    return res.status(400).json({
      status: 400,
      message: 'Error updating contact information',
      data: null
    })
  }
}

exports.uploadInstalledPanelImages = async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res
        .status(400)
        .json({ status: 400, message: 'Please provide the contact email.' })
    }

    const response = await GhlService.uploadInstalledPanelImages(
      req.body,
      req.files
    )

    return res.status(200).json(response)
  } catch (error) {
    console.log('Error => ', error)
    return res.status(400).json({
      status: 400,
      message: 'Error uploading panel images',
      data: null
    })
  }
}

exports.submitConquerJobApplication = async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res
        .status(400)
        .json({ status: 400, message: 'Please provide the applicant email.' })
    }

    const response = await GhlService.submitConquerJobApplication(
      req.body,
      req.files
    )

    return res.status(200).json(response)
  } catch (error) {
    console.log('Error => ', error)
    return res.status(400).json({
      status: 400,
      message: 'Error submitting job application',
      data: null
    })
  }
}

exports.submitDealerInformation = async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res
        .status(400)
        .json({ status: 400, message: 'Please provide the dealer email.' })
    }

    const response = await GhlService.submitDealerInformation(req.body)

    return res.status(200).json(response)
  } catch (error) {
    console.log('Error => ', error)
    return res.status(400).json({
      status: 400,
      message: 'Error submitting dealer information',
      data: null
    })
  }
}
