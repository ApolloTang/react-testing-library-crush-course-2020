import {myModule} from '../my-module'
import {myModuleConsumer} from '../my-module-consumer'


const mockLogger = (text) => console.log('fake module module has been executed with argument:', text)
//    ^^^^variable must be prefix with "mock"

const     logger = (text) => console.log('fake module module has been executed with argument:', text) // eslint-disable-line
// the above won't work


jest.mock('../my-module', ()=>({
  myModule: (text) => {

    mockLogger(text)

    // logger(text)  // <---- this will fail

    return `fake module say: ${text}`
  }
}))


test('"myModule" has been swapped with a fake one', ()=>{
  expect(myModuleConsumer()).toBe('fake module say: it has been called in consumer')
})


test('call "myModule" directly result in calling the fake "myModule"', ()=>{
  expect(myModule('it has been called in test')).toBe('fake module say: it has been called in test')
})

