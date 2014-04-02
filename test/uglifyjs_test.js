'use strict';

var assert = require('assert');
var Record = require('record');
var Uglifyjs = require('../lib/uglifyjs');

function errorHandler(err){
    process.nextTick(function rethrow() { throw err; });
}

(new Uglifyjs).run(
    [new Record({
        contents: 'var foo=1;\nvar bar=2;',
        path: 'test/foo.js'
    })], // inputs
    {}, // options
    console // logger
).then(function(inputs){
    assert.equal(inputs[0].contents.toString(), 'var foo=1,bar=2;')
}).catch(errorHandler);

(new Uglifyjs({
    error: function(err){
        console.log(err.stack)
    }
})).run(
    [new Record({
        contents: 'var foo=1;\nvar bar=2;',
        path: 'test/foo.js'
    })], // inputs
    {
        includeSourceMap: true
    }, // options
    console // logger
).then(function(inputs){
    assert(inputs.length === 2 );
    assert.equal(inputs[1].path, 'test/foo.js.map');
    assert.equal(inputs[1].contents.toString(), '{"version":3,"file":"foo.js.map","sources":["?"],"names":["foo","bar"],"mappings":"AAAA,GAAIA,KAAI,EACJC,IAAI"}');
}).catch(errorHandler);

(new Uglifyjs({
    error: function(err){
        console.log(err.stack)
    }
})).run(
    [new Record({
        contents: 'var foo;=\nvar bar=;',
        path: 'test/foo.js'
    })], // inputs
    {}, // options
    console // logger
).then(function(inputs){
    throw Error;
}, function(err){
    assert.throws(
        function() {
            throw err
        },
        /Unexpected token/
    );
}).catch(errorHandler);
