import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

const MODULES = [
  ReactiveFormsModule,
  RouterLink
]

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [ MODULES ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      console.log('Formulario inválido');
      return;
    }

    const { username, email, password } = this.registerForm.value;
    const user = { username, email, password };
    localStorage.setItem('user', JSON.stringify(user));

    console.log('Usuario registrado:', user);

    this.router.navigate(['/login']);
  }
}