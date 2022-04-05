export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_WISHLIST":
      return {
        ...state,
        wishlist: action.payload,
      };
    default:
      return state;
  }
};
