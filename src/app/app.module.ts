import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {UserRegistrationService} from "./service/user-registration.service";
import {UserParametersService, GetUserParametersService} from "./service/user-parameters.service";
import {UserLoginService} from "./service/user-login.service";
import {CognitoUtil} from "./service/cognito.service";
import {routing} from "./app.routes";
import {AboutComponent, HomeComponent, HomeLandingComponent} from "./public/home.component";
import {AwsUtil} from "./service/aws.service";
import {UseractivityComponent} from "./secure/useractivity/useractivity.component";
import {MyProfileComponent} from "./secure/profile/myprofile.component";
import {SecureHomeComponent} from "./secure/landing/securehome.component";
import {JwtComponent} from "./secure/jwttokens/jwt.component";
import {LoginComponent} from "./public/auth/login/login.component";
import {RegisterComponent} from "./public/auth/register/registration.component";
import {ForgotPassword2Component, ForgotPasswordStep1Component} from "./public/auth/forgot/forgotPassword.component";
import {LogoutComponent, RegistrationConfirmationComponent} from "./public/auth/confirm/confirmRegistration.component";
import {ResendCodeComponent} from "./public/auth/resend/resendCode.component";
import {NewPasswordComponent} from "./public/auth/newpassword/newpassword.component";
import { CreateContentComponent } from './secure/creators/create-content/create-content.component';
import { ViewContentsComponent } from './secure/creators/view-contents/view-contents.component';
import { ContentDetailComponent }  from './secure/creators/view-contents/content-detail.component';
import { ResponderContentDetailComponent }  from './secure/responder/searches/content-detail.component';
import { ContentService } from './secure/creators/content.service';
import { getUserToken } from './service/getUserToken.service';
import { SearchesComponent } from './secure/responder/searches/searches.component';
import { SaveSearchComponent } from './secure/responder/searches/save-search.component';
import { ViewFavoritesComponent } from './secure/responder/searches/view-favorites.component';
import { ViewResponsesComponent } from './secure/responder/searches/view-responses.component';
import { SearchListComponent } from './secure/responder/searches/search-listings.component';
import { EditSearchComponent } from './secure/responder/searches/edit-search.component'
import {CanActivate} from "@angular/router";
import { CreatorRouteGuard, ResponderRouteGuard } from './secure/route-guard.service';

@NgModule({
    declarations: [
        NewPasswordComponent,
        LoginComponent,
        LogoutComponent,
        RegistrationConfirmationComponent,
        ResendCodeComponent,
        ForgotPasswordStep1Component,
        ForgotPassword2Component,
        RegisterComponent,
        AboutComponent,
        HomeLandingComponent,
        HomeComponent,
        UseractivityComponent,
        CreateContentComponent,
        MyProfileComponent,
        SecureHomeComponent,
        JwtComponent,
        ContentDetailComponent,
        ResponderContentDetailComponent,
        ViewContentsComponent,
        AppComponent,
        SearchesComponent,
        SaveSearchComponent,
        ViewFavoritesComponent,
        ViewResponsesComponent,
        SearchListComponent,
        EditSearchComponent
        
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    providers: [
        CognitoUtil,
        AwsUtil,
        UserRegistrationService,
        UserLoginService,
        UserParametersService,
        GetUserParametersService,
        getUserToken,
        ContentService,
        CreatorRouteGuard,
        ResponderRouteGuard
        
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
