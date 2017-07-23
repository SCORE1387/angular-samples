import { Injectable } from '@angular/core';
import { Hero } from './hero';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';
  private headers = new Headers({'Content-Type': 'application/json'});

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

  createHero(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name})).toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);
  }

  updateHero(hero: Hero): Promise<Hero> {
    const updateHeroUrl = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(updateHeroUrl, JSON.stringify(hero))
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  deleteHero(id: number): Promise<void> {
    const deleteHeroUrl = `${this.heroesUrl}/${id}`;
    return this.http.delete(deleteHeroUrl)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred.', error);
    return Promise.reject(error.message || error);
  }
}
