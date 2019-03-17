import RoutingSnapshotTreeBuilder from './routing-snapshot-tree-builder.js';

export default class Router {

    // routingSnapshotTreeBuilder;
    // currentSnapshot;

   // static router;
    static appRouter(routes) {
        Router.router = new Router(routes);
        return Router.router;
    }

    constructor(routes) {
        this.routingSnapshotTreeBuilder = new RoutingSnapshotTreeBuilder(routes);
    }

    get routerOutlet() {
        return document.querySelector('router-outlet');
    }

    async canGoOn(routeData, guard) {

        if (guard) {
            return await guard(routeData)
        }

        return true;
    }

    async navigate(url) {
        try {
            url = url === '/' ? url :  new URL(url).pathname;
        } catch (err) {
            throw Error(`Cannot construct url from ${url}`)
        }


        this.currentSnapshot = this.routingSnapshotTreeBuilder.buildRouteTree(url);

        const canGoOn = await this.canGoOn(url, this.currentSnapshot.guard);

        if (!canGoOn) {
            return;
        }

        history.pushState(null, null, url);

        this.routerOutlet.setAttribute('current-url', url);
    }
}
