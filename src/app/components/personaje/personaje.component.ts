import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeopleService } from 'src/app/services/people.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-personaje',
  templateUrl: './personaje.component.html',
  styleUrls: ['./personaje.component.css']
})
export class PersonajeComponent implements OnInit, OnDestroy {

  people: any;
  spiner = true;
  unsubscribe$ = new Subject();

  constructor(private activatedRoute: ActivatedRoute, public peopleService: PeopleService) {
    
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  ngOnInit(){

    this.activatedRoute.params.pipe(takeUntil(this.unsubscribe$)).subscribe((people: any) => {
  
      const id = people.id;
      console.log(id);
      this.spiner = true;

      this.peopleService.getPeopleById(id).subscribe((resp: any) => {
        console.log(resp);
        this.people = resp;
        this.spiner = false;
      })
    })
  }

}
