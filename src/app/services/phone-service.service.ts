import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import { throwError, Observable } from 'rxjs';
import {Phone} from '../models/phone.model'
import {catchError,retry} from 'rxjs/operators';

const apiServer= 'http://localhost:8080';

const httpOptions = {
  headers: new HttpHeaders({
    'Accepts' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PhoneServiceService {

  constructor(private httpClient:  HttpClient) { }

  getPhoneNumbersById(phonenumber: number): Observable<Phone>{
    console.log(apiServer+'/phone/getPhoneList/'+phonenumber)
    return this.httpClient.get<Phone>(apiServer+'/phone/getPhoneList/'+phonenumber,httpOptions)
          .pipe(retry(3),
            catchError(this.errorHandler)
          )
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
    } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
