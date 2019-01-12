export default class DetailedImage extends HTMLDivElement {

    static get observedAttributes() {
        return ['image-content', 'image-title', 'image-description', 'image-date'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'image-content') {
            this.imageElement.setAttribute('src', newValue);
        }
        if (name === 'image-title') {
            this.titleElement.textContent = newValue;
        }
        if (name === 'image-date') {
            this.dateElement.textContent = this.getDate(+newValue);
        }
        if (name === 'image-description') {
            this.descriptionElement.textContent = newValue;
        }
    }

    getDate(timestamp) {
        return (new Date(timestamp)).toDateString();
    }

    get descriptionElement() {
        return this.querySelector('.image-description')
    }

    get imageElement() {
        return this.querySelector('img.detailed-image');
    }

    get titleElement() {
        return this.querySelector('h2 .title-container');
    }

    get dateElement() {
        return document.querySelector('.image-date');
    }

    get closeElement() {
        return this.querySelector('.close-button');
    }

    get editTitleElement() {
        return this.querySelector('.edit-title');
    }

    connectedCallback() {
        this.render();
    }

    get titleTextbox() {
        return this.querySelector('.rename-section input');
    }

    get editTitleSection() {
        return this.querySelector('.rename-section');
    }

    get titleSectionElement() {
        return this.querySelector('h2')
    }

    setEditState() {
        this.titleSectionElement.classList.add('hidden');
        // this.titleElement.classList.add('hidden');
        // this.editTitleElement.classList.add  ('hidden');
        this.editTitleSection.classList.remove('hidden')
        this.titleTextbox.value = this.getAttribute('image-title')
    }

    setReadonlyState() {
        this.titleSectionElement.classList.remove('hidden');
       // this.editTitleElement.classList.remove  ('hidden');
        this.editTitleSection.classList.add('hidden')
    }

    get saveTitleButton() {
        return this.querySelector('.update-title');
    }

    get deleteImageButton() {
        return this.querySelector('.delete-image');
    }

    setEventHandlers() {
        this.imageElement.setAttribute('src', this.getAttribute('image-content'))
        this.closeElement.onclick = () => this.dispatchEvent(new CustomEvent('close-detailed-image'))
        this.editTitleElement.onclick = () => this.setEditState();
        this.saveTitleButton.onclick = () =>  {
            this.dispatchEvent(new CustomEvent('update-title', {detail: this.titleTextbox.value}))
            this.setReadonlyState();
        }

        this.deleteImageButton.onclick = () => {
            this.dispatchEvent(new CustomEvent('delete-image'));
        }
    }

    render() {
        this.innerHTML = `<div>
        <div>
                <a href="javascript:void(0)" class="close-button"><i class="fas fa-window-close"></i></a>
                 <a href="javascript:void(0)" class="delete-image"><i class="fas fa-trash"></i></a>
                 </div>
            <img class="detailed-image"> 
            <h2>
                <span class="title-container"></span>
                <a href="javascript:void(0)" class="edit-title"><i class="fas fa-pencil-alt"></i></a>
            </h2>
            <div class="rename-section hidden">
                <input type="text">
                <a href="javascript:void(0)" class="update-title">
                <i class="fas fa-save"></i>
</a>
            </div>
            <div class="image-description"></div>
            Last Modified: <span class="image-date"></span>
            
           
</div>`

        this.setEventHandlers();
    }


}
