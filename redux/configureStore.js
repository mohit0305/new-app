import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {dishes} from './dishes';
import {comments} from './dishes';
import {promotions} from './dishes';
import {leaders} from './dishes';

export const ConfigureStore = () => {
    const store = createStore(
      combineReducers({
          dishes,
          comments,
          promotions,
          leaders
      }),
      applyMiddleware(thunk,logger)
    );
    return store;
}