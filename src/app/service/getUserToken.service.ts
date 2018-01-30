import {Callback, CognitoUtil} from './cognito.service';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable()
export class getUserToken {
    public idToken: string;

    constructor ( 
        public cognitoUtil: CognitoUtil
    ) {
        this.cognitoUtil.getIdToken(new IdTokenCallback(this));
    }

    returnUserIDToken(): String{
        return this.idToken
    }

}


export class IdTokenCallback implements Callback {
    constructor(public userToken: getUserToken) {
    }
  
    callback() {
    }
  
    callbackWithParam(result) {
        console.log(result , 'this.jwt.idToken ')
        this.userToken.idToken = result;
    }
  }