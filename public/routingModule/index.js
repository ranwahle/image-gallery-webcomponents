import Router from './router.js';
import RouterOutlet from './router-outlet.js';
import SelfRoutingAnchor from './self-routing-anchor.js';
import RoutingSnapshot from './routing-snapshot.js';
import RoutingSnapshotTreeBuilder from './routing-snapshot-tree-builder.js';

customElements.define('router-outlet', RouterOutlet);
customElements.define('self-routing-anchor', SelfRoutingAnchor, {extends: 'a'})


export default  {
    Router: Router,
    RouterOutlet: RouterOutlet,
    Snapshot: RoutingSnapshot,
    RoutingSnapshotTreeBuilder: RoutingSnapshotTreeBuilder,
    AppRouter: function(routes) {return new Router(routes)}
};






