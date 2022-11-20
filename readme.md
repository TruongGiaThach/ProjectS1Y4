# Prerequisite

    - Node 16
    - Truffle
    - ganache-cli ( optional )
# Development
## Command local

Starting sever
```
    $ ganache
```
Compile your contract
```
    $ truffle compile
```
create migration
```
    $ truffle create migration your_contract_name' 
```
    '$ truffle migrate' to deploy contract to local node
    '$ truffle test' to run testcase
  
    '$ truffle develop' to interact with contract in local

## Command on testnet

install metamask extention and create account on Goerli Testnet
```
    '$ npm install --save-dev @truffle/hdwallet-provider'
```
deploy contract to testnet
```
    '$ truffle  truffle migrate --network goerli'
```