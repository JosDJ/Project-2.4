import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MijnaccountComponent } from './mijnaccount.component';

describe('MijnaccountComponent', () => {
  let component: MijnaccountComponent;
  let fixture: ComponentFixture<MijnaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MijnaccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MijnaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
