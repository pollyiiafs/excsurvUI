import { Component, OnInit } from '@angular/core';
import { Insurer } from './insurer';
import { State } from './state';
import { ApiService } from '../shared/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppComponent } from '../app.component';
import { FormGroup, FormControl } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { stringify } from '@angular/core/src/util';




@Component({
  selector: 'app-claim-intimate',
  templateUrl: './claim-intimate.component.html',
  styleUrls: ['./claim-intimate.component.css']
})  
export class ClaimIntimateComponent implements OnInit {

  viewClaimObj : any;
  
  insurerList : any;
  insurerListDup : any ;
  stateList : any;
  insurerMap : any;
  stateMap : any;
  sourceOfInstList : any;
  sourceOfInstListDD : any;  
  srcOfInstMap : any;
  brokerList : any;
  brokerMap : any;
  insurer : Insurer;
  typeList : any



  //variables for insured --
  insuredList : any;
  insuredMap : any;
  estClaimList : any;
  estClaimMap : any;
  regBranchList : any;
  regBranchMap : any;  
  deptList : any;
  deptMap : any;
  subDeptList : any;
  subDeptDupList : any;
  subDeptMap: any;


  //job assigned to  ----
  surveyorList : any;
  surveyorMap : any;
  fieldStaffList : any;
  fieldStaffMap : any;

  private paramid : any = null;


  constructor(private apiService: ApiService, private router: Router,private route :ActivatedRoute,
    private appComp: AppComponent) {

     }
 

  ngOnInit() {
    this.route.params.subscribe( params => 
      {
        console.log(params);
        this.paramid = params.id;
      }
    );

     this.insurer = new Insurer();
    
     

     if(this.paramid){
      
      this.insurer.misid = this.paramid;
      this.apiService.getAClaim(this.insurer).subscribe(

          res => {
            if (res['status'] == 200) {
              console.log(res);
              this.viewClaimObj = JSON.parse(JSON.stringify(res.result[0]));
              console.log(this.insurer);
              // this.appComp.showSuccessMsg = true;
              this.appComp.msg = res.message.toString();
              this.getLookupData("FETCH_DATA");
            
            }
            else if (res['status'] == 401) {
              console.log("error status 401");
              this.appComp.showErrorMsg = true;
              this.appComp.msg = res.message.toString();
            }
            else if (res['status'] == 500){
              this.appComp.showBErrorMsg = true;
              this.appComp.msg = res.message.toString();
            }
          },
          err => {
            if(err.status == 401){
              console.log("401..");
            }
            else if (err.status == 500){
              this.appComp.showBErrorMsg = true;
              this.appComp.msg = "Please contact Technical team";
            }
          }
        );
      }
      else{
        this.getLookupData("NULL");
      }
      
  }

