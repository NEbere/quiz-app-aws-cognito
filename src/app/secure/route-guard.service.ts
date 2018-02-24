import { RouterModule, Routes, CanActivate } from "@angular/router";
import { Content, ContentService } from './creators/content.service';
import { Injectable } from '@angular/core';
import { window } from "rxjs/operator/window";
import { UserParametersService, GetUserParametersService } from "../service/user-parameters.service";
import { Router } from '@angular/router';

@Injectable()
export class CreatorRouteGuard implements CanActivate {
    public userType: string

    constructor(
        private getUserParamsService: GetUserParametersService,
        private router: Router,
    ) { }

    canActivate() {
        return this.getUserParamsService.getParameters().then(result => {
            this.userType = result[0].Value
            if (this.userType == "1"){
                return true
            } else {
                this.router.navigate(['securehome/view-favorites']);
                return false
                
            }
        })
        .catch(error => {
            console.log(error, 'Error getting user attributes in Route Guard')
            return error
        })

    }
}


@Injectable()
export class ResponderRouteGuard implements CanActivate {
    public userType: string

    constructor(
        private getUserParamsService: GetUserParametersService,
        private router: Router,
    ) { }

    canActivate() {
        return this.getUserParamsService.getParameters().then(result => {
            this.userType = result[0].Value
            if (this.userType == "2"){
                return true
            } else {
                this.router.navigate(['securehome/view-contents']);
                return false
                
            }
        })
        .catch(error => {
            console.log(error, 'Error getting user attributes in Route Guard')
            return error
        })

    }
}

