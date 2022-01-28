import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { delay, map, take, tap } from 'rxjs/operators';

import { MarvelApiResponse } from '../models/marvel-api-response.model';
import { CharacterModel } from '../models/character.model';
import { BehaviorSubject, Observable } from 'rxjs';

const  API_URL = 'https://gateway.marvel.com:443/v1/public';

@Injectable()
export class CharacterPlayersService {
  private apikey = 'bde7cb6e618f0eb227634270fb416159';
  private privatekey = 'a3808342d7c27585b4e4c849ef35d30127450595';
  private ts = Number(new Date()).toString();

  private hash = Md5.hashStr(this.ts + this.privatekey + this.apikey);

  private _playerCharacters = new BehaviorSubject<CharacterModel[]>([]);
  public readonly playerCharacters$: Observable<CharacterModel[]> = this._playerCharacters.asObservable();

  constructor(private http: HttpClient) { }

  public getMarvelCharacterByName(characterName: string){
    return this.http.get<MarvelApiResponse>(`${API_URL}/characters`, {
      params: {
        ts: this.ts,
        apikey: this.apikey,
        hash: this.hash,
        name: characterName
      }
    })
    .pipe(
      delay(2000),
      take(1),
      tap((character: MarvelApiResponse) => {
        const characters: CharacterModel[] = this._playerCharacters.getValue();
        
        const newCharacter: CharacterModel = {
          name: character.data.results[0].name,
          thumbnailUrl: character.data.results[0].thumbnail.path + '.' + character.data.results[0].thumbnail.extension
        } 

        characters.push(newCharacter);
        
        this._playerCharacters.next([...characters]);
      })
      )
    }
}
