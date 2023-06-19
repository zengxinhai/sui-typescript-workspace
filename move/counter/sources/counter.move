module counter::counter {
  use sui::object::{Self, UID};
  use sui::transfer;
  use sui::tx_context::TxContext;

  struct Counter has key {
    id: UID,
    value: u64,
    time: u64,
  }
  
  fun init(ctx: &mut TxContext) {
    transfer::share_object(Counter{
      id: object::new(ctx),
      value: 0,
      time: 0,
    });
  }
  
  public entry fun add(counter: &mut Counter, amount: u64, time: u64) {
    counter.value = counter.value + amount;
    counter.time = time;
  }
}
