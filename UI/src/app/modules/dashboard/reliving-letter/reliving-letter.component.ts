import { Component, OnInit } from '@angular/core';
import { style } from '@angular/animations';
import { RelivingLetterService } from './reliving-letter.service';
import { Reliving,Experience,Education,Skill } from './reliving';
declare let pdfMake: any ;

@Component({
  selector: 'sb-reliving-letter',
  templateUrl: './reliving-letter.component.html',
  styleUrls: ['./reliving-letter.component.scss']
})
export class RelivingLetterComponent implements OnInit {

  reliving=new Reliving();

  // degrees = ['B.E.', 'M.E.', 'B.Com', 'M.Com'];


  constructor(private relivingservice:RelivingLetterService ) {
    this.reliving = JSON.parse(sessionStorage.getItem('reliving')) || new Reliving();
    if (!this.reliving.experiences || this.reliving.experiences.length === 0) {
      this.reliving.experiences = [];
      this.reliving.experiences.push(new Experience());
    }
    if (!this.reliving.educations || this.reliving.educations.length === 0) {
      this.reliving.educations = [];
      this.reliving.educations.push(new Education());
    }
    if (!this.reliving.skills || this.reliving.skills.length === 0) {
      this.reliving.skills = [];
      this.reliving.skills.push(new Skill());
    }

    console.log('Loading External Scripts');
    this.relivingservice.load('pdfMake', 'vfsFonts');
   }

   addExperience() {
    this.reliving.experiences.push(new Experience());
  }

  

  

  ngOnInit(): void {
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
    this.reliving = new Reliving();
  }


  getDocumentDefinition() {
    sessionStorage.setItem('reliving', JSON.stringify(this.reliving));
    return {
      content: [
        {
          text: 'Relieving Letter',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [{
              text: 'Name :' + this.reliving.fullname,
              style: 'name'
            },
            {
              text:'EmployeeId :' + this.reliving.empId
            },
            {
              text: 'Designation : ' + this.reliving.designation,
            },
            {
              text:'Assimilate Technologies Pvt Ltd'
            },
            {
               text: 'Date : ' + this.reliving.date,
               style:'dateStyle'

            },
            {
              text:'Subject :' + this.reliving.subject,
              style:'subjectStyle'
            },
            {
              text:'Dear :' + this.reliving.intialname,
              style:'gap'
              
            },
            {
              text:'This is with reference to your resignation dated ' + this.reliving.rdate,
              style:'gap'
            },
            {
              text:'Your resignation has been accepted and you are relieved from the services of our company effective from the closing hours of ' + this.reliving.hdate,
              style:'gap'
              
            },
            {
              text:'We thank you for your efforts and contribution during your tenure with us and wish you all the best in your future endeavors.',
              style:'gap'
              
            },
            {
              text:'Yours Sincerely',
              style:'thanksstyle'
            },
            {
              text:'Priyanka Belekar',
              style:'thanksstyle'
              
            },
            {
              text:'HR Manager',
              style:'thanksstyle'
            }
            
            ],
            
          ]
        },

      ],
      info: {
        title: this.reliving.fullname + '_RELIVING',
        author: this.reliving.fullname,
        subject: 'RELIVING',
        keywords: 'RELIVING, ONLINE RESUME',
      },
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 20, 0, 10],
            decoration: 'underline'
          },
          name: {
            fontSize: 12,
            
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
          dateStyle:{
            margin: [0, -60, 0, 0],
            alignment:'right'
            
          },
          subjectStyle:{
            alignment:'center',
            margin:[0,50,0,30]
          },
          gap:{
            margin:[0,5,0,5],
            alignment:'justify'
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
      this.reliving.profilePic = reader.result as string;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

}