  getLookupData(callFrom : string){
    
    this.apiService.getLookupData().subscribe(

      res => {
        if (res['status'] == 200) {
          console.log(res);
          this.insurerList = res.result[0];
          this.sourceOfInstList = res.result[1];
          this.brokerList = res.result[2];
          this.insuredList = res.result[3];
          this.estClaimList = res.result[4];
          this.regBranchList = res.result[5];
          this.deptList = res.result[6];
          this.subDeptDupList = res.result[7];
          this.surveyorList = res.result[8];
          this.fieldStaffList = res.result[9];
          if(callFrom =="FETCH_DATA"){
            this.insurer.jobNo = this.viewClaimObj.jobNo;
            for(var i=0;i<this.insurerList.length;i++){
              var obj = this.insurerList[i];
              if(obj.id == this.viewClaimObj.insurer)
               { 
                 this.insurer.typeSelected = obj.type;
                 this.insurer.id = obj.id;
                this.insurer.insurerSelected = obj.name;
                this.insurer.stateSelected = obj.state;
                this.insurer.gst = obj.gstNo;
                break;
               }
            }

            this.insurer.insurerClaimNo = this.viewClaimObj.insurerClaimNo;


            // var obj  = this.insurerMap.get(val);
            // console.log(val + "  " + obj);
            // if(obj == undefined) return;
            // this.insurer.id = obj.id;
            // this.stateList = obj;
            // var list = [];
            // this.stateMap = new Map<string,any>();
            // for(var i=0;i<this.stateList.length;i++){
            //   this.stateMap.set(this.stateList[i].state,this.stateList[i]);
            //   list.push("*"+this.stateList[i].state);
            // }
        
            // this.stateList = list;


            for(var i=0;i<this.sourceOfInstList.length;i++){
              var obj = this.sourceOfInstList[i];
              if(obj.id == this.viewClaimObj.srcOfInst)
               { 
                 this.insurer.srcOfInsId = obj.id;
                 this.insurer.srcOfInsSelected = obj.name;
                this.insurer.email = obj.email;
                this.insurer.contactNo = obj.contactNo;
                this.insurer.add = obj.address;
                break;
               }
            }
            

            this.insurer.date = new Date(this.viewClaimObj.dtTimeIntimation);
            this.insurer.time = new Date(this.viewClaimObj.dtTimeIntimation).getHours();

            for(var i=0;i<this.brokerList.length;i++){
              var obj = this.brokerList[i];
              if(obj.id == this.viewClaimObj.broker)
               { 
                 this.insurer.brokerId = obj.id;
                 this.insurer.brokerSelected = obj.name;
                break;
               }
            }

            for(var i=0;i<this.insuredList.length;i++){
              var obj = this.insuredList[i];
              if(obj.id == this.viewClaimObj.insured)
               {
                this.insurer.insuredId = obj.id; 
                this.insurer.insuredSelected = obj.name;
                this.insurer.insuredContactNo = obj.mobile;
                this.insurer.insuredEmail = obj.email;
                this.insurer.insuredAdd = obj.add_on_policy_doc;
                break;
               }
            }

            this.insurer.insureRepName = this.viewClaimObj.repName;
            this.insurer.insuredPolNo = this.viewClaimObj.policyNo;

            for(var i=0;i<this.estClaimList.length;i++){
              var obj = this.estClaimList[i];
              if(obj.id == this.viewClaimObj.estClaimAmt)
               { 
                 this.insurer.estiClaimAmtId = obj.id;
                 this.insurer.estClaimAmtSelected = obj.value;
                break;
               }
            }

            for(var i=0;i<this.regBranchList.length;i++){
              var obj = this.regBranchList[i];
              if(obj.id == this.viewClaimObj.regBranch)
               { 
                 this.insurer.regBranchId = obj.id;
                 this.insurer.regBranchSelected = obj.name;
                break;
               }
            }

            for(var i=0;i<this.regBranchList.length;i++){
              var obj = this.regBranchList[i];
              if(obj.id == this.viewClaimObj.mailSendToBranch)
               { 
                 this.insurer.mailSendToBrId = obj.id;
                 this.insurer.mailSendToBranchSelected = obj.name;
                break;
               }
            }

            this.insurer.locOfLoss = this.viewClaimObj.locationOfLoss;

            for(var i=0;i<this.deptList.length;i++){
              var obj = this.deptList[i];
              if(obj.id == this.viewClaimObj.deptName)
               { 
                 this.insurer.deptId = obj.id;
                 this.insurer.deptSelected = obj.name;
                break;
               }
            }

            this.insurer.grNo = this.viewClaimObj.grNO;
            this.insurer.grDate = new Date(this.viewClaimObj.grDate);

            this.insurer.regDate = new Date(this.viewClaimObj.regDt);

            for(var i=0;i<this.subDeptDupList.length;i++){
              var obj = this.subDeptDupList[i];
              if(obj.id == this.viewClaimObj.subDept)
               { 
                this.insurer.subDeptId = obj.id;
                this.insurer.subDeptSelected = obj.name;
                break;
               }
            }

            this.insurer.invoiceNo = this.viewClaimObj.invoiceNo;
            this.insurer.invoiceDate = new Date(this.viewClaimObj.invoiceDt);

            this.insurer.spclInst = this.viewClaimObj.specialInfo;


          for(var i=0;i<this.surveyorList.length;i++){
              var obj = this.surveyorList[i];
              if(obj.id == this.viewClaimObj.surveyor)
               { 
                 this.insurer.surveyorId = obj.id;
                 this.insurer.surveyorSelected = obj.name;
                this.insurer.surveyoremail = obj.email;
                this.insurer.surveryorcontact = obj.mobile;
                break;
               }
            }

            for(var i=0;i<this.fieldStaffList.length;i++){
              var obj = this.fieldStaffList[i];
              if(obj.id == this.viewClaimObj.fieldStaff)
               { 
                this.insurer.fieldStaffId = obj.id; 
                this.insurer.fieldStaffSelected = obj.name;
                this.insurer.fieldStaffemail =  obj.email;
                this.insurer.feildStaffContact = obj.mobile;
                break;
               }
            }
            

          }
          this.prepareLookupData();
          if(callFrom == "AFTER_SUBMIT"){
            //this.afterSubmitPrePopulateLookups();
          }

          if(callFrom == "FETCH_DATA"){
            this.afterFetchDataPrePopulateLookups();
          }
      
        }
        else if (res['status'] == 401) {
          console.log("error status 401");
          this.appComp.showErrorMsg = true;
          this.appComp.msg = res.message.toString();

          
        }
      },
      err => {
        if(err.status == 401){
          console.log("401..");
        }
      }
    );
  }

