import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ChatwebsocketService } from './chatwebsocket.service';

describe('ChatwebsocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
  }));

  it('should be created', () => {
    const service: ChatwebsocketService = TestBed.get(ChatwebsocketService);
    expect(service).toBeTruthy();
  });
});
