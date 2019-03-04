import ImageGallery from './components/image-gallery.component.js';
import SmallImage from './components/small-image.component.js';
import AddImage from './components/add-image.component.js';
import GalleryToolbar from "./components/gallery-toolbar.component.js";
import DetailedImage from "./components/detailed-image.component.js";
import SelfRoutingAnchor from "./components/self-routing-anchor.js";
import RouterOutlet from "./components/router-outlet.js";
import ImagesContainer from "./components/images-container.js";

customElements.define('image-gallery', ImageGallery, {extends: 'div'})
customElements.define('small-image', SmallImage, {extends: 'div'})
customElements.define('add-image', AddImage, {extends: 'div'})
customElements.define('gallery-toolbar', GalleryToolbar, {extends: 'div'})
customElements.define('detailed-image', DetailedImage, {extends: 'div'})
customElements.define('self-routing-anchor', SelfRoutingAnchor, {extends: 'a'})
customElements.define('router-outlet', RouterOutlet)
customElements.define('images-container', ImagesContainer, {extends: 'div'})
