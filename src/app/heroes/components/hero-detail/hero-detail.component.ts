import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../../core/models/hero.model';
import { HeroService } from '../../../core/services/hero.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
    public hero!: Hero;
    public isEditing!: boolean;

    constructor(
      private heroService: HeroService,
      private location: Location,
      private route: ActivatedRoute
      ) {}

    ngOnInit(): void {
        this.getHero();
    }

    getHero(): void {
      let paranId = this.route.snapshot.paramMap.get('id');
      if (paranId === 'new') {
        this.isEditing = false;
        this.hero = {name: ''} as Hero;
      } else {
        this.isEditing = true;
        const id = Number(paranId)
        this.heroService.getHero(id).subscribe(hero => this.hero = hero);
      }
    }

    goBack(): void {
      this.location.back();
    }

    isFormValid(): boolean {
      return !!this.hero.name.trim();
    }

    create(): void {
      this.heroService.create(this.hero).subscribe({
        next: () => this.goBack()
      });
    }

    update(): void {
      this.heroService.update(this.hero).subscribe({
        next: () => this.goBack()
      });
    }
}
