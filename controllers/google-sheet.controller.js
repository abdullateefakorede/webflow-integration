require('dotenv').config()
const { GoogleSpreadsheet } = require('google-spreadsheet')
const utf8 = require('utf8')
const base64 = require('base-64')

exports.createGoogleSheetRecord = async (req, res) => {
  try {
    const {
      customerName,
      email,
      energySpecialist,
      atticFan,
      insulation,
      lightBulbs,
      cashBack,
      otherServices,
    } = req.body

    if (!customerName || !email || !energySpecialist) {
      return res
      .status(200)
      .json({ status: 400, message: 'Please supply all required information' })
    }
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_DOC_ID)

    const decodedCredentials = base64.decode(process.env.GOOGLE_CREDENTIALS)

    await doc.useServiceAccountAuth(JSON.parse(utf8.decode(decodedCredentials)))

    await doc.loadInfo() // loads document properties and worksheets

    const sheet = doc.sheetsByIndex[0] // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

    const newUserInfo = await sheet.addRow({
      'Customer Name': customerName,
      Address: email,
      'Energy Specialist': energySpecialist,
      Insulation: insulation || false,
      'Attic Fan': atticFan || false,
      'Light Bulbs': lightBulbs || false,
      'Cash Back': cashBack,
      'Other': otherServices
    })
    await newUserInfo.save()

    return res
      .status(200)
      .json({ status: 200, message: 'Spreadsheet Record Created Successfully' })
  } catch (error) {
    console.log('Error => ', error)
    return res
      .status(400)
      .json({ status: 400, message: 'Error Creating Spreadsheet Record' })
  }
}
