import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Hero} from '../shared/hero';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HeroSearchService {

  constructor(private http: Http) { }

  search(term: string): Observable<Hero[]> {
    const searchUrl = `api/heroes/?name=${term}`;
    return this.http.get(searchUrl).map(response => response.json().data as Hero[]);
  }

}
