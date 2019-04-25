import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Empmodel } from '../empmodel.model';
import { EmpserviceService } from '../empservice.service';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
//import {Router,ActivatedRoute,Params} from '@angular/router';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'app-newemployee',
  templateUrl: './newemployee.component.html',
  styleUrls: ['./newemployee.component.css'],
  providers: [EmpserviceService]
})
export class NewemployeeComponent implements OnInit
 {
  backbttnhide:boolean;
  urlpath:any='';
  employeeform: FormGroup;
  newemp: Empmodel = {}
  emp: Empmodel[] = [{}];
  statusCode: string = '';
  submitted: boolean = false;
  selectedemp: Empmodel = {};
  setbutton:any;
  employeeid: any;
  isReadOnly :boolean =false;
  isButtonhide:boolean;

  /*employeeform:FormGroup;
  newemp: Empmodel = new Empmodel();
  emp:Empmodel[]=[];
  statusCode:string='';
  submitted:boolean=false;

  selectedemp :Empmodel=new Empmodel();*/


  constructor(private formbuilder: FormBuilder, private router: Router, private empservice: EmpserviceService, 
    private activatedroute: ActivatedRoute,private previousurl:Location)
   {
       
    }

  createempform()
   {
    
    this.employeeform = this.formbuilder.group(
      {
        name: [''],
        city: [''],
        designation: [''],
        salary: [''],
        created_at: [''],
        updated_at: [''],
        _id: ['']

      });
  }

  get f() { return this.employeeform.controls; }



  saveOrUpdate(employeeform): void 
  {
    debugger;
    this.submitted = true;
    let formdata = employeeform.getRawValue();
    this.newemp = formdata;

    if (this.employeeform.invalid)
     {
      return;
    }

    else 
    {


      this.empservice.saveallemp(this.newemp).subscribe(
        (data: any) => 
        {
          debugger;
          console.log(data);
          this.statusCode = "200";
          this.router.navigate(['emp']);

          //console.log("-----------");
          //this.showallemp();
        }
      )
    }
    this.employeeform.reset();
  }


  update(employeeform): void
   {
    debugger;
    //this.setbuttonvalue();
    let formdata = employeeform.getRawValue();
    this.newemp = formdata;
     
    this.empservice.updateempdetails(this.newemp,this.employeeid).subscribe(
      (data: any) => 
      {
        debugger;
        console.log(data);
        //this.statusCode = "201";
        this.router.navigate(['emp']);
       

      }
    )}
  
  buttonvalue():void
  {
     
    debugger;
      
     if(this.setbutton==='Update')
     {
       debugger;
         this.update(this.employeeform); 
     }
    if(this.setbutton==='Save')
     {
       debugger;
        this.saveOrUpdate(this.employeeform);
     }

    
  }



  getparams(employeeid): void 
  {

    debugger;
      this.empservice.getemployeedetailsbyid(employeeid).subscribe(
      (data: any) => 
      {
        debugger;
        console.log('fetched data' + data);
       // this.selectedemp = data;
       this.newemp =data
     })
  }


  back():void
  {
    this.router.navigate(['emp']);
  }

  ngOnInit()
   {
     debugger;
     
     this.isButtonhide=false; 
     this.backbttnhide=true;

     console.log(this.router.url);
     console.log(this.activatedroute.snapshot.url); // array of states
     
     this.urlpath=this.activatedroute.snapshot.url[0].path;
     console.log(this.urlpath);
    

    this.createempform();
  

    this.activatedroute.params.subscribe((params:Params) => 
    {
     
      if (this.activatedroute.snapshot.params['id']) 
      {
        this.setbutton='Update';  
      }
     
      else
      {
        this.setbutton='Save';  
      }
       

      this.employeeid=params['id'];
      console.log('selected id'+this.employeeid);
      this.getparams(this.employeeid);

      if(this.urlpath==="viewemp")
      {
           debugger;
           this.isButtonhide=true; 
           this.isReadOnly=true;
           this.backbttnhide=false;  
            }  
     })
   }
}

      /* this.activatedroute.params.subscribe((params:ParamMap) => 
      {
        debugger;
        this.employeeid=params['id'];
        console.log('selected id'+this.employeeid);
        this.isUpdate=params['k'];
        console.log(this.isUpdate);
        this.getparams(this.employeeid);
      
        //this.setbuttonvalue();
  
      })*/

      /*  this.activatedroute.queryParamMap.subscribe(params =>
    {
      debugger;
      this.employeeid = params.get['id'];
      console.log('selected id' + this.employeeid);
      this.isUpdate = params.get['k'];
      console.log(this.isUpdate);
      this.getparams(this.employeeid);

     })  */