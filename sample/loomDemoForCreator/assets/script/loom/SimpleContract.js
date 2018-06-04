import './A-loom-polyfill-for-cocos'
import {
  NonceTxMiddleware, SignedTxMiddleware, Client,
  Contract, Address, LocalAddress, CryptoUtils
} from './loom.umd'

import { MapEntry } from './setscore_pb'


class SimpleContract extends Contract {

    constructor(config) {
        super(config)
    }

    store(key, value, cb) {
        const params = new MapEntry()
        params.setKey(key)
        params.setValue(value)
        this.callAsync('SetMsg', params)
        .then(function(response) {
            cb(null, response);
        })
        .catch(function(error) {
            cb(error, null);
        })
    }

    load(key, cb) {
        let params = new MapEntry();
        params.setKey(key);

        this.staticCallAsync('GetMsg', params, new MapEntry())
        .then(function(response) {
            if ('undefined' == typeof response || null == response) {
                console.log('load success, but response is null');
                return;
            }
            cb(null, response.getValue());
        })
        .catch(function(error) {
            cb(error, null);
        })
    }


}



export default function(cb) {
    const privateKey = CryptoUtils.generatePrivateKey()
    const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)
    const client = new Client(
        'default',
        'ws://127.0.0.1:46657/websocket',
        'ws://127.0.0.1:9999/queryws'
    )

    client.txMiddleware = [
        new NonceTxMiddleware(publicKey, client),
        new SignedTxMiddleware(privateKey)
    ]
    let contractAddr = null;
    client.getContractAddressAsync('BluePrint')
    .then(function(response) {
        contractAddr = response;
        const callerAddr = new Address(client.chainId, LocalAddress.fromPublicKey(publicKey));
        cb(null, new SimpleContract({
            contractAddr,
            callerAddr,
            client
        }));
    })
    .catch(function(err) {
        cb(err, null);
    })
}


