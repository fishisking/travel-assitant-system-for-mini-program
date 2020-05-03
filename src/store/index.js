import {createStore} from 'redux'
import reducer from './reducer'

// reducer 注入
const store = createStore(
    reducer
    );
export default store;