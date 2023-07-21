import { Component } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { People } from 'src/app/interfaces/people';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  spiner = true;
  listPeoples: any;
  unsubscribe$ = new Subject();

  constructor(public peopleService: PeopleService) {
    
  }

  ngOnInit() {
  	this.obtenerPersonajes();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  obtenerPersonajes(){
    this.spiner = true;
    this.peopleService.getAllPeople().pipe(takeUntil(this.unsubscribe$)).subscribe((resp: People) => {    
      
      this.listPeoples = resp.results.filter(data => Number(this.obtenerIdPersonaje(data.url)) < 7);   
  
      this.spiner = false;
      console.log(this.listPeoples);
   
        
      
    }, err => {
      console.log(err);
    })
  }

  obtenerIdPersonaje(cadena: string){
    return cadena.substring(29,cadena.length - 1);
  }

}
