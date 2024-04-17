import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject, interval, of, switchMap, takeUntil } from 'rxjs';
import { GameService } from '../services/game.service';
import { PlayerData } from '../domain/player-data';
import { FormControl, FormGroup } from '@angular/forms';
import { GameState } from '../domain/game-state';
import { FieldState } from '../domain/field-state';
import { Game } from '../domain/game';

@Component({
  selector: 'ce-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.sass'
})
export class GameComponent implements OnInit, AfterViewChecked, OnDestroy {
  destroyed = new Subject();
  playerData?: PlayerData;
  isPlayerNoughts: boolean = false;
  hasGameEnded: boolean = false;
  form: FormGroup;
  siteInited: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  playerTurn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private activatedRoute: ActivatedRoute, private gameService: GameService) {
    this.form = new FormGroup({
      noughtsPlayerName: new FormControl(),
      crossesPlayerName: new FormControl(),
      gameState: new FormControl(),
      field: new FormGroup({
        position0: new FormControl(),
        position1: new FormControl(),
        position2: new FormControl(),
        position3: new FormControl(),
        position4: new FormControl(),
        position5: new FormControl(),
        position6: new FormControl(),
        position7: new FormControl(),
        position8: new FormControl()
      })
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      switchMap(params => of({gameId: +params.get('id')!, playerName: params.get('name')!})),
      switchMap(el => {
        this.playerData = el;
        return this.gameService.startGame(el)
      }),
      takeUntil(this.destroyed)
    ).subscribe(game => {
      this.updateForm(game);

      if (game.noughtsPlayerName === this.playerData?.playerName) {
        this.isPlayerNoughts = true;
      }

      this.siteInited.next(true);
      this.siteInited.complete();
    });
  }

  ngAfterViewChecked(): void {
    this.siteInited.pipe(
      takeUntil(this.destroyed)
    ).subscribe((isSiteInited) => this.handleGame(isSiteInited));
  }

  private handleGame(isSiteInited: boolean): void {
    if (isSiteInited) {
      const intervalObj = interval(5000).pipe(
        switchMap((val) => this.gameService.currentGameState(this.playerData!)),
        takeUntil(this.destroyed)
      ).subscribe(game => {
        this.validateIfPlayersTurn(game.gameState);

        if (this.form.get('gameState')?.value !== game.gameState) {
          this.updateForm(game);
        }
      });
    }
  }

  private validateIfPlayersTurn(gameState: GameState): void {
    if (!this.playerTurn.value) {
      if (this.isPlayerNoughts) {
        if (gameState === GameState.NOUGHTS_TURN) {
          this.playerTurn.next(true);
        }
      } else if (gameState === GameState.CROSSES_TURN) {
        this.playerTurn.next(true);
      }
    }
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  getForm(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  fieldChanged(): void {
    this.playerTurn.next(false);
    var player;

    if (this.isPlayerNoughts) {
      player = FieldState.NOUGHTS;
    } else {
      player = FieldState.CROSSES;
    }

    const subscription = this.gameService.setMove({field: this.form.get('field')?.value, gameId: this.playerData?.gameId!, player: player}).subscribe(game => {
      if (game) {
        this.updateForm(game);
        subscription.unsubscribe();
      }
    });
  }

  restartGame(): void {
    const subscription = this.gameService.restart(this.playerData?.gameId!).subscribe(newGame => {
      this.updateForm(newGame);
      subscription.unsubscribe();
    });
  }

  private updateForm(game: Game): void {
    this.form.patchValue(game);
    this.hasGameEnded = game.gameState === GameState.NOUGHTS_WINS || game.gameState === GameState.CROSSES_WINS || game.gameState === GameState.DRAW;
  }
}
