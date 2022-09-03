import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthData } from 'src/app/models/user.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Output() sendLoginForm = new EventEmitter<AuthData>();
  public form!: FormGroup;
  public email = '';
  public password = '';
  hide = true;
  public ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(this.email, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(this.password, [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }
  public login(data = this.form.value): void {
    if (this.form.valid) {
      this.sendLoginForm.emit(data);
    }
  }
}