  afterFetchDataPrePopulateLookups(){
    //sub depart -----
    this.subDeptMap = new Map<string,any>();
    var listsub = [];
    this.subDeptList =[];
    for(var i=0;i<this.subDeptDupList.length;i++){
      var obj = this.subDeptDupList[i];
      if(obj.department == this.insurer.deptId){
        listsub.push("*"+obj.name);
        this.subDeptMap.set(obj.name,obj);
      }
    }

    this.subDeptList = listsub;


   //state -------
   var obj  = this.insurerMap.get(this.insurer.insurerSelected);
   this.stateList = obj;
   var list = [];
   this.stateMap = new Map<string,any>();
   for(var i=0;i<this.stateList.length;i++){
     this.stateMap.set(this.stateList[i].state,this.stateList[i]);
     list.push("*"+this.stateList[i].state);
   }

   this.stateList = list;

   //source of insturction ----
   this.sourceOfInstListDD = [];
   this.srcOfInstMap = new Map<string,any>();
   for(var i=0;i<this.sourceOfInstList.length;i++){
       var obj1 = this.sourceOfInstList[i];
       for(var k=0;k<obj.length;k++){
         if(obj[k].id == obj1.insurer){
           this.sourceOfInstListDD.push("*"+obj1.name);
           this.srcOfInstMap.set(obj1.name,obj1);
         }
       }
 }
  }

  onChangeTypeDD(){
      this.onChangeInsurerDDNoResult();
      this.insurer.insurerSelected = "" ;
      
      var val = this.insurer.typeSelected.replace("*","");
      this.insurer.typeSelected = val;
      
      this.insurerList = [];
      var insurerset = new Set<string>();
      for(var i=0;i<this.insurerListDup.length;i++){
        var obj = this.insurerListDup[i];
        if(obj.type == this.insurer.typeSelected){
          if(!insurerset.has(obj.name)){
            insurerset.add(obj.name);
            this.insurerList.push("*"+obj.name);
          }
  

        }
       
      }
 
  }

  onChangeTypeDDNoResult(){
      this.onChangeInsurerDDNoResult();
      this.insurerList = [];
      this.insurer.insurerSelected = "";
      this.insurer.jobNo = "";
  }


  onChangeInsurerDDNoResult(){
    this.insurer.gst = "";
    this.insurer.email = "";
    this.insurer.add = "";
    this.insurer.contactNo = "";
   this.sourceOfInstListDD = [];
    this.insurer.srcOfInsSelected = "";
    this.stateList = [];
    this.insurer.stateSelected = "";
    this.insurer.id = "";

  }

  onChangeInsurerDD(){
      var val = this.insurer.insurerSelected.replace("*","");
      this.insurer.insurerSelected = val;
      this.insurer.gst = "";
      this.insurer.email = "";
      this.insurer.add = "";
      this.insurer.contactNo = "";
      this.sourceOfInstListDD = [];
     this.stateList = [];
      if(val == "0"){
        return;
      }
  
      //state -------
      var obj  = this.insurerMap.get(val);
      console.log(val + "  " + obj);
      if(obj == undefined) return;
      this.stateList = obj;
      var list = [];
      this.stateMap = new Map<string,any>();
      for(var i=0;i<this.stateList.length;i++){
        this.stateMap.set(this.stateList[i].state,this.stateList[i]);
        list.push("*"+this.stateList[i].state);
      }
  
      this.stateList = list;

      //source of insturction ----
      this.sourceOfInstListDD = [];
      this.srcOfInstMap = new Map<string,any>();
      for(var i=0;i<this.sourceOfInstList.length;i++){
          var obj1 = this.sourceOfInstList[i];
          for(var k=0;k<obj.length;k++){
            if(obj[k].id == obj1.insurer){
              this.sourceOfInstListDD.push("*"+obj1.name);
              this.srcOfInstMap.set(obj1.name,obj1);
            }
          }
    }
    

  }

