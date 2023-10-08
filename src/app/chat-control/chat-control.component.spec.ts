import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatControlComponent } from './chat-control.component';

describe('ChatControlComponent', () => {
  let component: ChatControlComponent;
  let fixture: ComponentFixture<ChatControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatControlComponent]
    });
    fixture = TestBed.createComponent(ChatControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
