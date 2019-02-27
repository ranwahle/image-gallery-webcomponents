import {defineCustomElements} from 'stencil-components-gallery/dist/loader/index'

 // defineCustomElements(window).then(() => {}, err => console.error(err))


import ImageGallery from './components/image-gallery.component.js';
// import SmallImage from './components/small-image.component.js';
import AddImage from './components/add-image.component.js';
import GalleryToolbar from "./components/gallery-toolbar.component.js";
import DetailedImage from "./components/detailed-image.component.js";
// console.log('SmallImageComponent', AngularComponentsModule)
//  customElements.define('small-image-component', SmallImageComponent);
customElements.define('image-gallery', ImageGallery, {extends: 'div'})
// customElements.define('small-image', SmallImage, {extends: 'div'})
customElements.define('add-image', AddImage, {extends: 'div'})
customElements.define('gallery-toolbar', GalleryToolbar, {extends: 'div'})
customElements.define('detailed-image', DetailedImage, {extends: 'div'})