  onChangeStateDDNoResult(){
      this.insurer.gst  = "";
      this.insurer.id = "";
  }

  onChangeStateDD(){
    var val = this.insurer.stateSelected.replace("*","");
    this.insurer.stateSelected = val;
    this.insurer.gst  = "";    
    if(val == "0")return;
    var obj = this.stateMap.get(val)
    this.insurer.gst = obj.gstNo;
    this.insurer.id = obj.id;
  }

  onChangeSourceOfInstNoResult(){
    this.insurer.email = "";
    this.insurer.add = "";
    this.insurer.contactNo = "";
    this.insurer.srcOfInsId = "";
  }


  onChangeSourceOfInst(){
    var val = this.insurer.srcOfInsSelected.replace("*","");
    this.insurer.srcOfInsSelected = val;
    this.insurer.email = "";
    this.insurer.add = "";
    this.insurer.contactNo = "";

    var obj = this.srcOfInstMap.get(this.insurer.srcOfInsSelected);
    this.insurer.srcOfInsId = obj.id;
    this.insurer.email = obj.email;
    this.insurer.add = obj.address; 
    this.insurer.contactNo = obj.contactNo;

  }

  onChangeBroker(){
    this.insurer.brokerSelected = this.insurer.brokerSelected.replace("*","");
    this.insurer.brokerId = (this.brokerMap.get(this.insurer.brokerSelected)).id;
  }

  onChangeBrokerNoResult(){
    this.insurer.brokerId ="";
  }


  prepareLookupData(){
    this.insurerMap = new Map<string,any>();
    var list =[];
    var arr = []
    var listTemp = [];
    this.insurerListDup = JSON.parse(JSON.stringify(this.insurerList));
    for(var i=0;i<this.insurerList.length;i++){
      var obj = this.insurerList[i];
      if(this.insurerMap.has(obj.name)){ //if found
        var a = this.insurerMap.get(obj.name);
        a.push(obj);
      }
      else{ //if not found
        arr = [];
        arr.push(obj);
        list.push(obj);
        listTemp.push("*"+obj.name);
        this.insurerMap.set(obj.name, arr);
      }
     
    }

    this.insurerList = listTemp;

    var listty = [];
    var typeset = new Set<string>();
    for(var i=0;i<this.insurerListDup.length;i++){
      var obj = this.insurerListDup[i];
      if(!typeset.has(obj.type)){
        typeset.add(obj.type)
        listty.push("*"+obj.type);
      }
    }

    this.typeList = listty;

    this.brokerMap = new Map<string,any>();
    var listbrkr = [];
    for(var i=0;i<this.brokerList.length;i++){
      var obj = this.brokerList[i];
      listbrkr.push("*"+obj.name);
      this.brokerMap.set(obj.name,obj);
    }

    this.brokerList = listbrkr;

    //insured  --------------------
    this.insuredMap = new Map<string,any>();
    var listinsd = [];
    for(var i=0;i<this.insuredList.length;i++){
      var obj = this.insuredList[i];
      listinsd.push("*"+obj.name);
      this.insuredMap.set(obj.name,obj);
    }

    this.insuredList = listinsd;

    this.estClaimMap = new Map<string,any>();
    var listes = [];
    for(var i=0;i<this.estClaimList.length;i++){
      var obj = this.estClaimList[i];
      listes.push("*"+obj.value);
      this.estClaimMap.set(obj.value,obj);
    }

    this.estClaimList = listes;

    this.regBranchMap = new Map<string,any>();
    var listreg = [];
    for(var i=0;i<this.regBranchList.length;i++){
      var obj = this.regBranchList[i];
      listreg.push("*"+obj.name);
      this.regBranchMap.set(obj.name,obj);
    }
    this.regBranchList = listreg;

    this.deptMap = new Map<string,any>();
    var listdep = [];
    for(var i=0;i<this.deptList.length;i++){
      var obj = this.deptList[i];
      listdep.push("*"+obj.name);
      this.deptMap.set(obj.name,obj);
    }
    this.deptList = listdep;


    this.surveyorMap = new Map<string,any>();
    var listsur = [];
    for(var i=0;i<this.surveyorList.length;i++){
      var obj = this.surveyorList[i];
      listsur.push("*"+obj.name);
      this.surveyorMap.set(obj.name,obj);
    }
    this.surveyorList = listsur;


    this.fieldStaffMap = new Map<string,any>();
    var listfs = [];
    for(var i=0;i<this.fieldStaffList.length;i++){
      var obj = this.fieldStaffList[i];
      listfs.push("*"+obj.name);
      this.fieldStaffMap.set(obj.name,obj);
    }
    this.fieldStaffList = listfs;


  }

