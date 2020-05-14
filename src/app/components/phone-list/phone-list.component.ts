import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { PhoneServiceService } from 'src/app/services/phone-service.service';
import { Phone } from 'src/app/models/phone.model';
import {MatTableDataSource} from '@angular/material/table'
import {MatPaginator} from '@angular/material/paginator'
import {MatSort} from '@angular/material/sort'

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.css']
})
export class PhoneListComponent implements OnInit, AfterViewInit {
  displayedColumns = ['listComb']
  phone: Phone = new Phone();
  phoneDatasource = new MatTableDataSource<String>();
  phonenumber: number=2039999988;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public phoneListService: PhoneServiceService) { }

  ngOnInit(): void {
    console.log("hereeeee");
    this.phoneDatasource = new MatTableDataSource<String>(this.phone.listComb);  
  }

  ngAfterViewInit(): void {
    this.phoneDatasource.paginator = this.paginator
    this.phoneDatasource.sort = this.sort;
  }
 
  findPhoneNumbers(){
    //alert(this.phonenumber);
    console.log("Got Phone list");
    this.phoneListService.getPhoneNumbersById(this.phonenumber)
    .subscribe((phone: Phone)=>{
      this.phone = phone;
      console.log("Got Phone list");
      this.phoneDatasource = new MatTableDataSource<String>(phone.listComb);
      this.phoneDatasource.sort = this.sort;
      this.phoneDatasource.paginator = this.paginator;
    })
  }

  applyFilter(value: string) {
    //const filterValue = (event.target as HTMLInputElement).value;
    this.phoneDatasource.filter = value.trim().toLowerCase();
    if (this.phoneDatasource.paginator) {
      this.phoneDatasource.paginator.firstPage();
    }
  }
}
