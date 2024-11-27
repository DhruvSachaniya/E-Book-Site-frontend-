import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../redux-file/TableCount';
import CounterData from '../redux-file/TableData';
import CurrentPageReducer from '../redux-file/CurrentPageData';
export default configureStore({
  reducer: {
    counter: counterReducer,
    counterD: CounterData,
    currentPage: CurrentPageReducer,
  },
});
