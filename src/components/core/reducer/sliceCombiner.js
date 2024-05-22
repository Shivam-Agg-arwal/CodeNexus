import { combineReducers } from 'redux';
import authReducer from '../slices/authSlice';
import cartReducer from '../slices/cartSlice';
import profileReducer from '../slices/profileSlice';
import courseReducer from '../slices/courseSlice'
import viewCourseReducer from '../slices/viewCourseSlice'
// Import other reducers here if you have them

const rootReducer = combineReducers({
  auth: authReducer,
  cart:cartReducer,
  profile:profileReducer,
  course:courseReducer,
  viewCourse:viewCourseReducer
});

export default rootReducer;