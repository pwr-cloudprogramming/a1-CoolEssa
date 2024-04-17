import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlayerData } from '../domain/player-data';
import { Observable } from 'rxjs';
import { Game } from '../domain/game';
import { Move } from '../domain/move';
import { BASE_URL } from '../base-url';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  startGame(playerData: PlayerData): Observable<Game> {
    return this.getRequest<Game>(playerData, '/start-game');
  }

  currentGameState(playerData: PlayerData): Observable<Game> {
    return this.getRequest<Game>(playerData, '/game');
  }

  setMove(move: Move): Observable<Game> {
    return this.http.post<Game>(BASE_URL + '/move', move);
  }

  restart(gameId: number): Observable<Game> {
    return this.http.post<Game>(BASE_URL + '/restart', gameId);
  }

  private getRequest<T>(playerData: PlayerData, url: string): Observable<T> {
    return this.http.get<T>(BASE_URL + url, this.getParamsAsOptions(playerData));
  }

  private getParamsAsOptions(playerData: PlayerData): { params: HttpParams } {
    return { params: new HttpParams().set('gameId', playerData.gameId).set('playerName', playerData.playerName) };
  }
}
