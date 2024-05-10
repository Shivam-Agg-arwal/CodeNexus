import { combineReducers } from 'redux';
import authReducer from '../slices/authSlice';
import cartReducer from '../slices/cartSlice';
import profileReducer from '../slices/profileSlice';
import courseReducer from '../slices/courseSlice'
// Import other reducers here if you have them

const rootReducer = combineReducers({
  auth: authReducer,
  cart:cartReducer,
  profile:profileReducer,
  course:courseReducer,
});

export default rootReducer;