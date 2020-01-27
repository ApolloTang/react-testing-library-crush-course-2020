import {myModule} from '../my-module'
import {myModuleConsumer} from '../my-module-consumer'

jest.mock('../my-module', ()=>({
  myModule: (text) => {
    console.log('fake module module has been executed with argument:', text)
    return `fake module say: ${text}`
  }
}))

test('"myModule" has been swapped with a fake one', ()=>{
  expect(myModuleConsumer()).toBe('fake module say: it has been called in consumer')
})


test('call "myModule" directly result in calling the fake "myModule"', ()=>{
  expect(myModule('it has been called in test')).toBe('fake module say: it has been called in test')
})
