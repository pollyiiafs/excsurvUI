import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   userName: string;
   password: string;
   invalidLogin : boolean = false;
   errorMsg : string;
   errorMsgClass : string;

  constructor(private apiService: ApiService, private router: Router, private appComp: AppComponent) { }

  ngOnInit() {
  }


  login() {

    if (this.validation()) {
      return;
    }

    const loginPayload = {
      username: this.userName,
      password: this.password
    }
    
    
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('tokenprvt');
    
    this.apiService.login(loginPayload).subscribe(

      res => {
        if (res['status'] == 200) {
         this.invalidLogin = false;
          let str = loginPayload.username + ":" + loginPayload.password;
          window.localStorage.setItem('token', str);
          window.localStorage.setItem('tokenprvt', res['result']);
         this.router.navigate(['main']);
        }
        else{
          alert("error status not 200");
          this.invalidLogin = true;
          this.appComp.showErrorMsg = true;
          this.appComp.msg = "Invalid User";
        }
      },
      err => {
        this.invalidLogin = true;
        if(err.status == 401){
          // this.errorMsg = "Invalid Users";
          // this.errorMsgClass = "alert alert-danger";

          this.appComp.showErrorMsg = true;
          this.appComp.msg = "Invalid User";


        }
      }



    );
  }

  validation(): boolean {
    let flag = false;

    if (undefined == this.userName || this.userName == "") {
      alert("User name cannot be blank");
      flag = true;
    }
    else if (undefined == this.password || this.password == "") {
      alert("Password cannot be blank");
      flag = true;
    }
    return flag;
  }

}
