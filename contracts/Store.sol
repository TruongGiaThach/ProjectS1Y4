// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
// nhận product id, value, emit user_id, product_id và value
contract Store {
    address private owner;
    uint private balance;
     
    /// Only the owner can call this function.
    error OnlyOwner();
    modifier onlyOwner() {
        if (msg.sender != owner)
            revert OnlyOwner();
        _;
    }

    constructor(address _owner) {
      owner = _owner;
    }

    event BuyProduct(string customer_id, address customer_address, uint value);
    event Withdraw(address _to, uint _value );

    function buyProduct(
        string memory customer_id
    )  external payable {
      address buyer = msg.sender;
      balance = balance + msg.value;
      emit BuyProduct(customer_id, buyer, msg.value);

    }
    function withraw() external onlyOwner {
      address payable _to = payable(owner);
      _to.transfer(balance);
      uint _value = balance;
      balance = 0;
      emit Withdraw(_to, _value);
    }
}
