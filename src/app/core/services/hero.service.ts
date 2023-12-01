import { Injectable } from '@angular/core';
import { Hero } from '../models/hero.model';
import { HEROES } from './mock-heroes';
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
        this.log(`fetched hero id=${id} and name=${hero.name}`);
      })
    );
  }

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`)
  }
}
