import { Component, OnInit } from '@angular/core';
import { RelivingLetterService } from '../reliving-letter/reliving-letter.service';

import{Education, Experience, ExperienceLetter, Skill} from './experienceLetter';

declare let pdfMake: any ;

@Component({
  selector: 'sb-experience-letter',
  templateUrl: './experience-letter.component.html',
  styleUrls: ['./experience-letter.component.scss']
})
export class ExperienceLetterComponent implements OnInit {
  
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  

  experienceLetter = new ExperienceLetter();  
  degrees = ['B.E.', 'M.E.', 'B.Com', 'M.Com'];

  constructor(private relivingservice:RelivingLetterService) {
    this.experienceLetter = JSON.parse(sessionStorage.getItem('experienceLetter')) || new ExperienceLetter();
    if (!this.experienceLetter.experiences || this.experienceLetter.experiences.length === 0) {
      this.experienceLetter.experiences = [];
      this.experienceLetter.experiences.push(new Experience());
    }
    if (!this.experienceLetter.educations || this.experienceLetter.educations.length === 0) {
      this.experienceLetter.educations = [];
      this.experienceLetter.educations.push(new Education());
    }
    if (!this.experienceLetter.skills || this.experienceLetter.skills.length === 0) {
      this.experienceLetter.skills = [];
      this.experienceLetter.skills.push(new Skill());
    }

    console.log('Loading External Scripts');
    this.relivingservice.load('pdfMake', 'vfsFonts');
  }

  addExperience() {
    this.experienceLetter.experiences.push(new Experience());
  }

  addEducation() {
    this.experienceLetter.educations.push(new Education());
  }

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
    this.experienceLetter = new ExperienceLetter();
  }

  getDocumentDefinition() {
    sessionStorage.setItem('experienceLetter', JSON.stringify(this.experienceLetter));
    return {
      content: [
        {
          text: 'Experience Letter',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [
              {
                  text:'Date :' + this.experienceLetter.date,
                  style:'dateStyle'
              },
              {
                text:'Place :' + this.experienceLetter.place,
                style:'placeStyle'
              },
            
              {
                text:'To Whom so ever it may concern',
                style:'contentStyle'

              },
              {
                text:'It is to certified that Mr/Mrs ' + this.experienceLetter.name + ' named as worked as' + this.experienceLetter.designation + ' at ' + this.experienceLetter.department + 'with us from' + this.experienceLetter.fromDate,
                style:'appoint'
              },
              {
                text:'During his/her tenure with us, we found committed, enthusiastic, flexible, and organized. He/She was well known excellent networking skills and cultural awareness. ',
                style:'appoint'
              },
              {
                text:'We wish him/her all the best in all his future attempts.',
                style:'appoint'
              },
              {
                text:' For the ',
                style:'thanksstyle'
              },
              {
                text:'Authorized Signatory',
                style:'thanksstyle'


              }

            
            
            
            
            ],
            // [
            //   this.getProfilePicObject()
            // ]
          ]
        },
        
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
        // // {
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
        //       { qr: this.resume.name + ', Contact No : ' + this.resume.contactNo, fit : 100 },
        //       {
        //       text: `(${this.resume.name})`,
        //       alignment: 'right',
        //       }
        //   ]
        // }
      ],
      info: {
        title: this.experienceLetter.name + '_ExperienceLetter',
        author: this.experienceLetter.name,
        subject: 'ExperienceLetter',
        keywords: 'ExperienceLetter, ONLINE ExperienceLetter',
      },
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 20, 0, 10],
            decoration: 'underline'
          },
          name: {
            fontSize: 16,
            bold: true
          },
          jobTitle: {
            fontSize: 14,
            bold: true,
            italics: true
          },
          sign: {
            margin: [0, 50, 0, 10],
            alignment: 'right',
            italics: true
          },
          tableHeader: {
            bold: true,
          },
          contentStyle:{
            margin:[0,10,0,0],
            alignment:'center'
          },
          dateStyle:{
            alignment:'right',
            margin:[0,-20,0,0]
          },
          placeStyle:{
            alignment:'right',
            margin:[0,0,30,0]
          },
          appoint:{
            // fontSize:12,
            margin:[0,5,0,5],
            alignment: 'justify'
          },
          thanksstyle:{
            margin:[50,5,0,5],
            alignment:'right'
          }
        }
    };
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

  // getProfilePicObject() {
  //   if (this.resume.profilePic) {
  //     return {
  //       image: this.resume.profilePic ,
  //       width: 75,
  //       alignment : 'right'
  //     };
  //   }
  //   return null;
  // }

  fileChanged(e:any) {
    const file = e.target.files[0];
    this.getBase64(file);
  }

  getBase64(file:any) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.experienceLetter.profilePic = reader.result as string;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  // addSkill() {
  //   this.resume.skills.push(new Skill());
  // }

}

  

