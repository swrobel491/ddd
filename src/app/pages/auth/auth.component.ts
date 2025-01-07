import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';

import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputTextModule, ButtonModule, PasswordModule],
})

export class AuthComponent implements OnInit {

  protected loginForm: WritableSignal<FormGroup> = signal(new FormGroup({}));
  protected registerForm: WritableSignal<FormGroup> = signal(new FormGroup({}));

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm.set(this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    }));

    this.registerForm.set(this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmpassword: new FormControl('', [Validators.required]),
    }));
  }

  onLogin() {
    if (this.loginForm().valid) {
      const username = this.loginForm().get('username')?.value || '';
      const password = this.loginForm().get('password')?.value || '';
      this.userService.login({ username, password }).subscribe({
        next: (response) => {
          if (response) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successful', life: 3000 });
          } else {
            this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Invalid user', life: 3000 });
          }
          this.router.navigate(['/calendar/analysis']);
        },
        error: (error: HttpErrorResponse) => {
          this.messageService.add({ severity: 'error', summary: "Error", detail: `${error.error}`, life: 4000 })
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill in all required fields correctly.', life: 3000 });
    }
  }
  onRegister() {
    if (this.registerForm().valid) {
      const username = this.registerForm().get('username')?.value;
      const password = this.registerForm().get('password')?.value;
      const confirmpassword = this.registerForm().get('confirmpassword')?.value;
      this.userService.register({ username, password, confirmpassword }).subscribe({
        next: (response) => {
          if (response) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Register successful', life: 3000 });
          } else {
            this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Invalid user', life: 3000 });
          }
        },
        error: (error: HttpErrorResponse) => {
          this.messageService.add({ severity: 'error', summary: "Error", detail: `${error.error}`, life: 4000 })
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill in all required fields correctly.', life: 3000 });
    }
  }

}
