export default class ImageGallery extends HTMLDivElement {

    get images() {
        return this._images;
    }

    set images(value) {
        this._images = value;
        this.render();
    }

    constructor() {
        super();
        this.images = [];
        this.render();
        this.getImages();
    }

    getImages() {
        fetch('/images/').then(resp => resp.json()).then(images => this.images = images);
    }


    renderImages() {
        if (!this.images || this.images.length === 0) {
            return `No Images`
        }
        let imagesString = `<div class="images-container">`;
        this.images.forEach(image => {
            imagesString +=  `<div is="small-image" image-content="${image.content}" image-title="${image.title}" file-name="${image.fileName}"></div>`
        })
        imagesString += `</div>`

        return imagesString;
    }

    addImageClick() {
        this.toolbarComponent.setAttribute('add-image-disable', 'disable')
        this.imagesContainer.classList.add('hidden')
        this.addImageComponent.classList.remove('hidden');
    }

    get addImageComponent() {
        return this.querySelector('div[is="add-image"]');
    }
    get imagesContainer() {
        return this.querySelector('div.images-container');
    }

    get toolbarComponent() {
        return  this.querySelector('div[is="gallery-toolbar"]');
    }

    reset() {
        this.imagesContainer.classList.remove('hidden');
        this.addImageComponent.classList.add('hidden');

        this.toolbarComponent.setAttribute('add-image-disable', '')
    }

    render() {
       this.innerHTML = `<h1>Image Gallery</h1>
            <div is="gallery-toolbar"></div>
            ${this.renderImages()}
            <div class="hidden" is="add-image"></div>
            `;


       this.querySelector('div[is="add-image"]').addEventListener('image-added', () => {
            this.getImages();
            this.reset();
       })

        this.toolbarComponent.addEventListener('add-image-click', () => {
            this.addImageClick();
        })



    }
}

