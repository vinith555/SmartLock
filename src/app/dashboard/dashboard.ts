import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GoogleMapsModule, MapMarker } from '@angular/google-maps';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,GoogleMapsModule,MapMarker,BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  onOff:boolean = false;

  isBrowser: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  onClick(){
    this.onOff = !this.onOff;
  }
  mapOptions: google.maps.MapOptions = {
    center: { lat: 11.5053, lng: 77.2383 },
    zoom: 15
  };
  markerPosition: google.maps.LatLngLiteral = { lat: 11.5053, lng: 77.2383};

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July'
    ],
    datasets: [
      {
        data: [ 65, 59, 80, 81, 56, 55, 40 ],
        label: 'Series A',
        fill: false,                 
        tension: 0,                   
        borderColor: 'red',  
        borderWidth: 1,          
        backgroundColor: 'transparent'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };
  public lineChartLegend = true;
}
