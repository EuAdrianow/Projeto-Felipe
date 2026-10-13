import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComputadoresGamer } from './computadores-gamer';

describe('ComputadoresGamer', () => {
  let component: ComputadoresGamer;
  let fixture: ComponentFixture<ComputadoresGamer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComputadoresGamer],
    }).compileComponents();

    fixture = TestBed.createComponent(ComputadoresGamer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
