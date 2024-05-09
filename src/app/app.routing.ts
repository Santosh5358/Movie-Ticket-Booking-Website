import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { DynamicFormComponent } from "./dynamic-form/dynamic-form.component";
import { BookStatusComponent } from "./book-status/book-status.component";
import { PagenotfoundComponent } from "./pagenotfound/pagenotfound.component";
import { ErrorComponent } from "./error/error.component";

const appRoutes:Routes=[
    {path:'',component:HomePageComponent},
    {path:'ticketBook/:name/:img',component:DynamicFormComponent},
    {path:'bookcheck',component:BookStatusComponent},
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