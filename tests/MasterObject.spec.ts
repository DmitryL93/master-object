import MasterObject from '../src'

describe('MasterObject', () => {
  test('passing random value in constructor', () => {
    const str = ''
    const num = 10
    const bigNum = BigInt('0x1fffffffffffff')
    const notNum = NaN
    const bool = false
    const undef: any = undefined
    const nil: any = null
    const symbol = Symbol('foo')
    const date = new Date()
    const obj = {}
    const arr: unknown[] = []

    expect(JSON.stringify(new MasterObject(str).get())).toStrictEqual(JSON.stringify({}))
    expect(JSON.stringify(new MasterObject(num).get())).toStrictEqual(JSON.stringify({}))
    expect(JSON.stringify(new MasterObject(bigNum).get())).toStrictEqual(JSON.stringify({}))
    expect(JSON.stringify(new MasterObject(notNum).get())).toStrictEqual(JSON.stringify({}))
    expect(JSON.stringify(new MasterObject(bool).get())).toStrictEqual(JSON.stringify({}))
    expect(JSON.stringify(new MasterObject(undef).get())).toStrictEqual(JSON.stringify({}))
    expect(JSON.stringify(new MasterObject(nil).get())).toStrictEqual(JSON.stringify({}))
    expect(JSON.stringify(new MasterObject(symbol).get())).toStrictEqual(JSON.stringify({}))
    expect(JSON.stringify(new MasterObject(date).get())).toStrictEqual(JSON.stringify({}))
    expect(JSON.stringify(new MasterObject(obj).get())).not.toBe(obj)
    expect(JSON.stringify(new MasterObject(arr).get())).not.toBe(arr)
    expect(JSON.stringify(new MasterObject(arr).get())).toStrictEqual(JSON.stringify([]))
    expect(JSON.stringify(new MasterObject().get())).toStrictEqual(JSON.stringify({}))
  })

  test('chaining', () => {
    const input = new MasterObject({ myKey: null, toDelete: [{ key: [1, 2, 3] }], existed: undefined })
      .set(['arr', 0], { key: 'val' })
      .set(['key'], 10)
      .set(['obj'], { key: 5 })
      .set(['myKey', 1, '12'], 12)
      .set(['master'], new MasterObject().set(['arr'], [1, 2, 3]).get(['arr']))
      .delete(['toDelete', 0, 'key'])
      .delete(['toDelete'])
      .log()

    expect((input as any).set()).toStrictEqual(input)
    expect(input.set([], undefined)).toStrictEqual(input)
    expect((input as any).delete()).toStrictEqual(input)
    expect(input.delete([])).toStrictEqual(input)
    expect(input.get([])).toStrictEqual(undefined)
    expect(input.get(['arr', 0, 'key'])).toStrictEqual('val')
    expect(input.get(['key'])).toStrictEqual(10)
    expect(JSON.stringify(input.get(['obj']))).toStrictEqual(JSON.stringify({ key: 5 }))
    expect(JSON.stringify(input.get(['myKey', 1]))).toStrictEqual(JSON.stringify({ 12: 12 }))
    expect(JSON.stringify(input.get(['master']))).toStrictEqual(JSON.stringify([1, 2, 3]))
    expect((input as any).exist()).toBeFalsy()
    expect(input.exist(['master', 2])).toBeTruthy()
    expect(input.exist(['key', 1])).toBeFalsy()
    expect(input.exist(['myKey', 1, '12'])).toBeTruthy()
    expect(input.exist(['myKey', 0])).toBeFalsy()
    expect(input.exist(['toDelete'])).toBeFalsy()
    expect(input.exist(['existed'])).toBeTruthy()
    expect(input.get(['toDelete'])).toStrictEqual(undefined)
    expect(input.get(['toDelete', 0, 'key'])).toStrictEqual(undefined)
  })
})
