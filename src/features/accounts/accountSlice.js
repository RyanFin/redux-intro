// initial state variables for accounts
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

// set a default parameter
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    // state domain and event name
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

// action creators
export function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
export function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}
export function payLoan() {
  return { type: "account/payLoan" };
}

// store.dispatch(deposit(1000));

// console.log(store.getState());

// store.dispatch(withdraw(450));

// console.log(store.getState());

// store.dispatch(requestLoan(4, "buy a chocolate bar"));

// console.log(store.getState());
