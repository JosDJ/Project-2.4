import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicplayertimerComponent } from './musicplayertimer.component';

describe('MusicplayertimerComponent', () => {
  let component: MusicplayertimerComponent;
  let fixture: ComponentFixture<MusicplayertimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicplayertimerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicplayertimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
