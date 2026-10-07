import { TestBed } from '@angular/core/testing';
import { Musicbrainz } from './musicbrainz';

describe('Musicbrainz', () => {
  let service: Musicbrainz;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Musicbrainz);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
