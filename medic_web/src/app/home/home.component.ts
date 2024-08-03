import { Component, OnInit } from '@angular/core';
import {GetAllResponseUser} from "../models/get all/get-all-response";
import {GetAllService} from "../services/get-all.service";
import {AuthService} from "../services/auth.service";
import { Router } from "@angular/router";
import {AddUserService} from "../services/add-user.service";
import {AddUserRequest} from "../models/add/add-user-request";
import {MyConfig} from "../helpers/My-Config";
import {HttpClient} from "@angular/common/http";

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
  selectedUser: any;

  constructor(private getAllService:GetAllService,
              private authService:AuthService,
              private router:Router,
              private addUserService:AddUserService,
              private httpClient:HttpClient) { }

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

  fetchDetails(userId: number): void {
    this.httpClient.get(`${MyConfig.server_address}/user/GetDetailsEndpoint?id=${userId}`).subscribe({
      next: (response: any) => {
        this.selectedUser = response;
        this.detailsShow = true;
      },
      error: (err) => {
        console.error("error while fetching user details", err);
      }
    });
  }

  Save() {
    this.httpClient.post(MyConfig.server_address + "/user/UpdateDetailsEndpoint/Update",this.selectedUser).subscribe(((x:any)=>{
    }))
  }

  blockUser(id:number) {
    this.httpClient.post(`${MyConfig.server_address}/user/BlockUserEndpoint/${id}`, {}).subscribe({
      next: (response: any) => {
        alert(response.message);
        this.fetchDetails(id);
      },
      error: (err) => {
        console.error("error while blocking user", err);
      }
    });
  }
}
