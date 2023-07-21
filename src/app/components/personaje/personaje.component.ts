import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeopleService } from 'src/app/services/people.service';

@Component({
  selector: 'app-personaje',
  templateUrl: './personaje.component.html',
  styleUrls: ['./personaje.component.css']
})
export class PersonajeComponent {

  people: any;
  spiner = true;

  constructor(private activatedRoute: ActivatedRoute, public peopleService: PeopleService) {
    
  }

  ngOnInit(){

    this.activatedRoute.params.subscribe((people: any) => {
  
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
