import { Component, OnInit } from '@angular/core';
import packageJson from '../../../../../../package.json';
@Component({
    selector: 'sb-footer',
    
    templateUrl: './footer.component.html',
    styleUrls: ['footer.component.scss'],
})
export class FooterComponent implements OnInit {
    version = packageJson.version;
    currentYear:number;
    constructor() {
         this.currentYear = new Date().getFullYear();
    }
    ngOnInit() {
        
    }
}
