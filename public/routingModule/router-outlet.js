import module from './index.js'

export default class RouterOutlet extends HTMLElement {

    constructor() {
        super()
        this.animationDuration = 500
    }

    static get observedAttributes() {
        return ['current-url']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name !== 'current-url' || oldValue === newValue) {
            return
        }
        this.changeRoute(newValue, oldValue)

    }

    clearChildren() {

        if (!this.childNodes.length) {
            return

        }
        const child = this.firstChild
        child.animate({opacity: [1, 0]}, {duration: this.animationDuration - 500, easing: 'ease'})
        setTimeout(() => {
            this.removeChild(this.firstChild)
            this.clearChildren()
        }, this.animationDuration)


    }


    async changeRoute(newRoute) {

        const treeBuilder = module.Router.router.routingSnapshotTreeBuilder
        const router = module.Router.router
        const newRouteData = treeBuilder.buildRouteTree(newRoute)

        if (!newRouteData) {
            throw Error(`Could not build tree for ${newRoute}`)
        }

        const canGoOn = await router.canGoOn(window.location.pathname, newRouteData.guard)

        if (!canGoOn) {
            history.back()
            return
        }

        router.currentSnapshot = newRouteData

        this.clearChildren()


        if (!newRouteData.attributes) {
            newRouteData.attributes = {}
        }
        const newElement = document.createElement(newRouteData.element, newRouteData.attributes)
        Object.keys(newRouteData.attributes || {}).forEach(key => {
            newElement.setAttribute(key, newRouteData.attributes[key])
        })
        newElement.style.opacity = 0

        setTimeout(() => {
                this.appendChild(newElement)
                newElement.animate({opacity: [0, 1]}, {duration: 2000, easing: 'ease'})
                newElement.style.opacity = 1
            }
            , this.animationDuration)


    }


    connectedCallback() {
        window.onpopstate = async (e) => {
            const treeBuilder = module.Router.router.routingSnapshotTreeBuilder
            const prevUrl = history.state && history.state.prev;
            const currentRouteData = treeBuilder.buildRouteTree(prevUrl);
            const router = module.Router.router
            if (await router.canGoOn(window.location.pathname, null, currentRouteData && currentRouteData.deactivateGuard )) {
                this.changeRoute(window.location.pathname)
            } else {
                history.back();
            }
        }


        this.changeRoute(window.location.pathname)
    }
}
