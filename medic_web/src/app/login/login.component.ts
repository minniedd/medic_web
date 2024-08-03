import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {User} from "../models/user";
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = { username: '', password: '' };
  errorMessage: string | null = null;
  loading: boolean = false;
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  login(user:User) {
    if (!this.user.username || !this.user.password) {
      this.errorMessage = 'Please enter both username and password.';
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    this.authService.login(this.user).subscribe(
      token => {
        localStorage.setItem('token', token);
        this.router.navigate(['/home']);
        this.loading = false;
      },
      error => {
        this.loading = false;
        if (error.status === 401) {
          this.errorMessage = 'Access denied. Only admin can log in.';
        } else {
          this.errorMessage = 'Invalid username or password';
        }
      }
    );
  }
}
