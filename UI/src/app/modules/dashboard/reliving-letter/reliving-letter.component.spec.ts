import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelivingLetterComponent } from './reliving-letter.component';

describe('RelivingLetterComponent', () => {
  let component: RelivingLetterComponent;
  let fixture: ComponentFixture<RelivingLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelivingLetterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelivingLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
