const cmsRoutes = require('./cms.route')

exports.registerRoute = app => {
  app.use('/cms', cmsRoutes)
}
