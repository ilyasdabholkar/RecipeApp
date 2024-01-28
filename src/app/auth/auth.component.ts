import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector : 'app-auth',
    templateUrl : './auth.component.html',
    styleUrls : ['./auth.component.css']
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error : string;

    constructor(private authService:AuthService,private router:Router) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form:NgForm){
        if(!form.valid){
           return;
        }  
        const email = form.value.email;
        const password = form.value.password;

        this.isLoading = true;

        let authObs : Observable<AuthResponseData>; 

        if(this.isLoginMode){
            authObs = this.authService.login(email,password)
        }else{
            authObs = this.authService.signup(email,password)
        }

        authObs.subscribe(
            resData => {
                console.log(resData)
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            error => {
                console.log(error);
                this.error = error;
                this.isLoading = false;
            }
        )
        form.reset();
    }
}