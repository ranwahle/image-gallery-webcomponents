/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface SmallImageComponent {
    /**
    * The first name
    */
    'imageContent': string;
    /**
    * The middle name
    */
    'imageTitle': string;
  }
  interface SmallImageComponentAttributes extends StencilHTMLAttributes {
    /**
    * The first name
    */
    'imageContent'?: string;
    /**
    * The middle name
    */
    'imageTitle'?: string;
    'onImage-click'?: (event: CustomEvent) => void;
  }
}

declare global {
  interface StencilElementInterfaces {
    'SmallImageComponent': Components.SmallImageComponent;
  }

  interface StencilIntrinsicElements {
    'small-image-component': Components.SmallImageComponentAttributes;
  }


  interface HTMLSmallImageComponentElement extends Components.SmallImageComponent, HTMLStencilElement {}
  var HTMLSmallImageComponentElement: {
    prototype: HTMLSmallImageComponentElement;
    new (): HTMLSmallImageComponentElement;
  };

  interface HTMLElementTagNameMap {
    'small-image-component': HTMLSmallImageComponentElement
  }

  interface ElementTagNameMap {
    'small-image-component': HTMLSmallImageComponentElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
