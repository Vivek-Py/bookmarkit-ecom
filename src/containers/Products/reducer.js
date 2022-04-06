export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        productFilters: action.payload,
      };
    case "SET_PRODUCT_FILTERS":
      if (
        !action?.payload?.gender.length &&
        !action.payload.star.length &&
        !action.payload.minPrice
      ) {
        return {
          ...state,
          productFilters: state.products,
        };
      }
      const filteredProducts = state.products.filter((product) => {
        let gender = null;
        let rating = null;
        let price = null;

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

    case "REQUEST_SEARCH_FILTER":
      const regEx = new RegExp(action.payload, "gi");
      const filteredProductsBySearch = state.products.filter(
        (product) =>
          product.brand.match(regEx) ||
          product.brand_sub_text.match(regEx) ||
          product.detail.match(regEx)
      );
      return {
        ...state,
        productFilters: filteredProductsBySearch,
      };
    default:
      return state;
  }
};
