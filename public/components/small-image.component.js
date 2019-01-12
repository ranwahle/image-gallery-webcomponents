export default class SmallImage extends HTMLDivElement {


    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['image-title', 'image-content', 'file-name']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'image=content') {
            this.imagecontent = newValue || '';
        }
        if (name === 'file-name') {

            this.imageElement.src = newValue;
        }
    }



    get imageElement() {
        return  this.querySelector('img') || {};
    }


    render() {
        this.innerHTML = `<div  class="small-image-container"> <img  src="${this.attributes['image-content'].value ||  this.attributes['file-name'].value}">
              <div>${this.attributes['image-title'].value}</div>
</div>`;
    }

}

