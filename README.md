# promise-chain
Chain your promise returns

[![Build Status](https://travis-ci.com/siddhesh3/promise-chain.svg?branch=master)](https://travis-ci.com/siddhesh3/promise-chain)

Promise Chain
=============

A small library that chains your multiple promise to 1

## Installation

  `npm i @makejsgreatagain/promise-chain`

## Usage

    var pChain = new PromiseChain(initialPromise);

    pChain.then(firstAsyncMethod)
        .catch(firstAsyncExceptionHandler)
        .then(secondAsyncMethod)
        .catch(secondAsyncExceptionHandler);


Note that each Async method should return new promise.


## Tests

  `npm test`

## Contributing

Siddhesh Kulkarni