  onChangeSurveyorDD(){
    this.insurer.surveyorSelected = this.insurer.surveyorSelected.replace("*","");
    var obj = this.surveyorMap.get(this.insurer.surveyorSelected);
    this.insurer.surveyorId = obj.id;

    this.insurer.surveyoremail = obj.email;
    this.insurer.surveryorcontact = obj.mobile;

  }

  onChangeSurveyorDDNoResult(){
    this.insurer.surveyorId = "";

    this.insurer.surveyoremail = "";
    this.insurer.surveryorcontact = "";
  }

  onChangeFieldStaffDD(){
    this.insurer.fieldStaffSelected = this.insurer.fieldStaffSelected.replace("*","");
    var obj = this.fieldStaffMap.get(this.insurer.fieldStaffSelected);
    this.insurer.fieldStaffId = obj.id;

    this.insurer.fieldStaffemail = obj.email;
    this.insurer.feildStaffContact = obj.mobile;


  }

  onChangeFieldStaffDDNoResult(){
    this.insurer.fieldStaffId = "";

    this.insurer.fieldStaffemail = "";
    this.insurer.feildStaffContact = "";
    
  }

  afterSubmitPrePopulateLookups(){
    //SOURCE OF INSTRUCTION ----- 
    this.sourceOfInstListDD = [];
    for(var i=0;i<this.sourceOfInstList.length;i++){
      var obj = this.sourceOfInstList[i];
      if(this.insurer.id == obj.insurer){
        this.sourceOfInstListDD.push("*"+obj.name);
      }
    }

    //STATE ----------
    var obj  = this.insurerMap.get(this.insurer.insurerSelected);
    if(obj != undefined) {
      this.stateList = obj;
      var list = [];
      this.stateMap = new Map<string,any>();
      for(var i=0;i<this.stateList.length;i++){
        this.stateMap.set(this.stateList[i].state,this.stateList[i]);
        list.push("*"+this.stateList[i].state);
      }
      this.stateList = list;
    }


    //SUB DEPT ------------
    var obj  = this.deptMap.get(this.insurer.deptSelected);
    if(obj != undefined){
    this.subDeptMap = new Map<string,any>();
      var listsub = [];
      this.subDeptList =[];
      for(var i=0;i<this.subDeptDupList.length;i++){
        var obj = this.subDeptDupList[i];
        if(obj.department == this.insurer.deptId){
          listsub.push("*"+obj.name);
          this.subDeptMap.set(obj.name,obj);
        }
      }
      this.subDeptList = listsub;
    }

  }


  onClickSubmit(){
    console.log(this.insurer);

    this.apiService.createClaim(this.insurer).subscribe(

      res => {
        if (res['status'] == 200) {
          console.log(res);
          var obj = res.result[0];
          this.insurer.id = res.result[0].id;
          this.insurer.srcOfInsId = res.result[1].id; 
          this.insurer.brokerId = res.result[2].id; 
          this.insurer.jobNo = res.result[3].jobNo;
          this.insurer.misid = res.result[3].id;
          this.appComp.showSuccessMsg = true;
          this.appComp.msg = res.message.toString();
          this.getLookupData("AFTER_SUBMIT");
         
        }
        else if (res['status'] == 401) {
          console.log("error status 401");
          this.appComp.showErrorMsg = true;
          this.appComp.msg = res.message.toString();
        }
        else if (res['status'] == 500){
          this.appComp.showBErrorMsg = true;
          this.appComp.msg = res.message.toString();
        }
      },
      err => {
        if(err.status == 401){
          console.log("401..");
        }
        else if (err.status == 500){
          this.appComp.showBErrorMsg = true;
          this.appComp.msg = "Please contact Technical team";
        }
      }
    );
  }


