import { Component, OnInit } from '@angular/core';
import {HeroesService} from '../../services/heroes.service';
import {Heroe} from '../../interfaces/heroe.interface';
import {Router} from '@angular/router'
@Component({
  selector: 'app-heroesng',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  constructor(
    private router:Router,
    private _heroesService:HeroesService
  ) { }

  allHeroes:any[]=[];
  loading:boolean = true;

  ngOnInit() {
    this._heroesService.getAllHeroes().subscribe(
      (data)=>{
        setTimeout(() => {
          this.allHeroes = data;
          this.loading = false;
        }, 1000);
        
      }
    );
    
  }
  eliminar(key:string){
    console.log(key);
    this._heroesService.deleteHeroe(key).subscribe(
      (data)=>{
        delete this.allHeroes[key];
      }
    );

  }

}
