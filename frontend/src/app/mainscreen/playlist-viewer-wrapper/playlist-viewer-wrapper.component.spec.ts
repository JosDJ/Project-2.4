import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistViewerWrapperComponent } from './playlist-viewer-wrapper.component';

describe('PlaylistViewerWrapperComponent', () => {
  let component: PlaylistViewerWrapperComponent;
  let fixture: ComponentFixture<PlaylistViewerWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistViewerWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistViewerWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
