import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { BubbleSortServiceService } from '../bubble-sort-service.service';

@Component({
  selector: 'app-array-visualizer',
  templateUrl: './array-visualizer.component.html',
  styleUrls: ['./array-visualizer.component.css'],
})
export class ArrayVisualizerComponent implements AfterViewInit {
  COLOR = '#0490EE';
  COLOR_ON_MOVE = 'darkblue';
  SWAP = 0;
  ANIMATION_SPEED_MS = 10;
  NUMBER_ELEMENTS = 15;
  LOOP: number = 0;
  STEP: number = 0;

  animations: any[] = [];
  array: Array<number> = [];
  label = 'Starting Bubble Sort';

  @ViewChild('canvas')
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  constructor(private bubbleService: BubbleSortServiceService) {
    this.createArray();
    this.bubbleService.getStartEvent().subscribe(() => this.bubbleSort());
    this.bubbleService.getChangeInSize().subscribe((size) => {
      this.NUMBER_ELEMENTS = size;
      this.createArray();
    });
  }

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  createArray() {
    this.STEP = 0;
    this.SWAP = 0;
    const array: Array<number> = [];
    for (let i = 0; i < this.NUMBER_ELEMENTS; i++) {
      array.push(this.randomIntFromInterval(5, 730));
    }
    this.array = array;
    console.log(array);
  }

  async animation(j: number, array: any) {
    let box = document.getElementsByClassName('box');
    let barOneStyle = <HTMLElement>box[j];
    let barTwoStyle = <HTMLElement>box[j + 1];
    barOneStyle.style.backgroundColor = this.COLOR_ON_MOVE;
    barTwoStyle.style.backgroundColor = this.COLOR_ON_MOVE;

    const pos = this.getOffset(barOneStyle);

    //draw arrow
    this.draw_arrow( pos.left / 4.45, 40, pos.left / 4.45, 0)
    this.ctx.moveTo(pos.left / 4.45, 40);
    this.ctx.lineTo(pos.left / 4.45 + 10, 40);
    this.ctx.stroke();
    this.draw_arrow( pos.left / 4.45 + 10, 40, pos.left / 4.45 + 10, 0)

    if (array[j] > array[j + 1]) {
      await this.sleep(200);
      this.label = 'Swap';
      barOneStyle.classList.add('active');
      barTwoStyle.classList.add('active2');
      barOneStyle.textContent = array[j + 1];
      barTwoStyle.textContent = array[j];
      this.SWAP++;
    }
    await this.sleep(600);

    this.delete_arrow(pos)
    barOneStyle.style.backgroundColor = this.COLOR;
    barTwoStyle.style.backgroundColor = this.COLOR;
    barOneStyle.classList.remove('active');
    barTwoStyle.classList.remove('active2');
    return true;
  }

  getOffset(el: any) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
    };
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async bubbleSort() {
    const array = this.array.slice();
    let arrayLength = this.array.length;

    for (let i = 0; i < arrayLength - 1; i++) {
      this.STEP++;
      for (let j = 0; j < arrayLength - i - 1; j++) {
        this.LOOP++;
        this.label = 'compare element';
        await this.animation(j, array);

        if (array[j] > array[j + 1]) {
          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }
      }
    }
    this.label = 'Array Sorted';
    console.log(array);
  }

  randomIntFromInterval(min: any, max: any) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  draw_arrow(x0: number, y0: number, x1: number, y1: number) {
    const width = 0.8;
    const head_len = 4;
    const head_angle = Math.PI / 6;
    const angle = Math.atan2(y1 - y0, x1 - x0);

    this.ctx.strokeStyle = '#0490ee'
    this.ctx.fillStyle = '#0490ee'
    this.ctx.lineWidth = width;

    /* Adjust the point */
    x1 -= width * Math.cos(angle);
    y1 -= width * Math.sin(angle);

    this.ctx.beginPath();
    this.ctx.moveTo(x0, y0);
    this.ctx.lineTo(x1, y1);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.lineTo(x1, y1);
    this.ctx.lineTo(
      x1 - head_len * Math.cos(angle - head_angle),
      y1 - head_len * Math.sin(angle - head_angle)
    );
    this.ctx.lineTo(
      x1 - head_len * Math.cos(angle + head_angle),
      y1 - head_len * Math.sin(angle + head_angle)
    );
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fill();
  }
  delete_arrow(pos:any){
    this.ctx.strokeStyle = '#FFFFFF';
    this.ctx.moveTo(pos.left / 4.45, 0);
    this.ctx.lineTo(pos.left / 4.45, 40);
    this.ctx.lineTo(pos.left / 4.45 + 10, 40);
    this.ctx.lineTo(pos.left / 4.45 + 10, 0);
    this.ctx.lineWidth = 5;
    this.ctx.stroke();
  }
}
