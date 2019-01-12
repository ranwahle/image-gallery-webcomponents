export const imageAdded = new CustomEvent('image-added')

export default class AddImage extends HTMLDivElement {
    constructor() {
        super();

        this.render();
        this.setEvents();
    }

    setEvents() {
        this.querySelector('form').addEventListener('submit', () => this.submitImage())
        this.querySelector('[name="upload-image"]').addEventListener('change', (evt) => this.readImage(evt))
    }

    readFile() {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = fileRead => {
                return (fileReadEvent => {
                    resolve(fileReadEvent.target.result);
                })(fileRead);
            }
            reader.readAsDataURL(this.imageFile);
        })
    }

    readImage(evt) {

        this.imageFile = evt.target.files[0];


        const reader = new FileReader();
        reader.onload = readFile => {
            return (fileReadEvent => {
                if (this.imageElement) {
                    this.imagePreview.removeChild(this.imageElement);
                }
                this.imageElement = document.createElement('img');
                this.imageElement.src = fileReadEvent.target.result;
                this.imagePreview.appendChild(this.imageElement);
            })(readFile)
        }
        reader.readAsDataURL(this.imageFile);
    }

    get imagePreview() {
        return this.querySelector('div.image-preview');
    }


    submitImage() {
        const formData = new FormData();
        formData.append('fileName', this.imageFile.name);
        formData.append('last-modified', this.imageFile.lastModified);
        formData.append('image-title', this.querySelector('[name="image-title"]').value)
        this.readFile().then(fileContent => {
            formData.append('content', fileContent);
            formData.append('content-type', this.imageFile.type)
            fetch('/add-image', {method: 'post', body: formData}).then(
                () => this.dispatchEvent(imageAdded))
        })
        return false;
    }

    render() {
        this.innerHTML = `<form onsubmit="return false"> 
<div>
<h2>Add new Image</h2>
        <input type="file" name="upload-image" accept="image/*">
        </div>
        <div>
        <input type="text" name="image-title" placeholder="Image title">
        </div>
        <div class="image-preview"></div>
        <div>
            <button type="submit">Add Image</button>
            </div> 
        </form>
        `
    }
}

