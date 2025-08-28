import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule, MapMarker } from '@angular/google-maps';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Apiservice } from '../apiservice';
import { log } from 'console';
import { interval, switchMap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,GoogleMapsModule,MapMarker,BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit{

  onOff1:boolean = false;
  onOff2:boolean = false;

  isBrowser: boolean = false;
    mapOptions: google.maps.MapOptions = {
    center: { lat: 11.5053, lng: 77.2383 },
    zoom: 15
  };
  markerPosition: google.maps.LatLngLiteral = { lat: 11.5053, lng: 77.2383};

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private api:Apiservice) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.api.getLockStatus().subscribe((data)=>{this.onOff1 = data[0]; this.onOff2 = data[0]},(err)=>{ console.log(err);
     });
     interval(5000) 
    .pipe(switchMap(() => this.api.getLocation()))
    .subscribe(coords => {
      this.markerPosition = { lat: coords[0], lng: coords[1] };
      this.mapOptions = { ...this.mapOptions, center: this.markerPosition };
    });
  }

  onClick1(){
    this.onOff1 = !this.onOff1;
    this.api.postFirstLock(this.onOff1).subscribe((err)=>{console.log(err);
    })
  }
  onClick2(){
    this.onOff2 = !this.onOff2;
    this.api.postSecondLock(this.onOff2).subscribe((err)=>{console.log(err);
    })
  }

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
