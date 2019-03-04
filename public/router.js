export default class Router {

    static get routerOutlet() {
        return document.querySelector('router-outlet')
    }

    static navigate(url) {
        history.pushState(null, null, url);
        this.routerOutlet.setAttribute('current-url', url)
    }
}
