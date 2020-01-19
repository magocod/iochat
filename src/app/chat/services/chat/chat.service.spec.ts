import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ChatService } from './chat.service';

describe('ChatService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
  }));

  it('should be created', () => {
    const service: ChatService = TestBed.get(ChatService);
    expect(service).toBeTruthy();
  });
});
