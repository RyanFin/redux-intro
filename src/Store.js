import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const store = configureStore({
  // root reducer specifying reducers
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
