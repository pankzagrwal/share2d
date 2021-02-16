import { combineReducers } from 'redux';
import {
    config,
    user
} from './reducer.js';
export default combineReducers({
    config,
    user
});