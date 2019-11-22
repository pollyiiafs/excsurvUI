import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ApiResponse } from '../model/api.resposne';
import { catchError, retry } from 'rxjs/operators';
import { Insurer } from '../claim-intimate/insurer';



@Injectable()
export class ApiService {
    constructor(private http: HttpClient) { }
    baseUrl: string = 'http://localhost:8080/';
  
//    baseUrl: string = 'http://excellentiasurveyor-env.mv2pngvddm.ap-south-1.elasticbeanstalk.com/';

    login(loginPayload): Observable<ApiResponse> {
        const headers = new HttpHeaders(
            { Authorization: 'Basic ' + btoa(loginPayload.username + ":" + loginPayload.password) }
        );
        return this.http.get<ApiResponse>(this.baseUrl + 'apilogin/login', { headers })
        .pipe(
            catchError(this.errorHandler));

    }

    errorHandler(err: HttpErrorResponse) {
       // return Observable.throw(err.message || "server error");
       return throwError(err);
    }

    logout(appComp,router): void {
        appComp.isLoggedIn = false;
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('tokenprvt');
        router.navigate(['login']);
    }

    getLookupData(): Observable<ApiResponse> {
        let token: string = window.localStorage.getItem('tokenprvt');
        const params = new HttpParams().set('token', token);
        return this.http.get<ApiResponse>(this.baseUrl + 'apiclaim/lookupdata', { params });
    }


    getMenu(): Observable<string> {
        let token: string = window.localStorage.getItem('tokenprvt');
        const params = new HttpParams().set('token', token);
        return this.http.get<string>(this.baseUrl + 'apimaster/menu', { params });
    }
    

    createClaim(insurer : Insurer): Observable<ApiResponse> {
        insurer.token =  window.localStorage.getItem('tokenprvt');
        return this.http.post<ApiResponse>(this.baseUrl + 'apiclaim/createClaim', insurer);
    }

    getClaimDetails(): Observable<ApiResponse> {
        let obj : Insurer = new Insurer();
        obj.token = window.localStorage.getItem('tokenprvt');
        return this.http.post<ApiResponse>(this.baseUrl + 'apiclaim/getClaimDetails', obj);
    }

    getAClaim(obj : Insurer): Observable<ApiResponse> {
        obj.token = window.localStorage.getItem('tokenprvt');
        return this.http.post<ApiResponse>(this.baseUrl + 'apiclaim/getAClaim', obj);
    }




}