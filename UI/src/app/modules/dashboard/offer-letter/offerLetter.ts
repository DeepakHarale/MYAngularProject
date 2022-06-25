export class OfferLetter {
    profilePic: string;
    refNo: any;
    city: any;
    offerDate: any;
    nameOfEmployee: any;
    designation:any;
    joiningDate: any;
    totalCost: any;
    totalPerCostAnnum: any;
   
    skills: Skill[] = [];



    // constructor() {
    //     this.experiences.push(new Experience());
    //     this.educations.push(new Education());
    //     this.skills.push(new Skill());
    // }
}

export class Experience {
    employer: string;
    jobTitle: string;
    jobDescription: string;
    startDate: string;
    experience: number;
}

export class Education {
    degree: string;
    college: string;
    passingYear: string;
    percentage: number;
}

export class Skill {
    value: string;
}
