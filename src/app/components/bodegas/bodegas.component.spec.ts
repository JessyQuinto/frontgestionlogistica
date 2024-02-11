import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodegasComponent } from './bodegas.component';

describe('BodegasComponent', () => {
  let component: BodegasComponent;
  let fixture: ComponentFixture<BodegasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodegasComponent]
    });
    fixture = TestBed.createComponent(BodegasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
