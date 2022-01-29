import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, filter, map, take, tap } from 'rxjs/operators';

import { Md5 } from 'ts-md5/dist/md5';

import { MarvelApiResponse } from '../models/marvel-api-response.model';
import { CharacterModel } from '../models/character.model';
import { InformationDialogComponent } from 'src/app/shared/dialog/information-dialog.component';

const  API_URL = 'https://gateway.marvel.com:443/v1/public';

@Injectable()
export class CharacterPlayersService {
  private apikey = 'bde7cb6e618f0eb227634270fb416159';
  private privatekey = 'a3808342d7c27585b4e4c849ef35d30127450595';
  private ts = Number(new Date()).toString();

  private hash = Md5.hashStr(this.ts + this.privatekey + this.apikey);

  private _playerCharacters = new BehaviorSubject<CharacterModel[]>([]);
  public readonly playerCharacters$: Observable<CharacterModel[]> = this._playerCharacters.asObservable();
  
  constructor(
    private http: HttpClient,
    private dialog: MatDialog  
  ) { }

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
      take(1),
      tap(res => {
        if (res.data.results[0].length == 0) {
          throw new Error;
        }
      }),
      catchError((err: HttpErrorResponse) => {
        const characters: CharacterModel[] = this._playerCharacters.getValue();
        if (characters) {
          this._playerCharacters.next([])
        }

        console.log(err.message)
        this.dialog.open(InformationDialogComponent, {
          data: {
            message: "Ocorreu um erro ao buscar os personagens, por favor, revise os nomes escolhidos e tente novamente!", 
            buttonText: "Tentar Novamente"
          }
        })

        return of(null)
      }),
      filter(res => res !== null),
      tap((character: MarvelApiResponse) => {
        const characters: CharacterModel[] = this._playerCharacters.getValue();
        
        const newCharacter: CharacterModel = {
          player: characters.length == 0 ? 'X' : 'O',
          name: character.data.results[0].name,
          thumbnailUrl: character.data.results[0].thumbnail.path + '.' + character.data.results[0].thumbnail.extension
        } 

        characters.push(newCharacter);
        
        this._playerCharacters.next([...characters]);
      })
      )
    }
}
