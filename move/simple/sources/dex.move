module defi::dex {
  
  use sui::object::{Self, UID};
  use sui::balance::{Self, Supply};
  use sui::coin::{Self, Coin};
  use sui::tx_context::TxContext;
  use sui::transfer;
  
  struct CoinA has drop {}
  struct CoinB has drop {}
  struct CoinC has drop {}
  // A dex pool containning CoinA, and CoinB
  struct Pool has key {
    id: UID,
    supply_a: Supply<CoinA>,
    supply_b: Supply<CoinB>,
    supply_c: Supply<CoinC>
  }
  
  // The dex supports flashloan
  struct FlashLoanA { amount: u64 }
  struct FlashLoanB { amount: u64 }
  struct FlashLoanC { amount: u64 }

  fun init(ctx: &mut TxContext) {
    transfer::share_object(Pool {
      id: object::new(ctx),
      supply_a: balance::create_supply(CoinA {}),
      supply_b: balance::create_supply(CoinB {}),
      supply_c: balance::create_supply(CoinC {})
    })
  }
  
  /// ======= methods for flashloan =========
  
  public fun borrow_a(pool: &mut Pool, amount: u64, ctx: &mut TxContext): (Coin<CoinA>, FlashLoanA) {
    let a_balance = balance::increase_supply(&mut pool.supply_a, amount);
    (
      coin::from_balance(a_balance, ctx),
      FlashLoanA { amount }
    )
  }

  public fun borrow_b(pool: &mut Pool, amount: u64, ctx: &mut TxContext): (Coin<CoinB>, FlashLoanB) {
    let b_balance = balance::increase_supply(&mut pool.supply_b, amount);
    (coin::from_balance(b_balance, ctx),
      FlashLoanB { amount }
    )
  }

  public fun borrow_c(pool: &mut Pool, amount: u64, ctx: &mut TxContext): (Coin<CoinC>, FlashLoanC) {
    let c_balance = balance::increase_supply(&mut pool.supply_c, amount);
    (
      coin::from_balance(c_balance, ctx),
      FlashLoanC { amount }
    )
  }

  public fun repay_a(pool: &mut Pool, coin: Coin<CoinA>, loan: FlashLoanA) {
    let FlashLoanA { amount } = loan;
    assert!(coin::value(&coin) == amount, 0);
    balance::decrease_supply(&mut pool.supply_a, coin::into_balance(coin));
  }

  public fun repay_b(pool: &mut Pool, coin: Coin<CoinB>, loan: FlashLoanB) {
    let FlashLoanB { amount } = loan;
    assert!(coin::value(&coin) == amount, 0);
    balance::decrease_supply(&mut pool.supply_b, coin::into_balance(coin));
  }

  public fun repay_c(pool: &mut Pool, coin: Coin<CoinC>, loan: FlashLoanC) {
    let FlashLoanC { amount } = loan;
    assert!(coin::value(&coin) == amount, 0);
    balance::decrease_supply(&mut pool.supply_c, coin::into_balance(coin));
  }

  /// ========== methods for token swap ============
  
  // swap 1 CoinA ==> 2 CoinB
  public fun a_to_b(pool: &mut Pool, coin: Coin<CoinA>, ctx: &mut TxContext): Coin<CoinB> {
    let input_amount = coin::value(&coin);
    let output_amount = input_amount * 2;
    balance::decrease_supply(&mut pool.supply_a, coin::into_balance(coin));
    let b_balance = balance::increase_supply(&mut pool.supply_b, output_amount);
    coin::from_balance(b_balance, ctx)
  }
  
  // swap 1 CoinB ==> 1 CoinC
  public fun b_to_c(pool: &mut Pool, coin: Coin<CoinB>, ctx: &mut TxContext): Coin<CoinC> {
    let input_amount = coin::value(&coin);
    let output_amount = input_amount;
    balance::decrease_supply(&mut pool.supply_b, coin::into_balance(coin));
    let c_balance = balance::increase_supply(&mut pool.supply_c, output_amount);
    coin::from_balance(c_balance, ctx)
  }

  // swap 1 CoinC ==> 1 CoinA
  public fun c_to_a(pool: &mut Pool, coin: Coin<CoinC>, ctx: &mut TxContext): Coin<CoinA> {
    let input_amount = coin::value(&coin);
    let output_amount = input_amount;
    balance::decrease_supply(&mut pool.supply_c, coin::into_balance(coin));
    let a_balance = balance::increase_supply(&mut pool.supply_a, output_amount);
    coin::from_balance(a_balance, ctx)
  }
}
