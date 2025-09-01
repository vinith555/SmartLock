import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule, MapMarker } from '@angular/google-maps';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Apiservice } from '../apiservice';


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

  constructor(private api:Apiservice) {}

  ngOnInit(): void {
    this.api.getLockStatus().subscribe((data)=>{this.onOff1 = data[0]; this.onOff2 = data[0]},(err)=>{ console.log(err);});
    this.api.getLocation().subscribe(
    (data) => {
      const newLat = data[0];
      const newLng = data[1];

      this.markerPosition = { lat: newLat, lng: newLng };
      this.mapOptions = {
        ...this.mapOptions,
        center: { lat: newLat, lng: newLng }  
      };
    },
    (err) => { console.log(err); }
  );
  }
  
  onClick1(){
    this.onOff1 = !this.onOff1;
    this.api.postLock({sideLock:this.onOff1,emergencyLock:this.onOff2}).subscribe((err)=>{console.log(err);
    })
  }
  onClick2(){
    this.onOff2 = !this.onOff2;
    this.api.postLock({sideLock:this.onOff1,emergencyLock:this.onOff2}).subscribe((err)=>{console.log(err);
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
