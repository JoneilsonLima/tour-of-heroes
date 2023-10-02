import { HeroService } from './../service/hero.service';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero.model';
import { HEROES } from '../mock-heroes';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  constructor(
    private heroService: HeroService,
    private messageService: MessageService) {}

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe({
      next: (resp) => {
        this.heroes = resp;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponente: Selected hero id=${hero.id}`);
  }

}
