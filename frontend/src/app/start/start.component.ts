import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'ce-start',
  templateUrl: './start.component.html'
})
export class StartComponent {
  form: FormGroup;

  constructor(private router: Router) {
    this.form = new FormGroup({
      playerName: new FormControl('', [Validators.required]),
      gameId: new FormControl('', [Validators.required])
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.router.navigate(['/game/' + this.form.get('gameId')?.value + '/' + this.form.get('playerName')?.value]);
    }
  }
}
