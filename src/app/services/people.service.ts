import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { People } from '../interfaces/people';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  apiUrl = 'https://swapi.dev/api';

  constructor(public http: HttpClient) { }

  getAllPeople(){
  	return this.http.get<People>(`${this.apiUrl}/people`);  	
  }

  getPeopleById(id: string){
  	return this.http.get(`${this.apiUrl}/people/${id}`);  	
  }

}
