import { BrowserModule } from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { SmallImageComponent } from './small-image/small-image.component';
import {createCustomElement} from '@angular/elements';

@NgModule({
  declarations: [
    AppComponent,
    SmallImageComponent
  ],
  entryComponents: [SmallImageComponent],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: []
})
export class AppModule {
  constructor(private injector: Injector) {

  }

  ngDoBootstrap() {
    const smallImageComponent = createCustomElement(SmallImageComponent, {injector: this.injector});
    customElements.define('small-image-component', smallImageComponent);
  }

}
