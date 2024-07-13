import { createStore } from "redux";

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
};

// set a default parameter
function reducer(state = initialState, action){
    switch(action.type){
        // state domain and event name
        case "account/deposit":
            return  {...state, balance: state.balance + action.payload};
        case "account/withdraw":
            return  {...state, balance: state.balance - action.payload};
        case "account/requestLoan":
            if (state.loan > 0) return state;
            return {...state, loan: action.payload};
        case "account/payLoan":
            return {...state, loan: 0, loanPurpose: '', balance: state.balance - state.loan};
        
            default:
                return state;   
    }
}

const store = createStore(reducer);

store.dispatch({type: 'account/deposit', payload: 500});