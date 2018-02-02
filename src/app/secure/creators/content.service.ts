import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Callback, CognitoUtil } from '../../service/cognito.service';
import 'rxjs/Rx';
import { of } from 'rxjs/observable/of';

export class Content {
    constructor(
        //   public id: string,
        public title: string,
        public content: string,
        public tags: Array<any>,
        public response: Array<any>
    ) { }
}

@Injectable()
export class ContentService {
    private API_URL = environment.Endpoint;
    private headers = new Headers();
    public idToken: string;

    constructor(
        private http: Http,
        public cognitoUtil: CognitoUtil
    ) {
        this.cognitoUtil.getIdToken(new IdTokenCallback(this));
    }


    getContents(): Promise<any> {
        this.headers.append('user', this.idToken)
        let options = new RequestOptions({ headers: this.headers });

        return this.http.get(`${this.API_URL}/docs`, options)
            .toPromise()
            .then(response => {
                return response.json().body as any
            })
            .catch(this.handleError);
    }

    getContent(id: string): Promise<any> {
        let options = new RequestOptions({ headers: this.headers });
        console.log(this.headers, 'headers in get content')
        return this.http.get(`${this.API_URL}/docs/?id=${id}`, options)
            .toPromise()
            .then(response => {
                return response.json().body as any
            })
            .catch(this.handleError);
    }

    updateContent(content: any): Promise<any> {
        this.headers.append('Content-Type', 'application/json')
        let options = new RequestOptions({ headers: this.headers });

        const url = `${this.API_URL}/docs/?id=${content.id}`;

        return this.http.put(url, JSON.stringify(content), options)
            .toPromise()
            .then((response) => {
                return response.json().body as any;
            })
            .catch(this.handleError);
    }

    createContent(content: any): Promise<any> {
        this.headers.append('Content-Type', 'application/json')
        this.headers.append('user', this.idToken)
        console.log(content, 'content to be created')
        let options = new RequestOptions({ headers: this.headers });
        console.log(this.headers, 'headers in create')
        return this.http
            .post(`${this.API_URL}/docs/`, JSON.stringify(content), options)
            .toPromise()
            .then(res => {return res.json().body as any})
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
        console.log(result, 'this.jwt.idToken ')
        this.jwt.idToken = result;
    }
}