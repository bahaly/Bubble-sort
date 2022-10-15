import { Component, OnInit, Input } from '@angular/core';
import { BubbleSortServiceService } from '../bubble-sort-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Input() backgroundColor = "gray"

  constructor(private bubbleService: BubbleSortServiceService) { }

  ngOnInit(): void {
  }

  startShorting()
  {
    this.bubbleService.startEvent();
  }

  ChangeSize(changeSize:any)
  {
    console.log('hello');

    this.bubbleService.sendSizeChangeEvent(changeSize);
  }



}
