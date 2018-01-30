import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {environment} from '../../../environments/environment';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import {Callback, CognitoUtil} from '../../service/cognito.service';
import 'rxjs/Rx';


export class Content {
    constructor(
      public id: string,
      public title: string,
      public content: string,
      public tags: Array<any>
    ) { }
  }

@Injectable()
export class ContentService {
    private API_URL = environment.Endpoint;
    private headers = new Headers();
    public idToken: string;

    constructor ( 
        private http: Http,
        public cognitoUtil: CognitoUtil
    ) {
        this.cognitoUtil.getIdToken(new IdTokenCallback(this));
    }


    getContents(): Promise<any> {
        this.headers.append('user', this.idToken)

        let options = new RequestOptions({ headers : this.headers });
        console.log(this.headers, 'this.headers')

        return this.http.get(`${this.API_URL}/docs`, options)
        .toPromise()
        .then(response => {
            return response.json().body as any
        })
        .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}

export class IdTokenCallback implements Callback {
    constructor(public jwt: ContentService) {
    }
  
    callback() {
    }
  
    callbackWithParam(result) {
        console.log(result , 'this.jwt.idToken ')
        this.jwt.idToken = result;
    }
  }