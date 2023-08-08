const multer = require('multer')
const path = require('path')

exports.upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename: (_req, file, cb) => {
      return cb(null, Date.now() + file.originalname.split(' ')[0])
    },
    limits: { fileSize: 4194304 },
    fileFilter: (_req, file, callback) => {
      const ext = path.extname(file.originalname)
      if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
        return callback('Only images in jpg/jpeg/png are allowed', false)
      }
      return callback(null, true)
    }
  })
})
