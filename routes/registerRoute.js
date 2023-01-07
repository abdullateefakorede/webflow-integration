const cmsRoutes = require('./cms.route')
const googleSheetRoutes = require('./google-sheet.route')

exports.registerRoute = app => {
  app.use('/cms', cmsRoutes)
  app.use('/google-sheet', googleSheetRoutes)
}
