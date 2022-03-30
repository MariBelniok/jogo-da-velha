import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { Md5 } from 'ts-md5/dist/md5';
import { environment } from '../../../environments/environment.local';
import { InformationDialogComponent } from '../../shared/dialog/information-dialog.component';
import { CharacterModel } from '../models/character.model';
import { MarvelApiResponse } from '../models/marvel-api-response.model';

const API_URL = environment.marvelApi;

@Injectable()
export class CharacterPlayersService {
  private apikey = environment.PUBLIC_API_KEY;
  private privatekey = environment.PRIVATE_API_KEY;
  private ts = Number(new Date()).toString();

  private hash = Md5.hashStr(this.ts + this.privatekey + this.apikey);

  private _playerCharacters = new BehaviorSubject<CharacterModel[]>([]);
  public readonly playerCharacters$ = this._playerCharacters.asObservable();

  constructor(
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  public getMarvelCharacterByName(characterName: string): Observable<MarvelApiResponse> {
    return this.getCharacter(characterName)
      .pipe(
        take(1),
        tap((res) => {
          if (res.data.results[0].length === 0) {
            throw new Error();
          }
        }),
        catchError((err: HttpErrorResponse) => {
          this.cleanCharacters();
          this.showErrorDialog();

          throw err;
        }),
        tap((character: MarvelApiResponse) => this.saveCharacter(character))
      );
  }

  private getCharacter(characterName: string): Observable<MarvelApiResponse> {
    return this.http
      .get<MarvelApiResponse>(`${API_URL}/characters`, {
        params: {
          ts: this.ts,
          apikey: this.apikey,
          hash: this.hash,
          name: characterName,
        },
      })
  }

  private cleanCharacters() {
    const characters: CharacterModel[] = this._playerCharacters.getValue();
    if (characters.length) {
      this._playerCharacters.next([]);
    }
  }

  private showErrorDialog(): void {
    this.dialog.open(InformationDialogComponent, {
      data: {
        message:
          'Ocorreu um erro ao buscar os personagens, por favor, revise os nomes escolhidos e tente novamente!',
        buttonText: 'Tentar Novamente',
      },
    });
  }

  private saveCharacter(character: MarvelApiResponse): void {
    const characters: CharacterModel[] = this._playerCharacters.getValue();

    const newCharacter: CharacterModel = {
      player: characters.length == 0 ? 'X' : 'O',
      name: character.data.results[0].name,
      thumbnailUrl:
        character.data.results[0].thumbnail.path +
        '.' +
        character.data.results[0].thumbnail.extension,
    };

    characters.push(newCharacter);

    this._playerCharacters.next([...characters]);
  }
}
