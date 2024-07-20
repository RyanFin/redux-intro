const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

export default function customerReducer(state = initialStateCustomer, action) {
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

// action creators
export function createCustomer(fullName, nationalID) {
  // convention is to have the action creator name identical to the event name
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString },
  };
}

export function updateName(fullName) {
  return {
    type: "account/updateName",
    payLoad: fullName,
  };
}

// store.dispatch(createCustomer("John Doe", "123456789"));

// console.log(store.getState());

// store.dispatch(deposit(250));
// console.log(store.getState());
