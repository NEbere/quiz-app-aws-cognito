import {RouterModule, Routes, CanActivate} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {AboutComponent, HomeComponent, HomeLandingComponent} from "./public/home.component";
import {SecureHomeComponent} from "./secure/landing/securehome.component";
import {MyProfileComponent} from "./secure/profile/myprofile.component";
import {JwtComponent} from "./secure/jwttokens/jwt.component";
import {UseractivityComponent} from "./secure/useractivity/useractivity.component";
import {LoginComponent} from "./public/auth/login/login.component";
import {RegisterComponent} from "./public/auth/register/registration.component";
import {ForgotPassword2Component, ForgotPasswordStep1Component} from "./public/auth/forgot/forgotPassword.component";
import {LogoutComponent, RegistrationConfirmationComponent} from "./public/auth/confirm/confirmRegistration.component";
import {ResendCodeComponent} from "./public/auth/resend/resendCode.component";
import {NewPasswordComponent} from "./public/auth/newpassword/newpassword.component";
import { CreateContentComponent } from './secure/creators/create-content/create-content.component';
import { ViewContentsComponent } from './secure/creators/view-contents/view-contents.component';
import { ContentDetailComponent } from './secure/creators/view-contents/content-detail.component';
import { SearchesComponent } from './secure/responder/searches/searches.component';
import { SaveSearchComponent } from './secure/responder/searches/save-search.component';
import { ViewFavoritesComponent } from './secure/responder/searches/view-favorites.component';
import { SearchListComponent } from './secure/responder/searches/search-listings.component';
import { EditSearchComponent } from './secure/responder/searches/edit-search.component'
import {CreatorRouteGuard, ResponderRouteGuard} from "./secure/route-guard.service";

const homeRoutes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            {path: 'about', component: AboutComponent},
            {path: 'login', component: LoginComponent},
            {path: 'register', component: RegisterComponent},
            {path: 'confirmRegistration/:username', component: RegistrationConfirmationComponent},
            {path: 'resendCode', component: ResendCodeComponent},
            {path: 'forgotPassword/:email', component: ForgotPassword2Component},
            {path: 'forgotPassword', component: ForgotPasswordStep1Component},
            {path: 'newPassword', component: NewPasswordComponent},
            {path: '', component: HomeLandingComponent}
        ]
    },
];

const secureHomeRoutes: Routes = [
    {

        path: '',
        redirectTo: '/securehome', // ResponderRouteGuard
        pathMatch: 'full'
    },
    {
        path: 'securehome', component: SecureHomeComponent, children: [
        {path: 'logout', component: LogoutComponent},
        {path: 'jwttokens', component: JwtComponent},
        {path: 'myprofile', component: MyProfileComponent},
        {path: 'useractivity', component: UseractivityComponent},
        {path: 'create-content', component: CreateContentComponent, canActivate: [CreatorRouteGuard]},
        {path: 'detail/:id', component: ContentDetailComponent, canActivate: [CreatorRouteGuard]},
        {path: 'edit-search/:id', component: EditSearchComponent, canActivate: [ResponderRouteGuard]},
        {path: 'save-search/:tags', component: SaveSearchComponent, canActivate: [ResponderRouteGuard]},
        {path: 'view-contents', component: ViewContentsComponent, canActivate: [CreatorRouteGuard]},
        {path: 'view-favorites', component: ViewFavoritesComponent, canActivate: [ResponderRouteGuard]},
        {path: 'search-listings/:tags', component: SearchListComponent, canActivate: [ResponderRouteGuard]},
        {path: 'search', component: SearchesComponent, canActivate: [ResponderRouteGuard]},
        {path: '', component: MyProfileComponent}]
    }
];


const routes: Routes = [
    {
        path: '',
        children: [
            ...homeRoutes,
            ...secureHomeRoutes,
            {
                path: '',
                component: HomeComponent
            }
        ]
    },


];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
