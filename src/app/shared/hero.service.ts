import { Injectable } from '@angular/core';
import { Hero } from './hero';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';

  constructor(private http: Http) {}

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(response => response.json().data as Hero[])
      .catch(this.handleError);
  }

  getHero(id: number): Promise<Hero> {
    const getHeroUrl = `${this.heroesUrl}/${id}`;
    return this.http.get(getHeroUrl)
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Unable to retrieve hero(es).', error);
    return Promise.reject(error.message || error);
  }
}
