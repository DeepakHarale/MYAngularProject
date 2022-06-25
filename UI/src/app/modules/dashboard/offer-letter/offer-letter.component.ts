import { Component, OnInit } from '@angular/core';
import { style } from '@angular/animations';
import { FormControl, FormGroup } from '@angular/forms';
import { OfferLetter, Experience, Education, Skill } from './offerLetter';
import { RelivingLetterService } from '../reliving-letter/reliving-letter.service';

declare let pdfMake: any ;


@Component({
  selector: 'sb-offer-letter',
  templateUrl: './offer-letter.component.html',
  styleUrls: ['./offer-letter.component.scss']
})
export class OfferLetterComponent implements OnInit {

  // constructor() { }

  ngOnInit(): void {
  }

 



  imgUrl:any;
  offerLetter = new OfferLetter();

  degrees = ['B.E.', 'M.E.', 'B.Com', 'M.Com'];

  pdfForm:FormGroup;

  constructor(private relivingservice:RelivingLetterService) {
this.pdfForm= new FormGroup({

  refNo:new FormControl(),
  offerDate:new FormControl(),
  nameOfEmployee: new FormControl(),
  city:new FormControl(),
  designation: new FormControl(),
  joiningDate: new FormControl(),
  totalCost:new FormControl(),
  totalPerCostAnnum: new FormControl(),
  skills:new FormControl(),


})
    // this.resume = JSON.parse(sessionStorage.getItem('resume')) || new Resume();
    // if (!this.resume.experiences || this.resume.experiences.length === 0) {
    //   this.resume.experiences = [];
    //   this.resume.experiences.push(new Experience());
    // }
    // if (!this.resume.educations || this.resume.educations.length === 0) {
    //   this.resume.educations = [];
    //   this.resume.educations.push(new Education());
    // }
    // if (!this.resume.skills || this.resume.skills.length === 0) {
    //   this.resume.skills = [];
    //   this.resume.skills.push(new Skill());
    // }

    console.log('Loading External Scripts');
    this.relivingservice.load('pdfMake', 'vfsFonts');
  }

  // addExperience() {
  //   this.resume.experiences.push(new Experience());
  // }

  // addEducation() {
  //   this.resume.educations.push(new Education());
  // }

