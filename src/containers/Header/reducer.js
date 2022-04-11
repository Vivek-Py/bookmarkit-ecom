export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ITEMS":
      return {
        ...state,
        items: action.payload,
      };
    case "SET_CART_ITEMS":
      return {
        ...state,
        cartItems: action.payload,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
