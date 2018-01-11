import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import { Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
 
  @ViewChild('canvas') public container: ElementRef;
  private cx: CanvasRenderingContext2D;
  @Input() public width = 400;
  @Input() public height = 400;
  event: MouseEvent;
  clientX = 0;
  clientY = 0;

  boundary: {Left: any, right: any, top: any, bottom: any};
  ngOnInit() {
    // const canvasNE = this.canvas.nativeElement;
    this.cx = this.container.nativeElement.getContext('2d');
    this.container.nativeElement.width = this.width;
    this.container.nativeElement.height = this.height;
    console.log(this.container);
    // this.cx.shadowColor = 'grey';
    // this.cx.lineWidth = 3;
    // this.cx.lineCap = 'round';
    // this.cx.strokeStyle = '#111';

    this.boundary = {
      Left: this.container.nativeElement.offsetLeft,
      right: this.container.nativeElement.offsetLeft + this.container.nativeElement.width ,
      top: this.container.nativeElement.offsetTop ,
      bottom: this.container.nativeElement.offsetTop + this.container.nativeElement.height ,
    };
  }
  onEvent(event: MouseEvent): void {
      if (this.isMouseDown(event) && this.isInsideBoundary(event)){
        console.log('mouseDown');
    }
  }

  coordinates(event: MouseEvent): void {
    this.clientX = event.clientX;
    this.clientY = event.clientY;
    console.log(this.clientX , ':', this.clientY);
  }
  // onKey(event: MouseEvent) { // with type info
  //   this.values += (<HTMLCanvasElement>event.target).value + ' | ';
  // }


  isInsideBoundary(event: MouseEvent) {
    return event.clientX > this.boundary.Left &&
      event.clientX < this.boundary.right &&
      event.clientY > this.boundary.top &&
      event.clientY < this.boundary.bottom;
  }

  isMouseDown(event: MouseEvent){
    return event.type === 'mousedown';
  }
}
