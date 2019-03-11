import module from './index.js';
export default class RouterOutlet extends HTMLElement {

    static get observedAttributes() {
        return ['current-url']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name !== 'current-url' || oldValue === newValue) {
            return;
        }
        this.changeRoute(newValue)

    }

    clearChildren() {
        while (this.childNodes.length) {
            this.removeChild(this.firstChild)
        }
    }




    changeRoute(newRoute) {
       //  if (newRoute.endsWith('/')) {
       //      newRoute = newRoute.substring(0, newRoute.length - 1);
       //  }
       //  const newRouteData = routes.default.find(item => item.path === newRoute)
       // if (!newRouteData) {
       //     console.error(`no route data found for ${newRoute}`)
       //     return;
       // }

        const newRouteData = module.Router.router.routingSnapshotTreeBuilder.buildRouteTree(newRoute);

        if (!newRouteData) {
            throw Error(`Could not build tree for ${newRoute}`);
        }

       this.clearChildren();


        if (!newRouteData.attributes) {
            newRouteData.attributes = {};
        }
       const newElement = document.createElement(newRouteData.element, newRouteData.attributes);
       Object.keys(newRouteData.attributes  || {}).forEach(key => {
           newElement.setAttribute(key, newRouteData.attributes[key])
       })
       this.appendChild(newElement);




    }


    connectedCallback() {
        window.onpopstate = (e) => {
            console.log('pop state', e)
            this.changeRoute(window.location.pathname)
        }
        window.onpushstate =  (e) => {
            console.log('pop state', e)
        }

        this.changeRoute(window.location.pathname)
    }
}
