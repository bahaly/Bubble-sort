import { Component, OnInit } from '@angular/core';
import { BubbleSortServiceService } from '../bubble-sort-service.service';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent {

  COLOR = '#0490EE';
  COLOR_ON_MOVE = 'yellow';
  SWAP = 0;
  ANIMATION_SPEED_MS = 500;
  NUMBER_ELEMENTS = 25;
  STEP = 0
  animations : any[] = [];
  array : Array<number> = []

  constructor(private bubbleService: BubbleSortServiceService){
    this.createArray()
    this.bubbleService.getStartEvent().subscribe(() => this.bubbleSort())
    this.bubbleService.getChangeInSize().subscribe((size)=>{
      this.NUMBER_ELEMENTS = size;
      this.createArray();
    });
  }


  createArray(){
    this.STEP = 0
    this.SWAP = 0
    const array :Array<number> = []
    for (let i = 0; i < this.NUMBER_ELEMENTS; i++) {
      array.push(this.randomIntFromInterval(5, 730));
    }
    this.array = array
    console.log(array)
  }


  bubbleSort()
   {
      let animations = this.getAnimationsForBubbleSort(this.array);
      let box = document.getElementsByClassName('box');

      for(let i = 0; i< animations.length; i++)
      {
        //get animation data swap,j,array[j],j+1,array[j+1]
        const [check,v1,v2,v3,v4] = animations[i].slice();
        if(check === "HighLightOn")
        {
          let barOneStyle = <HTMLElement>box[v1];
          let barTwoStyle = <HTMLElement>box[v2];

          setTimeout(() => {
            barOneStyle.style.backgroundColor = this.COLOR_ON_MOVE;
            barTwoStyle.style.backgroundColor = this.COLOR_ON_MOVE;
           }, i * this.ANIMATION_SPEED_MS);
        }
        else if(check === "HighLightOff")
        {
          let barOneStyle = <HTMLElement>box[v1];
          let barTwoStyle = <HTMLElement>box[v2];

          setTimeout(() => {
            barOneStyle.style.backgroundColor = this.COLOR;
            barTwoStyle.style.backgroundColor = this.COLOR;
           }, i * this.ANIMATION_SPEED_MS);
        }
        else if(check === "Swap")
        {
          let barOneStyle = <HTMLElement>box[v1];
          let barTwoStyle = <HTMLElement>box[v3];
          //doing a swap of box with changement of text
          setTimeout(() => {
            barOneStyle.textContent = `${v2}`;
            barOneStyle.textContent = `${v4}`;
            this.SWAP++;
            this.STEP =  Math.floor((this.SWAP / this.array.length)) + 1
           }, i * this.ANIMATION_SPEED_MS);
        }
      }
   }

  getAnimationsForBubbleSort(array : any[])
  {
    let tempArray = array.slice();
    this.bubbleSortAlgo(tempArray);
    let tempAnimations = this.animations.slice();
    this.animations = [];
    return tempAnimations;
  }

  bubbleSortAlgo(array: any[]){
    let arrayLength = array.length;

    for(let i=0; i< arrayLength-1; i++)
    {
      for(let j=0; j< arrayLength-i-1; j++)
      {
        if(array[j] > array[j+1])
        {
          let temp = array[j];
          array[j] = array[j+1];
          array[j+1] = temp;

          //after execution of algo push animation sequences in animations tab
          this.animations.push(["HighLightOn",j,j+1]);
          this.animations.push(["HighLightOff",j,j+1]);
          this.animations.push(["Swap",j,array[j],j+1,array[j+1]]);
        }
      }
    }

    console.log(array);
  }

  randomIntFromInterval(min:any,max:any)  {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
