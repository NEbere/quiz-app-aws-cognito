import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {UserLoginService} from "../../service/user-login.service";
import {LoggedInCallback} from "../../service/cognito.service";
import { RouterModule, Routes, CanActivate } from "@angular/router";
import { Content, ContentService } from '../creators/content.service';
import { Injectable } from '@angular/core';
import { window } from "rxjs/operator/window";
import { UserParametersService, GetUserParametersService } from "../../service/user-parameters.service";

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './secureHome.html'
    // styleUrls: ['/assets/css/sb-admin.css']
})
export class SecureHomeComponent implements OnInit, LoggedInCallback {
    public userType: boolean
    public loading: boolean

    constructor(
        public router: Router, 
        public userService: UserLoginService,
        private getUserParamsService: GetUserParametersService
    ) {
        this.userService.isAuthenticated(this);
        console.log("SecureHomeComponent: constructor");
    }

    ngOnInit() {
        this.isCreator()
    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (!isLoggedIn) {
            this.router.navigate(['/home/login']);
        }
    }

    isCreator() {
        this.loading = true
        return this.getUserParamsService.getParameters().then(result => {
            this.loading= false
            if(result[0].Value == "1"){
                return this.userType = true
            } else {
                return this.userType = false 
            }
            
        })
        .catch(error => {
            console.log(error, 'Error getting user attributes in Route Guard')
            return error
        })
    }
}

