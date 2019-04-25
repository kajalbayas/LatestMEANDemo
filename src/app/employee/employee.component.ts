import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule ,FormBuilder,FormControl,FormGroup} from '@angular/forms'
import {Router,ActivatedRoute,Params} from '@angular/router';
import {Empmodel} from './empmodel.model';
import {EmpserviceService} from './empservice.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers:[EmpserviceService]
})
export class EmployeeComponent implements OnInit 
{

  isUpdate :string='';
  filterdata:any;
  Empobject :Empmodel = {}
  emp:Empmodel[]=[{}];
  isDesc: boolean;
  selectedEmp:Empmodel = {}

  sortingName:string ='';
  
  
  constructor(private formbuilder:FormBuilder,private router:Router,private empservice: EmpserviceService,private activatedroute:ActivatedRoute )
   { }


   //to navigate on click of view button
   getviewdeatils(id:number):void
   {
    this.empservice.getemployeedetailsbyid(id).subscribe
    ((data:any)=>
     {
         debugger;
          console.log(data);
          this.selectedEmp=data;
         
          this.router.navigate(['emp/viewemp',id]);

      })
   }


   edit(id:any):void
   { 
    
     debugger;
     this.isUpdate="edit";
     this.router.navigate(['emp/editemp',id]);

     
    /*this.empservice.getemployeedetailsbyid(id).subscribe
    ((data:any)=>
     {
         debugger;
          console.log(data);
          this.selectedEmp=data;
         
          this.router.navigate(['emp/viewemp',id]);

      })*/
     
     /*this.employeeform.setValue({
       //empid:data.empid,
       name:data.name,
       city: data.city,
       designation:data.designation,
       empid:data.empid,
       _id:data._id
 
     }); */// new code. here u only need to bind the data to form using set value function
    }


  getnavigate():void
  {
    this.router.navigate(['emp/newemp']);
  }


  showallemp(): void
  {
    debugger;

   this.empservice.detailemp().subscribe(
     (data: Empmodel[]) => 
     {
       debugger;
       console.log(data);
       this.emp = data;
     });
 }



/* search(term: string)
  {
    debugger;
  if(!term) {
    this.filterdata = this.emp;
  } else {
    this.filterdata = this.emp.filter(x => 
       x.name.trim().toLowerCase().includes(term.trim().toLowerCase())
    );
  }
}*/


/*getparams(employeeid):void
{
  
  debugger;
   this.empservice.getemployeedetailsbyid(employeeid).subscribe(
        (data:any)=>
        {
          debugger;
         console.log('fetched data'+data);
         this.selectedEmp = data;
         console.log(this.selectedEmp);
       })
   

}*/

sort(name: string): void 
{
  if (name && this.sortingName !== name) 
  {
    this.isDesc = false;
  } else
   {
    this.isDesc = !this.isDesc;
  }
  this.sortingName = name;
}



//to delete particular record 
delete(id:number):void
{

    let confirmMsg = confirm("Are you sure want to delete this record?");
    if(confirmMsg)
    {
      this.empservice.deletProductById(id).subscribe(
        (data:any)=>
        {
          //this.statusCode = "400";
          this.showallemp();
        }
      )
    
    }
  

    
}

  ngOnInit()
   {
     this.showallemp();
   }

  
}
