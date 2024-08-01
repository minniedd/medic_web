import { Component, OnInit } from '@angular/core';
import {GetAllResponseUser} from "../models/get-all-response";
import {GetAllService} from "../services/get-all.service";
import {AuthService} from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users:GetAllResponseUser[]=[];
  message: string = '';
  constructor(private getAllService:GetAllService, private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.getAllService.obradi().subscribe(x=>{
      this.users = x.users;
    });
  }

  logout() {
    this.authService.logout().subscribe(
      x => {
        this.message = x;
        this.router.navigate(['/login']);
      },
      error => {
        this.message = 'Failed';
      });
  }
}
