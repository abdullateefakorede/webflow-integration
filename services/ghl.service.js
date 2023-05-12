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
    const contactSearchApiResponse = await axios.get(
      `https://rest.gohighlevel.com/v1/contacts/?query=${email}`,
      {
        headers: { Authorization: `Bearer ${process.env.GHL_TOKEN}` },
        'Content-Type': 'application/json'
      }
    )
    const contactSearchresponse = contactSearchApiResponse.data
    const searchedContact = contactSearchresponse.contacts.find(
      contact => contact.email.toLowerCase() === email.toLowerCase()
    )

    if (!searchedContact) {
      return {
        status: 200,
        message: 'No contact found for this email address',
        data: null
      }
    }

    const apiResponse = await axios.get(
      `https://rest.gohighlevel.com/v1/contacts/${searchedContact.id}`,
      {
        headers: { Authorization: `Bearer ${process.env.GHL_TOKEN}` },
        'Content-Type': 'application/json'
      }
    )
    const response = apiResponse.data
    const contact = response.contact

    const userStageInfo = contact.customField.filter(
      stage => stage.id === 'BNBxDdWXerkUsqp9P48K'
    )[0]

    const totalPayoutInfo = contact.customField.filter(
      stage => stage.id === 'cPp3Z5IsIivNBbeLRZmv'
    )[0]
    const totalReferrralsInfo = contact.customField.filter(
      stage => stage.id === 'QkU5qhApRcwe9XKxX9hO'
    )[0]
    const closedDealsInfo = contact.customField.filter(
      stage => stage.id === 'szCXkCGu4GIVZlpnF0PY'
    )[0]
    const referralLinkInfo = contact.customField.filter(
      stage => stage.id === 'VS4bqQLuRsKtA6ssi9qa'
    )[0]

    const loanDocumentInfos = contact.customField.filter(
      stage => stage.id === 'OIvv2BHTvbK3WV8RmMxN'
    )[0]

    let loanDocument = undefined

    if (loanDocumentInfos) {
      const loanDocumentValues = Object.keys(loanDocumentInfos.value)
      const recentLoanDocumentInfo =
        loanDocumentInfos.value[
          loanDocumentValues[loanDocumentValues.length - 1]
        ]
      loanDocument = recentLoanDocumentInfo.url
    }

    const bankElectionInfos = contact.customField.filter(
      stage => stage.id === 'pCOidBkiIwaS67cmzNZt'
    )[0]

    let bankElection = undefined

    if (bankElectionInfos) {
      const bankElectionValues = Object.keys(bankElectionInfos.value)
      const recentBankElectionInfo =
        bankElectionInfos.value[
          bankElectionValues[bankElectionValues.length - 1]
        ]
      bankElection = recentBankElectionInfo.url
    }

    const purchaseAgreementInfos = contact.customField.filter(
      stage => stage.id === 'ASTyV4yCK0bSzsdVwQqd'
    )[0]

    let purchaseAgreement = undefined
    if (purchaseAgreementInfos) {
      const purchaseAgreementValues = Object.keys(purchaseAgreementInfos.value)
      const recentPurchaseAgreementInfo =
        purchaseAgreementInfos.value[
          purchaseAgreementValues[purchaseAgreementValues.length - 1]
        ]
      purchaseAgreement = recentPurchaseAgreementInfo.url
    }

    const nmaSubmissionInfos = contact.customField.filter(
      stage => stage.id === 'c3nnpbTu1cRgzFfLO6AA'
    )[0]

    let nmaSubmission = undefined

    if (nmaSubmissionInfos) {
      const nmaSubmissionValues = Object.keys(nmaSubmissionInfos.value)
      const recentNmaSubmissionInfo =
        nmaSubmissionInfos.value[
          nmaSubmissionValues[nmaSubmissionValues.length - 1]
        ]
      nmaSubmission = recentNmaSubmissionInfo.url
    }
    const otherDocumentInfos = contact.customField.filter(
      stage => stage.id === 'UGTlZFAfvVrzqgo0R6Gw'
    )[0]

    let otherDocument = undefined

    if (otherDocumentInfos) {
      const otherDocumentValues = Object.keys(otherDocumentInfos.value)
      const recentOtherDocumentInfo =
        otherDocumentInfos.value[
          otherDocumentValues[otherDocumentValues.length - 1]
        ]
      otherDocument = recentOtherDocumentInfo.url
    }

    const contactMethodInfo = contact.customField.filter(
      stage => stage.id === 'yucMkCliPobN0vfp3Yt1'
    )[0]

    const userProfilPictureInfos = contact.customField.filter(
      stage => stage.id === 'um7ID9BjG1vfJNLpFY76'
    )[0]

    let userProfilPicture = undefined
    if (userProfilPictureInfos) {
      const profilePictureValues = Object.keys(userProfilPictureInfos.value)
      const recentProfilePictureInfo =
        userProfilPictureInfos.value[
          profilePictureValues[profilePictureValues.length - 1]
        ]
      userProfilPicture = recentProfilePictureInfo.url
    }

    const paymentMethodInfo = contact.customField.filter(
      stage => stage.id === 'Rd1wOvT7ROfxewCtw8yj'
    )[0]
    const paymentUsernameInfo = contact.customField.filter(
      stage => stage.id === '5DR4TsjyTN42M2jkKKYA'
    )[0]
    const signedContractNotesInfo = contact.customField.filter(
      stage => stage.id === '0Ib4lKuZc4i0Eaxm5ogC'
    )[0]
    const perfectPacketNotesInfo = contact.customField.filter(
      stage => stage.id === 'NS54voeaCkWAMrOwUnYW'
    )[0]
    const permittedNotesInfo = contact.customField.filter(
      stage => stage.id === 'irsgI8j3vvuv9ze2ZYbX'
    )[0]
    const installationNotesInfo = contact.customField.filter(
      stage => stage.id === 'AEylrM9DRPXgvqxq41tY'
    )[0]

    return {
      status: 200,
      message: 'Contact fetched successfully',
      data: {
        initials: contact.firstName[0] + contact.lastName[0],
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        fullName: `${contact.firstName || ''} ${contact.lastName || ''}`.trim(),
        phoneNumber: contact.phone,
        dateOfBirth: contact.dateOfBirth,
        pipelineStage: userStageInfo?.value,
        totalPayout: totalPayoutInfo?.value || 0,
        totalReferrals: totalReferrralsInfo?.value || 0,
        closedDeals: closedDealsInfo?.value || 0,
        referralLink: referralLinkInfo?.value,
        loanDocument,
        bankElection,
        purchaseAgreement,
        nmaSubmission,
        otherDocument,
        contactMethod: contactMethodInfo?.value,
        userProfilPicture,
        paymentMethod: paymentMethodInfo?.value,
        paymentUsername: paymentUsernameInfo?.value,
        signedContractNotes: signedContractNotesInfo?.value,
        perfectPacketNotes: perfectPacketNotesInfo?.value,
        permittedNotes: permittedNotesInfo?.value,
        installationNotes: installationNotesInfo?.value
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