 //method for insured ----------
 onChangeInsuredDD(){
   console.log(this.insurer.insuredSelected);
    var val = this.insurer.insuredSelected.replace("*","");
    this.insurer.insuredSelected = val;
    this.insurer.insuredContactNo = "";
    this.insurer.insuredEmail = "";
    this.insurer.insuredAdd = "";
 
    var obj  = this.insuredMap.get(val);
    console.log(val + "  " + obj);
    if(obj == undefined) return;
    this.insurer.insuredId = obj.id;
    this.insurer.insuredContactNo = obj.mobile;
    this.insurer.insuredEmail = obj.email;
    this.insurer.insuredAdd = obj.add_on_policy_doc;
   

 }

 onChangeInsuredDDNoResult(){
  if(this.insurer.jobNo == ""){
    this.insurer.insuredContactNo = "";
    this.insurer.insuredEmail = "";
    this.insurer.insuredAdd = "";
  }
  
 }

 onChangeEstimationClaimAmtDD(){
   var val = this.insurer.estClaimAmtSelected.replace("*","");
   this.insurer.estClaimAmtSelected = val;

   var obj  = this.estClaimMap.get(val);
   console.log(val + "  " + obj);
   if(obj == undefined) return;
   this.insurer.estiClaimAmtId = obj.id;
 }

 onChangeEstimationClaimAmtDDNoResult(){
   console.log(this.insurer.estClaimAmtSelected);
   this.insurer.estiClaimAmtId = "";
 }

 onChangeRegBranchDD(){
  var val = this.insurer.regBranchSelected.replace("*","");
  this.insurer.regBranchSelected = val;

  var obj  = this.regBranchMap.get(val);
  console.log(val + "  " + obj);
  if(obj == undefined) return;
  this.insurer.regBranchId = obj.id;
 }

 onChangeRegBranchDDNoResult(){
  this.insurer.regBranchId = "";
 }


 onChangeMailRegBranchDD(){
  var val = this.insurer.mailSendToBranchSelected.replace("*","");
  this.insurer.mailSendToBranchSelected = val;

  var obj  = this.regBranchMap.get(val);
  console.log(val + "  " + obj);
  if(obj == undefined) return;
  this.insurer.mailSendToBrId = obj.id;
 }

 onChangeMailRegBranchDDNoResult(){
  this.insurer.mailSendToBrId = "";
 }


 onChangeDeptDD(){
  var val = this.insurer.deptSelected.replace("*","");
  this.insurer.deptSelected = val;

  var obj  = this.deptMap.get(val);
  console.log(val + "  " + obj);
  if(obj == undefined) return;
  this.insurer.deptId = obj.id;

  this.subDeptMap = new Map<string,any>();
    var listsub = [];
    this.subDeptList =[];
    for(var i=0;i<this.subDeptDupList.length;i++){
      var obj = this.subDeptDupList[i];
      if(obj.department == this.insurer.deptId){
        listsub.push("*"+obj.name);
        this.subDeptMap.set(obj.name,obj);
      }
    }

    this.subDeptList = listsub;

 } 

 onChangeDeptDDNoResult(){
  this.insurer.deptId = "";
  this.insurer.subDeptSelected = "";
  this.insurer.subDeptId = "";
  this.subDeptList =[];

 }

 onChangeSubDeptDD(){
  var val = this.insurer.subDeptSelected.replace("*","");
  this.insurer.subDeptSelected = val;

  var obj  = this.subDeptMap.get(val);
  console.log(val + "  " + obj);
  if(obj == undefined) return;
  this.insurer.subDeptId = obj.id;

 }

 onChangeSubDeptDDNoResult(){
  this.insurer.subDeptId = "";
 }
  

}
