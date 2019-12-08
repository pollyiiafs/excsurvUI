import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';


@Component({
    selector: 'main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
  })
export class MainComponent implements OnInit{
  userRole : string;

  
  ngOnInit() {
    this.apiService.getMenu().subscribe(
      res => {
        this.appComp.isLoggedIn = true;
        this.appComp.userRole = res['result'].authority;
      },
      err => {
        alert("error1 " + err);
      }
    );
  }

  constructor(private apiService: ApiService, private router: Router, private appComp: AppComponent) { }
    
  logout(){
    // this.appComp.isLoggedIn = false;
    // window.localStorage.removeItem('token');
    // window.localStorage.removeItem('tokenprvt');
    this.apiService.logout(this.appComp,this.router);
    // this.router.navigate(['login']);
  }
}