import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BubbleSortServiceService {
  private subject = new Subject<any>();
  private sizeAsSubject = new Subject<any>();

  constructor() { }

  startEvent(){
    this.subject.next("start");
  }

  sendSizeChangeEvent(size:any)
  {
    this.sizeAsSubject.next(size);
  }

  getStartEvent():Observable<any>{
    return this.subject.asObservable();
  }

  getChangeInSize():Observable<any>{
    return this.sizeAsSubject.asObservable();
  }

}
