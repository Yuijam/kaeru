import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineDesComponent } from './line-des.component';

describe('LineDesComponent', () => {
  let component: LineDesComponent;
  let fixture: ComponentFixture<LineDesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineDesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineDesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
