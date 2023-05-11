const cmsRoutes = require('./cms.route')
const googleSheetRoutes = require('./google-sheet.route')
const ghlRoutes = require('./ghl.route')

exports.registerRoute = app => {
  app.use('/cms', cmsRoutes)
  app.use('/google-sheet', googleSheetRoutes)
  app.use('/ghl', ghlRoutes)
}
