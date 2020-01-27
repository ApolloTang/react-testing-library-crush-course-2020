import {myModule} from './my-module'

const myModuleConsumer = () => myModule('it has been called in consumer')

export {myModuleConsumer}
