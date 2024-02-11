import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregasTerrestresComponent } from './entregas-terrestres.component';

describe('EntregasTerrestresComponent', () => {
  let component: EntregasTerrestresComponent;
  let fixture: ComponentFixture<EntregasTerrestresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntregasTerrestresComponent]
    });
    fixture = TestBed.createComponent(EntregasTerrestresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
