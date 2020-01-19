import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RoomwebsocketService } from './roomwebsocket.service';

describe('RoomwebsocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
  }));

  it('should be created', () => {
    const service: RoomwebsocketService = TestBed.get(RoomwebsocketService);
    expect(service).toBeTruthy();
  });
});
