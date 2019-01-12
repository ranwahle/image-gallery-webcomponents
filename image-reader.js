
const images = [];

module.exports = {
    readImageDirectory : function() {
      return new Promise((resolve) => {

         resolve(images);
        })
    },

    sendImage: function(imageFileName, res) {
        res.sendFile(`${__dirname}/assets/${imageFileName}`);
    },

    addimage: function(image) {
        return new Promise(resolve => {
            images.push(image);
            resolve(images);
        })
    }
}

