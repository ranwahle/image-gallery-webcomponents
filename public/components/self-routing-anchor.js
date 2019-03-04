import Router from '../router.js';

export default class SelfRoutingAnchor extends  HTMLAnchorElement {


    static get observedAttributes() {
        return ['href']
    }



    attributeChangedCallback(name, oldValue, newValue) {
        this.newLocation = newValue;

    }
    connectedCallback() {
        this.onclick = evt => {
            evt.stopPropagation();
            evt.preventDefault();
            Router.navigate(this.newLocation);
            // history.pushState(null, null, this.newLocation)
            return false;
        }
    }

}
