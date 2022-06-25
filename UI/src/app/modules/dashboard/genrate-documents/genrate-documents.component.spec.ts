import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenrateDocumentsComponent } from './genrate-documents.component';

describe('GenrateDocumentsComponent', () => {
  let component: GenrateDocumentsComponent;
  let fixture: ComponentFixture<GenrateDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenrateDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenrateDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
