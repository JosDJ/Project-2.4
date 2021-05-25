import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoekenComponent } from './zoeken.component';

describe('ZoekenComponent', () => {
  let component: ZoekenComponent;
  let fixture: ComponentFixture<ZoekenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoekenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoekenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
