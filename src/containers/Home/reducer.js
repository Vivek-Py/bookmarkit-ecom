export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        productFilters: action.payload,
      };
    case "SET_PRODUCT_FILTERS":
      console.log("insider 1");

      if (
        !action?.payload?.gender.length &&
        !action.payload.star.length &&
        !action.payload.minPrice
      ) {
        console.log("insider 2");

        return {
          ...state,
          productFilters: state.products,
        };
      }
      const filteredProducts = state.products.filter((product) => {
        let gender = null;
        let rating = null;
        let price = null;
        console.log("insider");
        if (action?.payload?.gender.length) {
          gender = action?.payload?.gender.find(
            (itr) => itr === product?.gender
          );
        } else {
          gender = true;
        }

        if (action?.payload?.star.length) {
          rating = Math.min(...action?.payload?.star) <= product?.rating;
        } else {
          rating = true;
        }

        if (action?.payload?.minPrice) {
          price = product?.price >= action?.payload?.minPrice;
        } else {
          price = true;
        }

        return gender && rating && price;
      });

      return {
        ...state,
        productFilters: filteredProducts,
      };

    default:
      return state;
  }
};
