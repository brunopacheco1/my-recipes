import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SearchComponent } from "./components/search/search.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

import {
  MatButtonModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatTableModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatChipsModule,
  MatBadgeModule
} from "@angular/material";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RecipesService } from "./services/recipes.service";
import { AuthService } from "./services/auth.service";
import { AngularFireModule } from "@angular/fire";
import { environment } from "src/environments/environment";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { RecipeComponent } from "./components/recipe/recipe.component";
import { RecipeDialogComponent } from "./components/recipe-dialog/recipe-dialog.component";
@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    DashboardComponent,
    RecipeComponent,
    RecipeDialogComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTooltipModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatChipsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence()
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule
  ],
  entryComponents: [RecipeDialogComponent],
  providers: [RecipesService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
