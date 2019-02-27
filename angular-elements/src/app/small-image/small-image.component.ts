import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'small-image-component',
  templateUrl: './small-image.component.html',
  styleUrls: ['./small-image.component.scss']
})
export class SmallImageComponent implements OnInit {

  constructor() { }

  @Input('image-title') imageTitle: string;
  @Input('image-content') imageContent: string;
  @Output('image-click') imageClick = new EventEmitter();

  ngOnInit() {
  }

  imageClicked() {
    this.imageClick.emit();
  }

}
