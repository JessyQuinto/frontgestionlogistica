import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregasMaritimasComponent } from './entregas-maritimas.component';

describe('EntregasMaritimasComponent', () => {
  let component: EntregasMaritimasComponent;
  let fixture: ComponentFixture<EntregasMaritimasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntregasMaritimasComponent]
    });
    fixture = TestBed.createComponent(EntregasMaritimasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
