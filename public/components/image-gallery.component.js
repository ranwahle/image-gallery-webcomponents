export default class ImageGallery extends HTMLDivElement {

    get displayedImage() {
        return this._displayedimage;
    }

    set displayedImage(image) {
        this._displayedimage = image;
        this.renderDetailedImage();
    }

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

    renderDetailedImage() {
        if (this.displayedImage) {
            this.imagesContainer.classList.add('side-show')
            this.detailedImage.classList.remove('hidden');
            this.detailedImage.setAttribute('image-content', this.displayedImage.content);
            this.detailedImage.setAttribute('image-title', this.displayedImage.title);
            this.detailedImage.setAttribute('image-date', this.displayedImage.lastModified);
            this.detailedImage.setAttribute('image-description', this.displayedImage.description);

        } else {
            this.imagesContainer.classList.remove('side-show');
            this.detailedImage.classList.add('hidden');
        }
    }

    getImages() {
        fetch('/images/').then(resp => resp.json()).then(images => this.images = images);
    }


    renderImagesContainer() {
        let imagesString = `<div class="images-container">`;
        if (!this.images || this.images.length === 0) {
            imagesString += `No Images</div>`
            return imagesString;
        }
        imagesString += `</div>`

        return imagesString;
    }

    addImageElements() {
        this.imagesContainer.innerHTML = '';
        this.images.forEach(
            image => {
                const imageElement = document.createElement('div', {is: 'small-image'});
                imageElement.setAttribute('image-content', image.content);
                imageElement.setAttribute('image-title', image.title);
                imageElement.addEventListener('image-click', () => this.displayDetailedImage(image));
                this.imagesContainer.appendChild(imageElement);
            }
        )
    }

    displayDetailedImage(image) {
            this.displayedImage = image;
    }

    addImageClick() {
        this.toolbarComponent.setAttribute('add-image-disable', 'disable')
        this.galleryContainer.classList.add('hidden')
        this.addImageComponent.classList.remove('hidden');
    }

    get addImageComponent() {
        return this.querySelector('div[is="add-image"]');
    }

    get detailedImage() {
        return this.querySelector('div[is="detailed-image"]');
    }

    get imagesContainer() {
        return this.querySelector('div.images-container');
    }

    get galleryContainer() {
        return this.querySelector('div.gallery-container');
    }

    get toolbarComponent() {
        return this.querySelector('div[is="gallery-toolbar"]');
    }

    reset() {
        this.galleryContainer.classList.remove('hidden');
        this.addImageComponent.classList.add('hidden');

        this.toolbarComponent.setAttribute('add-image-disable', '')
    }

    get addNewImageElement() {
        return  this.querySelector('div[is="add-image"]');
    }


    setEvents() {

        this.addNewImageElement.addEventListener('image-added', () => {
            this.getImages();
            this.reset();
        })

        this.addNewImageElement.addEventListener('add-image-cancel', () => {
            this.reset();
        })

        this.toolbarComponent.addEventListener('add-image-click', () => {
            this.addImageClick();
        })

        this.detailedImage.addEventListener('close-detailed-image', () => {
            this.displayedImage = null;
        })



        this.detailedImage.addEventListener('update-title', evt => {
            const image = this.images.find(image => image === this.displayedImage)
            if (!image) {
                return;
            }
            image.title = evt.detail;
            this.addImageElements();
            this.renderDetailedImage();
            fetch('/update-image', {method: 'put',
                headers: new Headers({'content-type': 'application/json'}),
                body:JSON.stringify({index:  this.images.indexOf(image), title: image.title})})

        })

        this.detailedImage.addEventListener('delete-image', () => {
            fetch(`/delete-image/${this.images.indexOf(this.displayedImage)}`, {method: 'delete'})
                .then((res) => {
                    if (!res.ok) {
                        return;
                    }
                    this.images = this.images.filter(img => img !== this.displayedImage);
                    this.displayedImage = null;
            });
        })

    }

    render() {
        this.innerHTML = `<h1>Image Gallery</h1>
            <div is="gallery-toolbar"></div>
            <div class="gallery-container">
            ${this.renderImagesContainer()}
            <div is="detailed-image" class="hidden"></div>
            
            </div>
            <div class="hidden" is="add-image"></div>
            `;


        this.addImageElements();

        this.setEvents();



    }
}

