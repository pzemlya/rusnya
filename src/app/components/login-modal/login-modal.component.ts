import { Component, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { DOCUMENT } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, take, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent extends ModalComponent {
  public form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  });

  public isError: boolean = false;

  private onDestroy$ = new Subject<void>();

  constructor(
    @Inject(DOCUMENT) document: Document,
    public authService: AuthService
  ) {
    super();
  }

  public get email() {
    return this.form.get('email') as FormControl;
  }

  public get password() {
    return this.form.get('password') as FormControl;
  }

  public login() {
    this.form.markAllAsTouched();
    this.form.markAsDirty();

    if (this.form.invalid) {
      return;
    }

    const data = this.form.value as { email: string; password: string };
    this.authService
      .login(data)
      .pipe(
        takeUntil(this.onDestroy$),
        catchError((err) => {
          console.log(err);
          return of(null);
        })
      )
      .subscribe((result) => {
        if (result) {
          this.setOpenedSignInModal(false);
          return;
        }

        this.isError = true;

        this.form.valueChanges
          .pipe(take(1), takeUntil(this.onDestroy$))
          .subscribe(() => (this.isError = false));
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public setOpenedSignInModal(isOpened: boolean) {
    this.isOpened = isOpened;
    this.closed.emit(this.isOpened);
  }
}
