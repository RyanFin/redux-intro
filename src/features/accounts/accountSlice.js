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
      state.isLoading = false;
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
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },

    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

console.log(accountSlice);

// export action creators
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

// THUNK - supported 'out of the box'  by redux toolkit (modern)
export function deposit(amount, currency) {
  if (currency === "USD") {
    return { type: "account/deposit", payload: amount };
  }

  return async function (dispatch, getState) {
    // API call

    dispatch({ type: "account/convertingCurrency" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );

    const data = await res.json();
    console.log(data);
    const converted = data.rates.USD;

    dispatch({ type: "account/deposit", payload: converted });
    // return action
  };
}

console.log(requestLoan(1000, "Buy car"));

export default accountSlice.reducer;
