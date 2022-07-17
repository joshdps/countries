import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html'
})
export class PaisInputComponent implements OnInit{

  @Input() placeholder: string = 'Capital';

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  
  debouncer: Subject<string> = new Subject();

  keyword: string = '' 

  constructor() { }
  
  ngOnInit(){
    this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe( valor =>{
      this.onDebounce.emit(valor)
    } )
  }

  buscar(){
    this.onEnter.emit(this.keyword)
  }
  
  teclaPresionada(){
    
   this.debouncer.next(this.keyword)

   
  }

}
