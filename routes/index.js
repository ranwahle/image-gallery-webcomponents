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

router.delete('/delete-image/:index', (req, res) => {
    const index = +req.params.index;
    if (isNaN(index)) {
        res.status(400).send('Illigle index');
    }
    imageReader.deleteImage(index).then(() => {
        res.status(200).send('OK');
    }, () => res.status(400).send(`Of course this is the client's fault`))
})

router.get('/fontawesome/all.css', (req, res) => {
    res.status(200).sendFile(`${__dirname}/node_modules/@fortawesome/fontawesome-free/css/all.css`.replace('routes/',''))
})

router.post('/add-image', (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {


        base64Img.img(fields.content[0], 'assets', fields.fileName[0], (err, filePath) => {
            if (!err) {
                imageReader.addimage({fileName:  path.basename(filePath), title: fields['image-title'][0] , content: fields.content[0], contentType: fields['content-type'][0]
                    , lastModified: fields['last-modified'][0], description: fields['image-description'][0]})
            }
        })

        imageReader.readImageDirectory().then(images => {
            res.status(200).send(images)
        })

    })




} )

router.put('/update-image', (req, res) => {
     const {title, index} = req.body;
     imageReader.updateImageTitle(title, index)
         .then(() => res.status(200).send('OK') );

})

module.exports = router;