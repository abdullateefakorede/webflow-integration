require('dotenv').config()
const axios = require('axios')
const cloudinary = require('cloudinary')
const fs = require('fs')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

class GhlService {
  static async fetchContact (email) {
    const apiResponse = await axios.get(
      `https://rest.gohighlevel.com/v1/contacts/?query=${email}`,
      {
        headers: { Authorization: `Bearer ${process.env.GHL_TOKEN}` },
        'Content-Type': 'application/json'
      }
    )
    const response = apiResponse.data
    if (!response.contacts[0]) {
      return {
        status: 200,
        message: 'No contact found for this email address',
        data: null
      }
    }
    const userStageInfo = response.contacts[0].customField.filter(
      stage => stage.id === 'BNBxDdWXerkUsqp9P48K'
    )[0]

    const totalPayoutInfo = response.contacts[0].customField.filter(
      stage => stage.id === 'cPp3Z5IsIivNBbeLRZmv'
    )[0]
    const totalReferrralsInfo = response.contacts[0].customField.filter(
      stage => stage.id === 'QkU5qhApRcwe9XKxX9hO'
    )[0]
    const closedDealsInfo = response.contacts[0].customField.filter(
      stage => stage.id === 'szCXkCGu4GIVZlpnF0PY'
    )[0]
    const referralLinkInfo = response.contacts[0].customField.filter(
      stage => stage.id === 'VS4bqQLuRsKtA6ssi9qa'
    )[0]
    const loanDocumentInfo = response.contacts[0].customField.filter(
      stage => stage.id === 'OIvv2BHTvbK3WV8RmMxN'
    )[0]
    const bankElectionInfo = response.contacts[0].customField.filter(
      stage => stage.id === 'pCOidBkiIwaS67cmzNZt'
    )[0]
    const purchaseAgreementInfo = response.contacts[0].customField.filter(
      stage => stage.id === 'ASTyV4yCK0bSzsdVwQqd'
    )[0]
    const nmaSubmissionInfo = response.contacts[0].customField.filter(
      stage => stage.id === 'c3nnpbTu1cRgzFfLO6AA'
    )[0]
    const otherDocumentInfo = response.contacts[0].customField.filter(
      stage => stage.id === 'UGTlZFAfvVrzqgo0R6Gw'
    )[0]
    const contactMethodInfo = response.contacts[0].customField.filter(
      stage => stage.id === 'yucMkCliPobN0vfp3Yt1'
    )[0]
    const userProfilPictureInfo = response.contacts[0].customField.filter(
      stage => stage.id === 'um7ID9BjG1vfJNLpFY76'
    )[0]
    const paymentMethodInfo = response.contacts[0].customField.filter(
      stage => stage.id === 'Rd1wOvT7ROfxewCtw8yj'
    )[0]
    const paymentUsernameInfo = response.contacts[0].customField.filter(
      stage => stage.id === '5DR4TsjyTN42M2jkKKYA'
    )[0]

    return {
      status: 200,
      message: 'Contact fetched successfully',
      data: {
        initials:
          response.contacts[0].firstName[0] + response.contacts[0].lastName[0],
        firstName: response.contacts[0].firstName,
        lastName: response.contacts[0].lastName,
        email: response.contacts[0].email,
        fullName: response.contacts[0].contactName,
        phoneNumber: response.contacts[0].phone,
        dateOfBirth: response.contacts[0].dateOfBirth,
        pipelineStage: userStageInfo?.value,
        totalPayout: totalPayoutInfo?.value || 0,
        totalReferrals: totalReferrralsInfo?.value || 0,
        closedDeals: closedDealsInfo?.value || 0,
        referralLink: referralLinkInfo?.value,
        loanDocument: loanDocumentInfo?.value,
        bankElection: bankElectionInfo?.value,
        purchaseAgreement: purchaseAgreementInfo?.value,
        nmaSubmission: nmaSubmissionInfo?.value,
        otherDocument: otherDocumentInfo?.value,
        contactMethod: contactMethodInfo?.value,
        userProfilPicture: userProfilPictureInfo?.value,
        paymentMethod: paymentMethodInfo?.value,
        paymentUsername: paymentUsernameInfo?.value
      }
    }
  }

  static async updateContactInfo (requestBody, file) {
    const cloudinaryResponse = await cloudinary.v2.uploader.upload(file.path, {
      public_id: 'lessar-energy/' + Date.now()
    })
    const imageUrl = cloudinaryResponse.url

    const ghlPayload = {
      email: requestBody.email,
      phone: requestBody.phone,
      name: requestBody.name,
      dateOfBirth: requestBody.dateOfBirth,
      customField: {
        um7ID9BjG1vfJNLpFY76: imageUrl,
        Rd1wOvT7ROfxewCtw8yj: requestBody.paymentMethod,
        yucMkCliPobN0vfp3Yt1: requestBody.contactMethod,
        '5DR4TsjyTN42M2jkKKYA': requestBody.paymentUsername
      }
    }

    const ghlUpdateConfig = {
      method: 'post',
      url: 'https://rest.gohighlevel.com/v1/contacts/',
      headers: {
        Authorization: `Bearer ${process.env.GHL_TOKEN}`,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(ghlPayload)
    }

    const ghlResponse = await axios(ghlUpdateConfig)
    const ghlResponseData = ghlResponse.data

    fs.unlinkSync(file.path)
    await cloudinary.v2.uploader.destroy(cloudinaryResponse.public_id)

    return {
      status: 200,
      message: 'Contact updated successfully',
      data: ghlResponseData
    }
  }
}

module.exports = GhlService
