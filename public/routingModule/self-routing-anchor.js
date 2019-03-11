import routing from './index.js';

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
            routing.Router.router.navigate(this.href);
            // history.pushState(null, null, this.newLocation)
            return false;
        }
    }

}
