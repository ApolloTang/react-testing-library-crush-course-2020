import {myModule} from '../my-module'
import {myModuleConsumer} from '../my-module-consumer'


jest.mock('../my-module') // use auto mock for simple case

// *****************************************************
//
// behind the scene, myModule has been replaced with:
//
//   myModule = jest.fn()
//
// *****************************************************

test('mockFunction has been called with correct text', () => {
  myModuleConsumer()
  expect(myModule).toHaveBeenCalledWith('it has been called in consumer')
})
