import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRefrescosComponent } from './lista-refrescos.component';

describe('ListaRefrescosComponent', () => {
  let component: ListaRefrescosComponent;
  let fixture: ComponentFixture<ListaRefrescosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaRefrescosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaRefrescosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
