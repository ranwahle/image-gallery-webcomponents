import {Component, Element, Event, EventEmitter, Listen, Prop} from '@stencil/core';

@Component({
  tag: 'small-image-component',
  styleUrl: 'small-image-component.scss',
  shadow: true
})
export class SmallImageComponent {
  @Element() componentElement: HTMLElement;
  /**
   * The first name
   */
  @Prop({attr: 'image-content'}) imageContent: string;

  /**
   * The middle name
   */
  @Prop({attr: 'image-title'}) imageTitle: string;


  imageElement: HTMLImageElement;

  @Event({eventName: 'image-click'}) imageClicked: EventEmitter;


  componentDidUpdate() {

    this.imageElement = this.componentElement.shadowRoot.querySelector('img');
    if (!this.imageElement) {
      return;
    }

    this.imageElement.onload = () => {
      this.imageWidth = this.imageElement.width;
      this.imageHeight = this.imageElement.height;
    }
    //  this.imageElement.src = this.imageContent;
    //  this.style['background-image'] = `url(${this.imageContent})`;
    //  this.style['background-size'] = '100%';
    //  this.titleElement.innerText = this.imageTitle;
    //
    //
    //  this.onclick = () => this.dispatchEvent(imageClick)
  }

  imageLoaded(evt) {
    this.imageElement = evt.target;
    console.log("image element", this.imageElement);
    this.imageWidth = this.imageElement.width;
    this.imageHeight = this.imageElement.height;

  }


  @Listen('click') imageClick() {
    this.imageClicked.emit();
  }

  imageWidth: any;
  imageHeight: any;

  getStyle() {
    return {
      width: `${this.imageWidth}px`,
      height: `${this.imageHeight}px`
    }
  }

  render() {
    this.componentElement.style.setProperty('--background-image', `url(${this.imageContent})`)
    return (<div class="small-image-container">
      <div class="image-title">{this.imageTitle}</div>
      <img class="hidden" onLoad={this.imageLoaded.bind(this)} style={this.getStyle()} src={this.imageContent}/>
    </div>);
  }
}