  generatePdf(action = 'open') {
    console.log(pdfMake);
    const documentDefinition = this.getDocumentDefinition();

    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }

  }


  resetForm() {
    this.offerLetter = new OfferLetter();
  }

  getDocumentDefinition() {


    
    sessionStorage.setItem('offerLetter', JSON.stringify(this.offerLetter));
    return {

      
        // watermark: 'test watermark',

        
      //   header: {
      //   columns:[
      //     {text:'Simple text', alignment:'center'}
         
      //   ]
       
      // },

      //   footer: {
      //     columns: [
      //       {text:'Left part', alignment:'center'},
      //     ],
      //     content: [
      //       { text: 'Right part', alignment: 'center' },
      //     ],
      //   },
      
        
      content: [
       
        {
          text: 'Assimilate Technologies',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [5, 2, 10, 20]
        },
        {
          columns: [
            [{
              text: 'Ref.No: ' + this.offerLetter.refNo,
              // style: 'refNo'
            },
            
            {
              text: 'Date : ' + this.offerLetter.offerDate,
              
            },
            {
              text:  this.offerLetter.nameOfEmployee,
            },
            {
              text: this.offerLetter.city
            },
            // {
            
            //   text: 'Date : ' + this.resume.offerDate,

            //   style:'position'
            // }
            
            // {
            //   text: 'GitHub: ' + this.resume.socialProfile,
            //   link: this.resume.socialProfile,
            //   color: 'blue',
            // }
            ],
            // [
            //   this.getProfilePicObject()
            // ]
            // [
            //   this.resume.offerDate,
             
            // ]
            
          ]
        },

      
       
        {
          text: [
            {   text: 'Dear ', style: 'subheader' },
              {   text: this.offerLetter.nameOfEmployee +',', style: 'appoint' },
             
          ],
          style: 'appoint'
      },

        {
          text: [
            {   text: 'Please refer to your interview conducted at ', style: 'subheader' },
              {   text: 'Assimilate Technologies Pvt. Ltd. ', style: 'terms' },
              {   text: 'and the discussions held thereafter.',
                  style: 'appoint'
              }
          ],
          style: 'appoint'
      },
       
        {
          text: [
            {   text: 'We are pleased to appoint you as ', style: 'subheader' },
              {   text: this.offerLetter.designation , style: 'terms' },
              {   text: ' w.e.f  Date ',  style: 'appoint' },
              {   text: this.offerLetter.joiningDate +'.' ,style: 'terms' },

          ],
          style: 'appoint'
      },
        
        {
          text :'Terms and Conditions:' ,
          style:'appoint'
          

        },
        {
          text:' 1.	Enumeration:',
          style:'terms'
          

        },
        {
          text: [
            {   text: 'Your total cost to company will be Rs. ', style: 'subheader' },
              {   text: this.offerLetter.totalCost , style: 'appoint' },
              {   text: ' w.e.f  Date '+'LPA. ',  style: 'appoint' },
              {   text:'('+ this.offerLetter.totalPerCostAnnum +' Per Annum only). Tax and Standard deduction will be deducted as applicable.' ,style: 'appoint' },

          ],
          style: 'appoint'
      },
        {
          text:'2.	Duties and Responsibilities: ',
          style:'terms'

        },
        {
          text:'•	To work on '+this.offerLetter.skills+' etc and acquire skills and new technologies to  develop and initiate high quality products and projects' 
         , style:'appoint'
      
        },
        { 
          text:'•	To implement multiple Projects, mapping, onsite-offshore Process supports.',
          style:'appoint'

        },
        {
          text:'  •	You will meet all deadlines, project milestones, customer or client date lines etc. without any slippage, delay or excuse.  '
        ,  style:'appoint'
        


        },  
        {
          text:'3.	Probation Period: ',
          style:'terms'


        },
        {
          text:'You will be on a probation period for a period of 3 months. You will require being proficient and getting yourself well versed within that period and perform well in your project. After 3 months based on your performance Assimilate Technologies will confirm your services. '
        ,
        style:'appoint'

        },
        {
          text:'4.	Leave Privilege: ',
          style:'terms'

        },
        {
          text:'During probation period you would not be entitled for any leaves during the probation period. Leaves availed on account of any reasons will be considered as leave without pay. You would be eligible for 12 paid leaves and 7 casual leaves only after date of confirmation. '
        ,  style:'appoint'
       
       
        },
        {
          text:'5.	Exclusiveness: ',
          style:'terms'

        },
        {
          text:'You shall be in the exclusive employment of the company and you shall not engage yourself, alone or in association with any other person in any work or business. '
          ,  style:'appoint'
       
        },
        {
          text:'6.	Confidentiality of Information: ',
          style:'terms'


        },
        {
          text:'All accounting details, company documents, files, products, ideas and consultancy, project and business related information, design, codes, features, technical parameters etc. either in the form of software, hardware or in any other form; are the property of Assimilate Technologies or its Client which has the intellectual property rights over this information. Further, you shall not at any time disclose such information, trade secrets, and security arrangements to anyone in any manner. If at any time it is found that you failed to comply with this clause, your services will be terminated forthwith without any prior notice, in addition to the penal action as per laws of the country. You will be governed by the rules and regulations and policies contained in the Company Handbook as amended from time to time. You are advised to familiarize yourself with its contents in your own interest. Ignorance of rules and regulations will not be taken as an excuse for non-compliance. '
        ,  style:'appoint'
        
        },
        {
          text:'7.	Termination of Service: ',
          style:'terms'

        },
        {
          text:'Employment with Assimilate Technologies is purely based on consent between both Assimilate Technologies and you. Assimilate Technologies reserves the right to terminate your services at any point of time in case of non-conformance to our policies/ processes or non-performance. However, employee can terminate the service by giving one month notice period in written. '
        ,  style:'appoint'
        
        },
        {
          text:'8.	Choice of Platforms and Projects:',
          style:'terms'


        },
        {
          text:'As a policy each technical staff is expected to work on or be familiar with at least two technologies. As far as possible and circumstances permitting, you will be assigned to platforms of your choice. However, it is not a right of the employee to demand work on any technology in mid of training period or in mid of an assigned project. '
        ,  style:'appoint'
        
        },
        {
          text:'9.	Project Commitment Policy: ',
          style:'terms'


        },
        {
          text:'Assimilate Technologies will expect you to complete the project you are assigned to. As per the Company’s policies and procedures if you decide to leave in the middle of the project by giving appropriate notice as outlined in Clause 6, you may be liable for any financial loss on the project incurred by the company due to your departure. If you are sent abroad for training or any project related work, you shall not resign for a minimum period of One year after the completion of the project. In the event of resignation, you will have to reimburse all the expenses including to and fro Airfare and living expenses to Assimilate Technologies. '
        ,  style:'appoint'
        
        },
        {
          text:'10.	Copyright Material: ',
          style:'terms'


        },   
        {
          text:'Trademarks: The names of all services or products referred on the established sites are either registered service marks or trademarks which are licensed under a governing body and are the legal property of the owner. You should not use these in any development work. Printing of a single copy solely for personal or non-commercial use, alteration of any downloaded or reprinted material without permission of such copyright material is highly prohibited, unless prior written consent is obtained from the concerned owner/company. '
        ,  style:'appoint'
        
        },
        {
          text:'11.	Copying of Code: ',
          style:'terms'
          

        },
        {
          text:'You are strictly forbidden to copy any code in parts or in whole or thereafter make trivial or mechanical changes and submit the transformed version in the company’s name to our customers. You are strictly prohibited to copy and use any code from websites, articles, books, or prior employment without an explicit written consent of Assimilate Technologies Management and its legal counsel. '
       ,   style:'appoint'
       
        },
        {
          text:'12.	Work product: ',
          style:'terms'

        },
        {
          text:'All recommendations, findings, reports, designs, drawings, diagrams, specifications, writings of any nature, photographs, audio and audio visual works, computer programs, inventions, discoveries and improvements developed, written, made, conceived or reduced to practice in the course of or arising out of the Services performed for Assimilate Technologies under this Agreement (collectively, “Work Product”) shall be owned by Assimilate Technologies / its Customers. '
       ,   style:'appoint'
       
        },
        {
          text:'13.	E-Mail Policy: 	 ',
          style:'terms'

        },   
        {
          text:'You will be given company’s official e-mail address for the purpose of communication with the staffs for official purpose as well for dealing with the Client. You are forbidden to send Client code, project and business related information outside the office premises. Auto forwarding of e-mails from Assimilate Technologies accounts to outside e-mail addresses is strictly prohibited. '
       ,   style:'appoint'
       
        }  ,
        {
          text:'14.	Passport: ',
          style:'terms'

        },
        {
          text:'It is the responsibility of the employee to be in possession of a valid passport, which is current for travel to the US and to Europe. Whenever required the Company will process visa papers and also pay the fees. However, it is not within the power or authority of Assimilate Technologies that a visa will be granted by the country of destination. In case you don’t have a passport please get one as soon as possible. You will not leave the company for a period of one year from the time of processing B1 or H1B Visa, if you want to leave before completion of one year from processing B1 or H1B then you have pay the entire processing fees and administrative cost paid by the company for your B1 & H1B Visa. '
       ,   style:'appoint'
       
        },
        {
          text:'15.	Library / Facilities: ',
          style:'terms'

        },
        {
          text:'There is a good technical and general library on the premises. In addition, we also have 24X7 internet connectivity. Employees are encouraged to avail of these facilities, which is for their bona fide official use. Unfair wear or tear of books / manuals or any misuse of the Internet / E-Mail or other facilities / telephone / fax etc. may result in damages being recovered from you. '
       ,   style:'appoint'
       
        },
        {
          text:'16.	Pan Card: ',
          style:'terms'
          
        },
        {
          text:'You are advised to apply for a permanent PAN to the IT authorities in case you are tax liable and you don’t have a PAN. '
      ,    style:'appoint'
       
        },
        {
          text:'17.	Breach of Terms ',
          style:'terms'

        },
        {
          text:'In case it is found that you have violated any of the above terms; Assimilate Technologies is entitled to take legal action against you. Your appointment with Assimilate Technologies will be terminated with immediate effect and the legal action will be taken against you as per the laws of the country. If the above terms and conditions are acceptable to you, kindly sign and return the duplicate copy of this letter. '
         ,   style:'appoint'

        },
        {
          text: 'For Assimilate Technologies  ',
          style:'terms'

        },
        {
          text:'Kanchan T ',
          style:'terms'

        },
        {
          text:'Director ',
          style:'terms'

        },
        {
          text: 'Date : ' + this.offerLetter.offerDate,
          style:'terms'

        },
        
        {
          text:'I confirm as having understood the above terms and conditions relating to my job functions and I agree to abide by them in letter and spirit by signing below. I further understand that failure to do so may result in the termination of my services on grounds of non-performance or discipline.   '
          , style:'appoint'
        
        },
        {
          text:'Signature',
          style:'appointterms'
        },

        // 'If you specify width, image will scale proportionally',
		// {
		// 	image: 'F:\Angular10\angular-8-export-pdf-master\src\assets\assimilatet_logo.png ',
   
      
		// },
        
        {
          text:'Name',
          style:'appointterms'
        },


        {
          text:'Date: ',
          style:'appointterms'

        },
        
        
        // {
        //   text: 'Skills',
        //   style: 'header'
        // },
        // {
        //   columns : [
        //     {
        //       ul : [
        //         ...this.resume.skills.filter((value, index) => index % 3 === 0).map(s => s.value)
        //       ]
        //     },
        //     {
        //       ul : [
        //         ...this.resume.skills.filter((value, index) => index % 3 === 1).map(s => s.value)
        //       ]
        //     },
        //     {
        //       ul : [
        //         ...this.resume.skills.filter((value, index) => index % 3 === 2).map(s => s.value)
        //       ]
        //     }
        //   ]
        // },
        // {
        //   text: 'Experience',
        //   style: 'header'
        // },
        // this.getExperienceObject(this.resume.experiences),

        // {
        //   text: 'Education',
        //   style: 'header'
        // },
        // this.getEducationObject(this.resume.educations),
        // {
        //   text: 'Other Details',
        //   style: 'header'
        // },
        // {
        //   text: this.resume.otherDetails
        // },
        // {
        //   text: 'Signature',
        //   style: 'sign'
        // },
        // {
        //   columns : [
        //       { qr: this.resume.refNo + ', Contact No : ' + this.resume.date, fit : 100 },
        //       {
        //       text: `(${this.resume.refNo})`,
        //       alignment: 'right',
        //       }
        //   ]
        // }

      ],
      info: {
        title: this.offerLetter.refNo + '_RESUME',
        author: this.offerLetter.refNo,
        subject: 'RESUME',
        keywords: 'RESUME, ONLINE RESUME',
      },
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 20, 0, 10],
            decoration: 'underline'
          },
          refNo: {
            fontSize: 16,
            bold: true
          },
          name : {
              fontSize:12,
              bold:true,
              margin:[0,10,0,10]
          },
          terms:{
              fontsize:12,
              bold:true
          },
          pappoint:{
              fontSize:12,
              margin:[0,10,0,10],
              alignment: 'justify'
          },
          appointterms:{
            fontSize:12,
            margin:[0,10,0,10],
            alignment:'justify',
            bold:true
          },
          jobTitle: {
            fontSize: 14,
            bold: true,
            italics: true
          },
          sign: {
            // margin: [0, 50, 0, 10],
            alignment: 'right',
            italics: true
          },
          tableHeader: {
            bold: true,
          },
          position:{
            alignment:'end'
          }
        }
    };
  }


  async showPdf() {
    let docDefinition = {
      content: [
        {
          text: 'PDF Generated with Image from external URL',
          fontSize : 20
        },
        {
          image: await this.getBase64ImageFromURL(
            "https://images.pexels.com/photos/209640/pexels-photo-209640.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=300"
          )
        }        
      ]
    };

    pdfMake.createPdf(docDefinition).open();
  }



  getBase64ImageFromURL(url:any) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }
  getExperienceObject(experiences: Experience[]) {

    const exs:any = [];

    experiences.forEach(experience => {
      exs.push(
        [{
          columns: [
            [{
              text: experience.jobTitle,
              style: 'jobTitle'
            },
            {
              text: experience.employer,
            },
            {
              text: experience.jobDescription,
            }],
            {
              text: 'Experience : ' + experience.experience + ' Months',
              alignment: 'right'
            }
          ]
        }]
      );
    });

    return {
      table: {
        widths: ['*'],
        body: [
          ...exs
        ]
      }
    };
  }

  getEducationObject(educations: Education[]) {
    return {
      table: {
        widths: ['*', '*', '*', '*'],
        body: [
          [{
            text: 'Degree',
            style: 'tableHeader'
          },
          {
            text: 'College',
            style: 'tableHeader'
          },
          {
            text: 'Passing Year',
            style: 'tableHeader'
          },
          {
            text: 'Result',
            style: 'tableHeader'
          },
          ],
          ...educations.map(ed => {
            return [ed.degree, ed.college, ed.passingYear, ed.percentage];
          })
        ]
      }
    };
  }

  getProfilePicObject() {
    if (this.offerLetter.profilePic) {
      return {
        image: this.offerLetter.profilePic ,
        width: 75,
        alignment : 'right'
      };
    }
    return null;
  }

  fileChanged(e:any) {
    const file = e.target.files[0];
    this.getBase64(file);
  }

  getBase64(file:any) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.offerLetter.profilePic = reader.result as string;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  addSkill() {
    this.offerLetter.skills.push(new Skill());
  }

}



