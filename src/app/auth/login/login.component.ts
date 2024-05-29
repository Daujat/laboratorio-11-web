import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

const MODULES = [
  ReactiveFormsModule,
  RouterLink
]

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ MODULES ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  
  private router = inject(Router)
  private formBuilder = inject(FormBuilder)

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
  
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
  
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
  
      if (user.username === username && user.password === password) {
        console.log('Inicio de sesión exitoso');
        this.router.navigate(['/dashboard']);
      } else {
        console.log('Credenciales incorrectas');
      }
    } else {
      console.log('No hay usuarios registrados');
    }
  }
  
}