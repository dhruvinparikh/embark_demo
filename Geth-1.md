### Start the docker demon

#### Create new account

```shell
$ docker run -it -v /tmp/eth:/root/.ethereum --name "geth-new-account" ethereum/client-go account new
```

#### Sample response

```
INFO [03-21|17:20:01.497] Maximum peer count                       ETH=50 LES=0 total=50
INFO [03-21|17:20:01.497] Smartcard socket not found, disabling    err="stat /run/pcscd/pcscd.comm: no such file or directory"
Your new account is locked with a password. Please give a password. Do not forget this password.
Password:
Repeat password:

Your new key was generated

Public address of the key:   0x73ECb4233Eb88f03D39fC2E29C7129c589C6e22B
Path of the secret key file: /root/.ethereum/keystore/UTC--2020-03-21T17-21-47.885748908Z--73ecb4233eb88f03d39fc2e29c7129c589c6e22b

- You can share your public address with anyone. Others need it to interact with you.
- You must NEVER share the secret key with anyone! The key controls access to your funds!
- You must BACKUP your key file! Without the key, it is impossible to access account funds!
- You must REMEMBER your password! Without the password, it is impossible to decrypt the key!
```

### `geth` dev docker playground

- start geth dev chain

```shell
$ docker run -it -d -v /tmp/eth:/root/.ethereum -p 30303:30303 -p 8545:8545 --name "geth-dev" ethereum/client-go --dev --rpc --rpcaddr "0.0.0.0" --rpcapi web3,eth,personal
```

> Do not forget `--rpcaddr 0.0.0.0`, if you want to access RPC from other containers and/or hosts. By default, geth binds to the local interface and RPC endpoints is not accessible from the outside.

- open Javascript console to the node

```shell
$ docker exec -it geth-dev geth attach http://0.0.0.0:8545
```

- create new account without console

```shell
$ echo "****" > /tmp/eth/pwd.txt
$ docker exec -it geth-dev geth account new --password /root/.ethereum/pwd.txt
```

```shell
$ curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}' http://127.0.0.1:8545
```

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": ["0x4eabb121e0e46de38e6ab45b773ca0a6c58b1104"]
}
```
```bash
$ docker run -it -v /tmp/eth:/root/.ethereum -p 30303:30303 -p 8545:8545 ethereum/client-go --dev --rpc --rpcapi admin,debug,web3,eth,txpool,personal,clique,miner,net,shh --rpccorsdomain '*' --rpcaddr "0.0.0.0"
```