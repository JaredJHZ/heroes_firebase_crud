import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Heroe} from '../interfaces/heroe.interface';
import 'rxjs/Rx';
@Injectable()
export class HeroesService {

  constructor(
    private http:Http
  ) { }

  url:string = 'https://heroes-5c4fb.firebaseio.com/Heroe/.json';

  newHeroe(heroe:Heroe){
    let body = JSON.stringify(heroe);
    let headers = new Headers({
      'Content-Type':'application/json'
    });

    return this.http.post(this.url, body, {headers})
    .map(
      (res) => {
        return res.json();
      }
    )
  }

  update(heroe:Heroe, key:string){
    let url = `https://heroes-5c4fb.firebaseio.com/Heroe/${key}.json`;
    let body = JSON.stringify(heroe);
    let id;
    let headers = new Headers({
      'Content-Type':'application/json'
    });
    return this.http.put(url, body, {headers})
    .map(
      (res) => {
        return res.json();
      }
    )
  }

  getHeroe(key:string){
    let url = `https://heroes-5c4fb.firebaseio.com/Heroe/${key}.json`;
    let headers = new Headers({
      'Content-Type':'application/json'
    });
    return this.http.get(url,{headers})
      .map(
        (res)=>{
          console.log(res);
          return res.json();
        }
      )
  }

  getAllHeroes(){
    return this.http.get(this.url)
      .map(
        (res)=>{
          return res.json();
        }
      )
  }

  deleteHeroe(key:string){
      let url = `https://heroes-5c4fb.firebaseio.com/Heroe/${key}.json`;
      return this.http.delete(url)
        .map(
          (res)=>{
            return res.status;
          }
        )
  }
}