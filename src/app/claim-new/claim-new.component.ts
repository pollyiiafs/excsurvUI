import { Component, OnInit } from '@angular/core';
import { ClaimNew } from './claim.new';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-claim-new',
  templateUrl: './claim-new.component.html',
  styleUrls: ['./claim-new.component.css']
})
export class ClaimNewComponent implements OnInit {

  claimNewList = new Array<ClaimNew>(); //contains filter data and bind to table
  claimNewListDup = new Array<ClaimNew>(); //contains original data
  searchDDValue = 'all';
  searchValue: string;


  constructor(private apiService: ApiService, private router: Router, 
    private appComp: AppComponent) { }

  ngOnInit() {
    this.getClaimDetails();
  }


  onChangeNewClaimSearchDropDown(value) {
    this.searchDDValue = value;
    if (value !== 'all') {
      return;
    }

    this.searchValue = "";
    this.claimNewList = new Array<ClaimNew>();
    this.claimNewList = JSON.parse(JSON.stringify(this.claimNewListDup));
  }

  onSearchChange(str) {
    if (str === "") {
      this.claimNewList = new Array<ClaimNew>();
      this.claimNewList = JSON.parse(JSON.stringify(this.claimNewListDup));
      return;
    }

    this.searchValue = str;

    var claimNewListTemp = new Array<ClaimNew>();
    for (var i = 0; i < this.claimNewListDup.length; i++) {
      var obj = this.claimNewListDup[i];
      if (this.searchDDValue === "jobNo" && obj.jobNo.toUpperCase().indexOf(str.toUpperCase()) > -1) {
        claimNewListTemp.push(obj);
      }
      else if (obj.srcOfInstName != null && this.searchDDValue === "sourceOfIntimation" && obj.srcOfInstName.toUpperCase().indexOf(str.toUpperCase()) > -1) {
        claimNewListTemp.push(obj);
      }
      else if (obj.insurerClaimNo !=null && this.searchDDValue === "claimNo" && obj.insurerClaimNo.toUpperCase().indexOf(str.toUpperCase()) > -1) {
        claimNewListTemp.push(obj);
      }
      else if (obj.insuredName !=null && this.searchDDValue === "nameOfInsured" && obj.insuredName.toUpperCase().indexOf(str.toUpperCase()) > -1) {
        claimNewListTemp.push(obj);
      }
      else if (obj.repName !=null && this.searchDDValue === "insRepName" && obj.repName.toUpperCase().indexOf(str.toUpperCase()) > -1) {
        claimNewListTemp.push(obj);
      }
      else if (obj.insuredContact !=null && this.searchDDValue === "insuredContact" && obj.insuredContact.toUpperCase().indexOf(str.toUpperCase()) > -1) {
        claimNewListTemp.push(obj);
      }
      else if (obj.policyNo !=null && this.searchDDValue === "policyNo" && obj.policyNo.toUpperCase().indexOf(str.toUpperCase()) > -1) {
        claimNewListTemp.push(obj);
      }
      else if (obj.estClaimAmtValue !=null && this.searchDDValue === "estimatedclaimAmt" && obj.estClaimAmtValue.toUpperCase().indexOf(str.toUpperCase()) > -1) {
        claimNewListTemp.push(obj);
      }
      else if (obj.deptNameVal !=null && this.searchDDValue === "department" && obj.deptNameVal.toUpperCase().indexOf(str.toUpperCase()) > -1) {
        claimNewListTemp.push(obj);
      }
      else if (obj.regDt !=null && this.searchDDValue === "claimDate" && obj.regDt.toUpperCase().indexOf(str.toUpperCase()) > -1) {
        claimNewListTemp.push(obj);
      }
      else if (obj.action !=null && this.searchDDValue === "action" && obj.action.toUpperCase().indexOf(str.toUpperCase()) > -1) {
        claimNewListTemp.push(obj);
      }
    }

    this.claimNewList = new Array<ClaimNew>();
    if (claimNewListTemp.length > 0) {
      
      this.claimNewList = JSON.parse(JSON.stringify(claimNewListTemp));
    }

  }//end of function

  isDisabled(): boolean {
    return this.searchDDValue === 'all';
  }

  populateClaimReults(){
    var claimNewObj = new ClaimNew();

    // this.claimNewList.push(claimNewObj);

    this.claimNewListDup = JSON.parse(JSON.stringify(this.claimNewList));
  }

  getClaimDetails(){

    this.apiService.getClaimDetails().subscribe(

      res => {
        if (res['status'] == 200) {
          console.log(res);
          this.claimNewList = res.result;
          this.populateClaimReults();
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
        else if (err.status == 500){
          this.appComp.showBErrorMsg = true;
          this.appComp.msg = "Please contact Technical team";
        }
      }
    );


  }

}//end of class
