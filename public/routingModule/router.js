import RoutingSnapshotTreeBuilder from './routing-snapshot-tree-builder.js';

export default class Router {

    routingSnapshotTreeBuilder;
    currentSnapshot;

    static router;
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

    navigate(url) {
]        url = new URL(url).pathname;
        history.pushState(null, null, url);

        this.currentSnapshot = this.routingSnapshotTreeBuilder.buildRouteTree(url);
        this.routerOutlet.setAttribute('current-url', url);
    }
}
