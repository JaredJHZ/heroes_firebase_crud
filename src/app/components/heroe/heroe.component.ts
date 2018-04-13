import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Heroe} from '../../interfaces/heroe.interface';
import {HeroesService} from '../../services/heroes.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  heroe:Heroe = {
    nombre:'',
    bio:'',
    casa:'Marvel'
  };

  nuevo:boolean=true;
  id:string;
  nombreBoton:string;
  constructor(
    private _heroesService:HeroesService,
    private _router:Router,
    private aR:ActivatedRoute
  ) { 
    
  }

  ngOnInit() {
    this.aR.params.subscribe(
      (params)=>{
        if(params['id']=='nuevo'){
          this.nuevo = true;
          this.nombreBoton = 'Guardar nuevo'
        }else{
          this.nombreBoton = 'Guardar cambios';
          this.nuevo = false;
          this.id = params['id'];
          this._heroesService.getHeroe(this.id).subscribe(
            (data)=>{
              this.heroe = data;
              console.log(this.heroe);
            }
          )
        }

      }
    );
  }
  click():void{
    if(this.nuevo){
      this.guardar();
    }else{
      this.update();
    }
  }
  guardar():void{
    this._heroesService.newHeroe(this.heroe)
      .subscribe((data)=>{
      
        this._router.navigate(['/heroe',data.name]);
      },
      (error)=>{
        console.log(error);
      }
    );
  }
  update():void{
    this._heroesService.update(this.heroe,this.id).subscribe(
            (data)=>{
            
        }
       )
     }
  refresh(forma:NgForm){
    console.log(forma);
    this._router.navigate(['heroe','nuevo']);
    forma.reset({casa:'Marvel'});
       
  }
   }