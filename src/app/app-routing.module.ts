import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SearchComponent } from "./components/search/search.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { RecipeComponent } from "./components/recipe/recipe.component";

const routes: Routes = [
  { path: "", redirectTo: "recipes", pathMatch: "full" },
  { path: "recipes", component: SearchComponent },
  { path: "recipes/:id", component: RecipeComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
