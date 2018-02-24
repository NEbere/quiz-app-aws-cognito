import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Callback, CognitoUtil, LoggedInCallback } from '../../service/cognito.service';
import 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import {
    CognitoUserPool
} from "amazon-cognito-identity-js";
import * as AWS from "aws-sdk";
import * as awsservice from "aws-sdk/lib/service";
import * as CognitoIdentity from "aws-sdk/clients/cognitoidentity";
import { UserParametersService, GetUserParametersService } from "../../service/user-parameters.service";
import {UserLoginService} from "../../service/user-login.service";
import {Router} from "@angular/router";

export class Content {
    constructor(
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
    public parameters: Array<any> = [];

    public data = {
        UserPoolId: environment.userPoolId,
        ClientId : environment.clientId
    }

    public userPool = new CognitoUserPool(this.data)

    constructor(
        private http: Http,
        public cognitoUtil: CognitoUtil,
        public userParams: UserParametersService,
        public getUserParamsService: GetUserParametersService
    ) {
        this.cognitoUtil.getIdToken(new IdTokenCallback(this));
        this.userParams.getParameters(new GetParametersCallback(this, this.cognitoUtil));
    }

    getUserParameters() {
        this.getUserParamsService.getParameters().then(result =>{
        })
        return this.parameters
    }

    getContents(): Promise<any> {
        if(this.headers.keys().indexOf('user') == -1) {
            this.headers.append('user', this.idToken)
        }
        let options = new RequestOptions({ headers: this.headers });

        return this.http.get(`${this.API_URL}/docs`, options)
            .toPromise()
            .then(response => {
                return response.json().body as any
            })
            .catch(this.handleError);
    }

    getFavorites(): Promise<any> {
        if(this.headers.keys().indexOf('user') == -1) {
            this.headers.append('user', this.idToken)
        }
        let options = new RequestOptions({ headers: this.headers });

        return this.http.get(`${this.API_URL}/favorites`, options)
            .toPromise()
            .then(response => {
                return response.json().body as any
            })
            .catch(this.handleError);
    }

    getContent(id: string): Promise<any> {
        if(this.headers.keys().indexOf('user') == -1) {
            this.headers.append('user', this.idToken)
        }
        let options = new RequestOptions({ headers: this.headers });

        return this.http.get(`${this.API_URL}/docs/?id=${id}`, options)
            .toPromise()
            .then(response => {
                return response.json().body as any
            })
            .catch(this.handleError);
    }

    updateContent(content: any): Promise<any> {
        this.headers.append('Content-Type', 'application/json')
        if(this.headers.keys().indexOf('user') == -1) {
            this.headers.append('user', this.idToken)
        }
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
        if(this.headers.keys().indexOf('user') == -1) {
            this.headers.append('user', this.idToken)
        }
        let options = new RequestOptions({ headers: this.headers });

        return this.http
            .post(`${this.API_URL}/docs/`, JSON.stringify(content), options)
            .toPromise()
            .then(res => { return res.json().body as any })
            .catch(this.handleError);
    }


    saveSearch(content: any): Promise<any> {
        this.headers.append('Content-Type', 'application/json')
        if(this.headers.keys().indexOf('user') == -1) {
            this.headers.append('user', this.idToken)
        }
        let options = new RequestOptions({ headers: this.headers });

        return this.http
            .post(`${this.API_URL}/favorites/`, JSON.stringify(content), options)
            .toPromise()
            .then(res => { return res.json().body as any })
            .catch(this.handleError);
    }

    searchContent(searchTags: any): Promise<any> {
        let searchString = searchTags.join(",").replace(/\s+/g, '');
        if(this.headers.keys().indexOf('user') == -1) {
            this.headers.append('user', this.idToken)
        }
        let options = new RequestOptions({ headers: this.headers });

        return this.http.get(`${this.API_URL}/docs/?tags=${searchString}`, options)
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
        this.jwt.idToken = result;
    }
}


export class Parameters {
    name: string;
    value: string;
}

export class GetParametersCallback implements Callback {

    constructor(public contentService: ContentService, public cognitoUtil: CognitoUtil) {

    }

    callback() {

    }

    callbackWithParam(result: any) {

        for (let i = 0; i < result.length; i++) {
            let parameter = new Parameters();
            parameter.name = result[i].getName();
            parameter.value = result[i].getValue();
            this.contentService.parameters.push(parameter);
        }
    }
}