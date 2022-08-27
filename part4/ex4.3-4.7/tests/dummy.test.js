const listHelper = require('../utils/list_helper')

describe('dummy',()=>{
    test('expected to return 1',()=>{
        const result = listHelper.dummy([])
        expect(result).toBe(1)
    })

})