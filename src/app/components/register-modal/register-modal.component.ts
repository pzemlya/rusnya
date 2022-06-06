import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { catchError, take } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
})
export class RegisterModalComponent extends ModalComponent {
  public readonly sliderInfo = [
    {
      titleKey: 'register.slider.fast.title',
      bodyKey: 'register.slider.fast.body',
      imgName: 'rocket.png',
    },
    {
      titleKey: 'register.slider.support.title',
      bodyKey: 'register.slider.support.body',
      imgName: 'support.png',
    },
    {
      titleKey: 'register.slider.team.title',
      bodyKey: 'register.slider.team.body',
      imgName: 'team.png',
    },
  ];

  public currentSlide = 0;
  private interval: number | undefined;
  public isError = false;

  public form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
    repeatPassword: new FormControl(null, [
      this.matchPasswords.bind(this),
      Validators.required,
    ]),
    agreement: new FormControl(false, Validators.requiredTrue),
  });

  constructor(
    @Inject(DOCUMENT) document: Document,
    public authService: AuthService
  ) {
    super();
  }

  ngOnInit() {
    this.form?.valueChanges.subscribe(() => {
      console.log(this.form);
    });

    this.interval = setInterval(() => {
      this.currentSlide =
        this.sliderInfo.length - 1 < this.currentSlide + 1
          ? 0
          : this.currentSlide + 1;
    }, 3000);
  }

  public get email() {
    return this.form.get('email') as FormControl;
  }

  public get repeatPassword() {
    return this.form.get('repeatPassword') as FormControl;
  }

  public get password() {
    return this.form.get('password') as FormControl;
  }

  public get agreement() {
    return this.form.get('agreement') as FormControl;
  }

  public register() {
    this.form.markAllAsTouched();
    this.form.markAsDirty();

    if (this.form.invalid) {
      return;
    }

    const data = {
      email: this.email.value as string,
      password: this.password.value as string,
    };
    this.authService
      .register(data)
      .pipe(
        catchError((e) => {
          console.warn(e);
          return of(null);
        })
      )
      .subscribe((token) => {
        if (!token) {
          this.isError = true;

          this.form.valueChanges.pipe(take(1)).subscribe(() => {
            this.isError = false;
          });
          return;
        }
        this.setOpenedSignInModal(false);
      });
  }

  public setOpenedSignInModal(isOpened: boolean) {
    this.isOpened = isOpened;
    this.closed.emit(this.isOpened);
  }

  public setActiveSlide(slide: number) {
    clearInterval(this.interval);
    this.currentSlide = slide;
    this.interval = setInterval(() => {
      this.currentSlide =
        this.sliderInfo.length - 1 < this.currentSlide + 1
          ? 0
          : this.currentSlide + 1;
    }, 3000);
  }

  private matchPasswords(control: AbstractControl): ValidationErrors | null {
    if (!this.form) {
      return null;
    }

    return this.password.value !== control.value
      ? { matchPasswords: "Passwords don't match" }
      : null;
  }
}
