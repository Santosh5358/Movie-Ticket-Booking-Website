import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { DynamicFormComponent } from "./dynamic-form/dynamic-form.component";
import { BookStatusComponent } from "./book-status/book-status.component";
import { PagenotfoundComponent } from "./pagenotfound/pagenotfound.component";
import { ErrorComponent } from "./error/error.component";
import { AddMoiveComponent } from "./add-moive/add-moive.component";
import { LoginComponent } from "./auth/login/login.component";
import { SinupComponent } from "./auth/sinup/sinup.component";
import { RouteGuardService } from "./auth/Authservice/route-guard.service";

const appRoutes:Routes=[
    {path:'',component:HomePageComponent},
    {path:'ticketBook/:name',component:DynamicFormComponent,canActivate:[RouteGuardService]},
    {path:"addMoive",component:AddMoiveComponent,canActivate:[RouteGuardService]},
    {path:'login',component:LoginComponent},
    {path:'sinup',component:SinupComponent},
    {path:'bookcheck',component:BookStatusComponent,canActivate:[RouteGuardService]},
    {path:'not-found',component:PagenotfoundComponent},
    {path:'error',component:ErrorComponent},
    {path:'**',redirectTo:'not-found'}
]
@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports:[RouterModule]
})
export class RoutingApp{

}