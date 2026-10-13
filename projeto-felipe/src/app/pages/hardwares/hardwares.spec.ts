import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Hardwares } from './hardwares';

describe('Hardwares', () => {
  let component: Hardwares;
  let fixture: ComponentFixture<Hardwares>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hardwares],
    }).compileComponents();

    fixture = TestBed.createComponent(Hardwares);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
