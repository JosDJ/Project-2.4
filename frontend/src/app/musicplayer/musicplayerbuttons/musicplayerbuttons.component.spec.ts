import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicplayerbuttonsComponent } from './musicplayerbuttons.component';

describe('MusicplayerbuttonsComponent', () => {
  let component: MusicplayerbuttonsComponent;
  let fixture: ComponentFixture<MusicplayerbuttonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicplayerbuttonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicplayerbuttonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
