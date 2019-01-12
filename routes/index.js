const express = require('express');
const router = express.Router();
const fs = require('fs')
const imageReader = require('../image-reader');
const multiparty = require('multiparty');
const atob = require('atob')
const base64Img = require('base64-img');
const path = require('path')

/* GET home page. */
router.get('/', (req, res) =>{
  res.render('index', { title: 'Express' });
});

router.get('/images', (req, res) => {
  imageReader.readImageDirectory().then((files) => {
      res.status(200).send(files.map (image => ({...image, fileName: `image-gallery/${image.fileName}`})))
  })
});

/**
 * This route will get the image content only
 */
router.get('/image-gallery/:fileName', (req, res) => {
       imageReader.sendImage(req.params.fileName, res);

} )

router.post('/add-image', (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {


        base64Img.img(fields.content[0], 'assets', fields.fileName[0], (err, filePath) => {
            if (!err) {
                imageReader.addimage({fileName:  path.basename(filePath), title: fields['image-title'][0] , content: fields.content[0], contentType: fields['content-type'][0]
                    , lastModified: fields['last-modified'][0]})
            }
        })

        imageReader.readImageDirectory().then(images => {
            res.status(200).send(images)
        })

    })
    const body = req.body;
    console.log(body);



} )

module.exports = router;
