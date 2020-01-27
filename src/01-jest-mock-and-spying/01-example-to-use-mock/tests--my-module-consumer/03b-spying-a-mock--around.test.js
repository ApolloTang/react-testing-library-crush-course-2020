import {myModule} from '../my-module' // eslint-disable-line
import {myModuleConsumer} from '../my-module-consumer'

const mockFunction = jest.fn()

jest.mock('../my-module', ()=>({
  myModule: (text) => {
    mockFunction(text)  // <--- a work around
    return `fake module say: ${text}`
  }
}))


describe('This will not work', ()=>{ // eslint-disable-line
  test('"myModule" has been swapped with a fake one', ()=>{
    expect(myModuleConsumer()).toBe('fake module say: it has been called in consumer')
  })

  test('mockFunction has been called with correct text', () => {
    myModuleConsumer()
    expect(mockFunction).toHaveBeenCalledWith('it has been called in consumer')
  })
})
