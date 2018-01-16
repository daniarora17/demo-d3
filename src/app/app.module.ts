import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CardComponentComponent } from './card-component/card-component.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { D3Service } from 'd3-ng2-service';


@NgModule({
  declarations: [
    AppComponent,
    CardComponentComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [D3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
