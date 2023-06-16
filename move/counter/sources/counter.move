module counter::counter {
  
  use sui::object::{Self, UID, ID};
  use sui::transfer;
  use sui::tx_context::TxContext;
  use sui::event::emit;
  
  struct Counter has key {
    id: UID,
    value: u64,
  }
  
  struct AddEvent has copy, drop {
    counter: ID,
    current_num: u64,
  }
  
  fun init(ctx: &mut TxContext) {
    transfer::share_object(Counter{
      id: object::new(ctx),
      value: 0
    });
  }
  
  public entry fun add(counter: &mut Counter) {
    counter.value = counter.value + 1;
    emit(AddEvent {
      counter: object::id(counter),
      current_num: counter.value
    })
  }
  
  public fun check_value(counter: &Counter): u64 {
    counter.value
  }
}

