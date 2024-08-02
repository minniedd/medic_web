import { Component, OnInit } from '@angular/core';
import {GetAllResponseUser} from "../models/get-all-response";
import {GetAllService} from "../services/get-all.service";
import {AuthService} from "../services/auth.service";
import { Router } from "@angular/router";
import {AddUserService} from "../services/add-user.service";
import {AddUserRequest} from "../models/add-user-request";
import {GetAllUserDetailsResponse} from "../models/get-all-user-details.response";
import {UserDetailsService} from "../services/user-details.service";
import {UpdateDetailsRequest} from "../models/update-details.request";
import {MyConfig} from "../helpers/My-Config";
import {HttpClient} from "@angular/common/http";
import {UpdateDetailsResponse} from "../models/update-details.response";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users:GetAllResponseUser[]=[];
  message: string = '';
  addUsers: AddUserRequest = {
      username: '',
      password: '',
      name: '',
      orders: 0,
      imageUrl: '',
      birthDate: new Date()
  };
  modalShow: boolean = false;
  detailsShow: boolean = false;
  selectedID:number=0;
  detailsUser: GetAllUserDetailsResponse = {
    id:0,
    name: '',
    username: '',
    orders:0,
    lastLoginDate: '',
    imageUrl: '',
    status: '',
    birthDate: ''
  };
  updateDetailsRequest: UpdateDetailsRequest = {
      id: this.detailsUser.id,
      name: this.detailsUser.name,
      username: this.detailsUser.username,
      orders: this.detailsUser.orders,
      imageUrl: this.detailsUser.imageUrl,
      birthDate: this.detailsUser.birthDate
    };

  constructor(private getAllService:GetAllService,
              private authService:AuthService,
              private router:Router,
              private addUserService:AddUserService,
              private getAllUserDetailsService: UserDetailsService,
              private updateDetailsService:UserDetailsService) { }

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

    close() {
        this.modalShow = false;
        this.detailsShow = false;
    }

    saveUser() {
        this.addUserService.obradi(this.addUsers).subscribe(x=>{
          console.log("user was added succesfully", x);

          this.getAllService.obradi().subscribe(x=>{
            this.users = x.users;
          });
          this.close();
        }, error => {
          console.error("error while adding user", error);
        });
    }

    openModal() {
        this.modalShow = true;
    }

  openDetailModal(id: number) {
      this.selectedID = id;
      this.getAllUserDetailsService.obradi({id: this.selectedID}).subscribe(x=>{
        this.detailsUser = x;
        this.updateDetailsRequest.id = this.detailsUser.id;
        this.detailsShow = true;
      });
  }

  changeUserDetails() {
      console.log('Update Details Request:', this.updateDetailsRequest);
      this.updateDetailsService.obradi(this.updateDetailsRequest).subscribe(
        (response:UpdateDetailsResponse) => {
              console.log('Update Response:', response);
              this.detailsUser = response;
              this.close();
          },
          error => {
              console.error('Error while updating user', error);
          }
      );
  }


}
