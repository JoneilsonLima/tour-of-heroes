import { HeroService } from '../core/services/hero.service';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../core/models/hero.model';
import { HEROES } from '../core/services/mock-heroes';
import { MessageService } from '../core/services/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  public heroes: Hero[] = [];
  public displayedColumns: string[] = [
    'id',
    'name'
  ]

  constructor(
    private heroService: HeroService) {}

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

}
