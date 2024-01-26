import { Injectable } from '@angular/core';
import { Hero } from '../models/hero.model';
import { Observable, of, tap } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private url = `${environment.baseUrl}/heroes`

  constructor(
    private messageService: MessageService,
    private http: HttpClient) {}

  // GET /heroes
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.url).pipe(tap((heroes) => {
      this.log(`fetched ${heroes.length} hero(es)`)
    }));
  }

  // GET /heroes/id
  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.url}/${id}`).pipe(
      tap((hero) => {
        this.log(`fetched ${this.descAttributes(hero)}`);
      })
    );
  }

  // POST /heroes
  create(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.url, hero).pipe(
      tap((hero) => this.log(`created ${this.descAttributes(hero)}`))
    )
  }

  // PUT /hero/id
  update(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.url}/${hero.id}`, hero).pipe(
      tap((hero) => {
        this.log(`Updated ${this.descAttributes(hero)}`);
      })
    );
  }

  private descAttributes(hero: Hero): string {
    return `Hero ID=${hero.id} and Name=${hero.name}`
  }

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`)
  }
}
