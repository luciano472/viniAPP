import { TestBed } from '@angular/core/testing';
import { Escaneo } from './escaneo';

describe('Escaneo', () => {
  let service: Escaneo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Escaneo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
