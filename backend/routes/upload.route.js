const path = require('path')
const express = require('express')
const multer = require('multer')

const storage =  multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },

    filename: (req, file, cb  ) => {
        const extname = path.extname(file.originalname)
        const basename = path.basename(file.originalname, extname)
        cb(null, `${basename}-${Date.now()}${extname}`)
    }
})

const fileFilter = (req, file, cb) => {
    const filetypes = /jpe?g|png|webp/;
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

    const extname = path.extname(file.originalname).toLowerCase()
    const mimetype = file.mimetype;

    if (filetypes.test(extname) && mimetypes.test(mimetype)) {
        cb(null, true)
    } else {
        cb(new Error("Images only"), false)
    }


}

const upload =  multer ({storage, fileFilter})
const uploadSingleImage = upload.single('productImage')

module.exports = (app) => {
    app.put("/v1/auth/upload", (req, res) => {
        uploadSingleImage(req, res, (err) => {
            if (err) {
                res.status(400).send({message: err.message})
            } else if (req.file) {
                res.status(200).send({
                    message: "Image uploaded successfully",
                    productImage: `/uploads/${req.file.filename}`
                })
            } else {
                res.status(400).send({message: "No image file provided"})
            }
        })
    })
}