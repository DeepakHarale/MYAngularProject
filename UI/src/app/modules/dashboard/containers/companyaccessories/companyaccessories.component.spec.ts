import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyaccessoriesComponent } from './companyaccessories.component';

describe('CompanyaccessoriesComponent', () => {
  let component: CompanyaccessoriesComponent;
  let fixture: ComponentFixture<CompanyaccessoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyaccessoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyaccessoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
