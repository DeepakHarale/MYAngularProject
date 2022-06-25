import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sb-company-policies',
  templateUrl: './company-policies.component.html',
  styleUrls: ['./company-policies.component.scss']
})
export class CompanyPoliciesComponent implements OnInit {
  leavePolicy = true;
  inductionPolicy = true;
  companyPolicy = false;
  healthPolicy = false;
  constructor() { }

  ngOnInit(): void {
    this.toggleINDUCTIONPolicy();
  }
  toggleINDUCTIONPolicy() {
    this.inductionPolicy = true;
    this.leavePolicy = false;
    this.companyPolicy = false;
    this.healthPolicy = false;
  };
  toggleLEAVEPolicy() {
    this.leavePolicy = true;

    this.inductionPolicy = false;
    this.companyPolicy = false;
    this.healthPolicy = false;
  };
  toggleCOMPANYPolicy() {
    this.companyPolicy = true;
    this.leavePolicy = false;
    this.inductionPolicy = false;
    this.healthPolicy = false;
  };
  toggleHEALTHPolicy() {
    this.healthPolicy = true;
    this.companyPolicy = false;
    this.leavePolicy = false;
    this.inductionPolicy = false;
    };
}


