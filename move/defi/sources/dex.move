module defi::dex {
  
  use sui::object::{Self, UID};
  use sui::balance::{Self, Supply};
  use sui::coin::{Self, Coin};
  use sui::tx_context::TxContext;
  use sui::transfer;
  
  struct CoinA has drop {}
  struct CoinB has drop {}
  // A dex pool containning CoinA, and CoinB
  struct Pool has key {
    id: UID,
    supply_a: Supply<CoinA>,
    supply_b: Supply<CoinB>
  }
  
  // The dex supports flashloan
  struct FlashLoanA { amount: u64 }
  struct FlashLoanB { amount: u64 }
  
  fun init(ctx: &mut TxContext) {
    transfer::share_object(Pool {
      id: object::new(ctx),
      supply_a: balance::create_supply(CoinA {}),
      supply_b: balance::create_supply(CoinB {})
    })
  }
  
  // ======= methods for flashloan =========
  
  public fun borrow_a(pool: &mut Pool, amount: u64, ctx: &mut TxContext): (Coin<CoinA>, FlashLoanA) {
    let a_balance = balance::increase_supply(&mut pool.supply_a, amount);
    (
      coin::from_balance(a_balance, ctx),
      FlashLoanA { amount }
    )
  }
  
  public fun repay_a(pool: &mut Pool, coin: Coin<CoinA>, loan: FlashLoanA) {
    let FlashLoanA { amount } = loan;
    assert!(coin::value(&coin) == amount, 0);
    balance::decrease_supply(&mut pool.supply_a, coin::into_balance(coin));
  }
  
  public fun borrow_b(pool: &mut Pool, amount: u64, ctx: &mut TxContext): (Coin<CoinB>, FlashLoanB) {
    let b_balance = balance::increase_supply(&mut pool.supply_b, amount);
    (
      coin::from_balance(b_balance, ctx),
      FlashLoanB { amount }
    )
  }
  
  public fun repay_b(pool: &mut Pool, coin: Coin<CoinB>, loan: FlashLoanB) {
    let FlashLoanB { amount } = loan;
    assert!(coin::value(&coin) == amount, 0);
    balance::decrease_supply(&mut pool.supply_b, coin::into_balance(coin));
  }
  
  //========== methods for exchange ============
  
  // exhange 1 CoinB for 2 CoinA
  public fun exchange_a(pool: &mut Pool, coin: Coin<CoinB>, ctx: &mut TxContext): Coin<CoinA> {
    let amount = coin::value(&coin);
    balance::decrease_supply(&mut pool.supply_b, coin::into_balance(coin));
    let a_balance = balance::increase_supply(&mut pool.supply_a, amount * 2);
    coin::from_balance(a_balance, ctx)
  }
  
  // exchange 1 CoinA for 1 CoinB
  public fun exchange_b(pool: &mut Pool, coin: Coin<CoinA>, ctx: &mut TxContext): Coin<CoinB> {
    let amount = coin::value(&coin);
    balance::decrease_supply(&mut pool.supply_a, coin::into_balance(coin));
    let b_balance = balance::increase_supply(&mut pool.supply_b, amount);
    coin::from_balance(b_balance, ctx)
  }
}
