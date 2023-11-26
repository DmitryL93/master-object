![master-object-logo](https://i.ibb.co/4T8y0JW/master-object-logo.jpg)

# master-object

Protect your code from typeErrors when nesting in deep objects and arrays.

## Installation

```shell
npm i master-object
```

## Import

```ts
const MasterObject = require('master-object').default // CommonJS module
```

```ts
import MasterObject from 'master-object' // ES module
```

## Usage

MasterObject consists of 5 methods:

get - reading

set - creation and updating

delete - deletion

exist - nesting check

log - logs to console

```ts
import MasterObject from 'master-object'

const obj = {
  'foo.bar': 5,
  '[baz]': [{ key: 'val' }],
  'some.weird[key]': null
}
const masterObj = new MasterObject(obj) // masterObj.get() !== obj (true)

// get examples
masterObj.get(['foo.bar']) // returns 5
masterObj.get(['foo.bar', 0, 'baz']) // returns undefined because { 'foo.bar': [{ baz: ... }] } not exist

// set examples
masterObj.set(['some.weird[key]', 0, 'key'], 'val') // overwrites { 'some.weird[key]': [{ key: 'val' }] }
masterObj.set([0, 0, 'foo', 0], 'bar') // adding { '0': [{ foo: ['bar'] }] }

const fooObj = { bar: 10 }
masterObj.set(['fooObj'], fooObj) // adding { fooObj: { bar: 10 } }
masterObj.set(['fooObj', 'bar'], null) // overwrites { fooObj: { bar: null } }, fooObj.bar === 10 (true)

// methods chaining example
masterObj
  .set(['[baz]'], [1, 2, 3]) // masterObj changed, obj["[baz]"] not mutated
  .delete(['[baz]', 2]) // [baz]: [1, 2]
  .log() // console.log(masterObj.get())
  .get() // returns full object

// checks the existence of a predicate
masterObj.exist(['[baz]', 2]) // returns false
masterObj.set(['fooBar'], undefined).exist(['fooBar']) // returns true, because key exists

// usage as array
const masterArr = new MasterObject([])

for (let i = 0; i < 3; i++) {
  masterArr
    .set([i, 'foo', 'bar', 0], i + 1)
    .set([i, 'foo', 'bar', 1], i + 2)
    .set([i, 'baz', 0, 'qux'], 'abc')
    .delete([i, 'baz'])
}

masterArr.get() // returns [{ foo: { bar: [1, 2] } }, { foo: { bar: [2, 3] } }, { foo: { bar: [3, 4] } }]

// native JS behaviour
masterArr.set(['key'], 10).get() // returns [{ foo: { bar: [1, 2] } }, { foo: { bar: [2, 3] } }, { foo: { bar: [3, 4] } }, key: 10]
```
