export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
};
