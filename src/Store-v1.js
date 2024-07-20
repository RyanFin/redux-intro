import { combineReducers, createStore } from "redux";

// initial state variables for accounts
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

// set a default parameter
function accountReducer(state = initialStateAccount, action) {
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

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return { ...state, fullName: action.payLoad };
    default:
      return state;
  }
}

// create a root reducer to combine reducers
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

console.log(store.getState());
// store.dispatch({ type: "account/withdraw", payload: 150 });

// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose: "Buy a car" },
// });
// console.log(store.getState());

// action creators
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount, purpose) {
  return { type: "account/payLoan", payload: { amount, purpose } };
}
function payLoan() {
  return { type: "account/payLoan" };
}

store.dispatch(deposit(1000));

console.log(store.getState());

store.dispatch(withdraw(450));

console.log(store.getState());

store.dispatch(requestLoan(4, "buy a chocolate bar"));

console.log(store.getState());

// action creators
function createCustomer(fullName, nationalID) {
  // convention is to have the action creator name identical to the event name
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString },
  };
}

function updateName(fullName) {
  return {
    type: "account/updateName",
    payLoad: fullName,
  };
}

store.dispatch(createCustomer("John Doe", "123456789"));
console.log(store.getState());

store.dispatch(deposit(250));
console.log(store.getState());
