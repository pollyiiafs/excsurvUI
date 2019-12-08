import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './shared/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'excellentia-frontend';
  isLoggedIn : boolean = false;
  showErrorMsg : boolean = false;
  showSuccessMsg : boolean = false;
  showBErrorMsg : boolean = false;
  msg : string ="";
  userRole : string ="";
  

  constructor(private router: Router, private apiService: ApiService) { }

  makeMsgEmpty(){
    this.showErrorMsg =false;
    this.showSuccessMsg =false;
    this.showBErrorMsg = false;
  }

  logout(){
    this.makeMsgEmpty();
    this.apiService.logout(this,this.router);
  }

  closeModel(){
    this.makeMsgEmpty();
  }

  ngOnInit() {
    this.makeMsgEmpty();

    let token = window.localStorage.getItem('token');
    let tokenprvt = window.localStorage.getItem('tokenprvt');
    if( tokenprvt !=  null && !this.isLoggedIn) {
       this.router.navigate(['login']);
    }



    
  }


  

}
