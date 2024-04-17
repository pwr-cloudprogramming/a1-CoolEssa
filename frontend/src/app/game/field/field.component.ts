import { AfterViewChecked, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FieldState } from '../../domain/field-state';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'ce-field',
  templateUrl: './field.component.html'
})
export class FieldComponent implements AfterViewChecked, OnDestroy {
  destroyed = new Subject();

  @Input()
  state!: FormControl;

  @Input()
  playerTurn!: BehaviorSubject<boolean>;

  @Input()
  isPlayerNoughts!: boolean;

  @Output()
  fieldChanged: EventEmitter<void> = new EventEmitter();

  isPlayerTurn: boolean = false;

  CROSSES = FieldState.CROSSES;
  NOUGHTS = FieldState.NOUGHTS;

  ngAfterViewChecked(): void {
    this.playerTurn.pipe(
      takeUntil(this.destroyed)
    ).subscribe(isPlayerTurn => this.isPlayerTurn = isPlayerTurn);
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  onClick(): void {
    if (this.isPlayerNoughts) {
      this.state.patchValue(FieldState.NOUGHTS);
    } else {
      this.state.patchValue(FieldState.CROSSES);
    }
    this.fieldChanged.emit();
  }
}
