const addImageClick = new CustomEvent('add-image-click');

export default class GalleryToolbar extends HTMLDivElement {

    connectedCallback() {
        this.render();
    }

    get addImageButton() {
        return this.querySelector('a[functional-id="add-image"]');
    }

    static get observedAttributes() {
        return ['add-image-disable'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'add-image-disable' && newValue === 'disable') {
            this.addImageButton.onclick = null;
            this.addImageButton.classList.add('disabled')
        }
    }

    render() {
        this.innerHTML = `<div class="toolbar">
          <a title="Add image" functional-id="add-image" href="javascript:void(0)"> <i class="fas fa-plus"></i> </a>
          
    </div>`
        this.addImageButton.onclick = () => {
            this.dispatchEvent(addImageClick);
        }

    }
}