import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoriesIssueComponent } from './accessories-issue.component';

describe('AccessoriesIssueComponent', () => {
  let component: AccessoriesIssueComponent;
  let fixture: ComponentFixture<AccessoriesIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessoriesIssueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoriesIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
