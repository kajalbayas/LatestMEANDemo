//import { Http,Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empmodel } from './empmodel.model';
import 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'authkey',
        'userid': '1'
    })
};

@Injectable({
    providedIn: 'root'
})


export class EmpserviceService {

    Appurl: string = "";

    constructor(private httpclient: HttpClient) { }

    detailemp(): Observable<any> {
        this.Appurl = "http://localhost:5000/api/empdetails";
        return this.httpclient.get(this.Appurl);
    }

    saveallemp(emp: Empmodel): Observable<any> {
        this.Appurl = "http://localhost:5000/api/saveemp";
        return this.httpclient.post<any>(this.Appurl, emp);
    }

    getemployeedetailsbyid(id: number): Observable<any> {
        debugger;
        this.Appurl = "http://localhost:5000/api/empdetailsbyid";
        return this.httpclient.get(this.Appurl + '/' + id);
    }

    updateempdetails(emp: any,_id): Observable<any> {
        debugger
        this.Appurl = "http://localhost:5000/api/updateempdetails";
        return this.httpclient.put(this.Appurl + '/' + _id, emp)
    }


    deletProductById(id: number): Observable<any> 
    {
        this.Appurl = "http://localhost:5000/api/deleteemp";
        return this.httpclient.delete<any>(this.Appurl + "/" + id);
    }



}
