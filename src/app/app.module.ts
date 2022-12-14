import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { ArrayVisualizerComponent } from './array-visualizer/array-visualizer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    VisualizerComponent,
    ArrayVisualizerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
