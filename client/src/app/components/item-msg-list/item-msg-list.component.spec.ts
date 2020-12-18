import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMsgListComponent } from './item-msg-list.component';

describe('ItemMsgListComponent', () => {
  let component: ItemMsgListComponent;
  let fixture: ComponentFixture<ItemMsgListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemMsgListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemMsgListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
