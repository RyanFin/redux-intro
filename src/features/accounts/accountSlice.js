import { createSlice } from "@reduxjs/toolkit";

// initial state variables for accounts
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

// reducer AND action creator in one
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      // we can write mutating logic
      state.balance = state.balance + action.payload;
    },

    withdraw(state, action) {
      // same way as writing it
      state.balance -= action.payload;
    },

    requestLoan: {
      // prepare multiple payloads
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },

      reducer(state, action) {
        if (state.loan > 0) {
          // we no longer need to return the entire state
          return;
        }

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },

    payLoan(state, action) {
      state.loan = 0;
      state.loanPurpose = "";
      state.balance -= state.loan;
    },
  },
});

console.log(accountSlice);

// export action creators
export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions;

console.log(requestLoan(1000, "Buy car"));

export default accountSlice.reducer;
