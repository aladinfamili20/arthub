import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      const { products, search } = action.payload;
      const tempProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase()) 
          // product.subscription.toLowerCase().includes(search.toLowerCase())

      );

      state.filteredProducts = tempProducts;
    },
    SORT_PRODUCTS(state, action) {
      const { products, sort } = action.payload;
      let tempProducts = [];
      if (sort === "latest") {
        tempProducts = products;
      }

      if (sort === "lowest-price") {
        tempProducts = products.slice().sort((a, b) => {
          return a.price - b.price;
        });
      }

      if (sort === "highest-price") {
        tempProducts = products.slice().sort((a, b) => {
          return b.price - a.price;
        });
      }

      if (sort === "a-z") {
        tempProducts = products.slice().sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "z-a") {
        tempProducts = products.slice().sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }

      state.filteredProducts = tempProducts;
    },
    FILTER_BY_MEDIUM(state, action) {
      const { products, medium } = action.payload;
      let tempProducts = [];
      if (medium === "All") {
        tempProducts = products;
      } else {
        tempProducts = products.filter(
          (product) => product.medium === medium
        );
      }
      state.filteredProducts = tempProducts;
    },

    // Filter by size
    FILTER_BY_SIZE(state, action) {
      const { products, size } = action.payload;
      let tempProducts = [];
      if (size === "All") {
        tempProducts = products;
      } else {
        tempProducts = products.filter(
          (product) => product.size === size
        );
      }
      state.filteredProducts = tempProducts;
    },

    FILTER_BY_RARITY(state, action) {
      const { products, rarity } = action.payload;
      let tempProducts = [];
      if (rarity === "All") {
        tempProducts = products;
      } else {
        tempProducts = products.filter(
          (product) => product.rarity === rarity
        );
      }
      state.filteredProducts = tempProducts;
    },

    FILTER_BY_STYLE(state, action) {
      const { products, style } = action.payload;
      let tempProducts = [];
      if (style === "All") {
        tempProducts = products;
      } else {
        tempProducts = products.filter(
          (product) => product.style === style
        );
      }
      state.filteredProducts = tempProducts;
    },
// Frame
    FILTER_BY_FRAME(state, action) {
      const { products, frame } = action.payload;
      let tempProducts = [];
      if (frame === "All") {
        tempProducts = products;
      } else {
        tempProducts = products.filter(
          (product) => product.frame === frame
        );
      }
      state.filteredProducts = tempProducts;
    },

    FILTER_BY_LOCATION(state, action) {
      const { products, country } = action.payload;
      let tempProducts = [];
      if (country === "All") {
        tempProducts = products;
      } else {
        tempProducts = products.filter(
          (product) => product.country === country
        );
      }
      state.filteredProducts = tempProducts;
    },


    FILTER_BY_DIAMOND(state, action) {
      const { products, subscription } = action.payload;
      let tempProducts = [];
      if (subscription === "All") {
        tempProducts = products;
      } else {
        tempProducts = products.filter(
          (product) => product.subscription === subscription
        );
      }
      state.filteredProducts = tempProducts;
    },
    FILTER_BY_BRAND(state, action) {
      const { products, displayName } = action.payload;
      let tempProducts = [];
      if (displayName === "All") {
        tempProducts = products;
      } else {
        tempProducts = products.filter((product) => product.displayName === displayName);
      }
      state.filteredProducts = tempProducts;
    },

     

    FILTER_BY_PRICE(state, action) {
      const { products, price } = action.payload;
      let tempProducts = [];
      tempProducts = products.filter((product) => product.price <= price);

      state.filteredProducts = tempProducts;
    },
  },
});

export const {
  FILTER_BY_SEARCH,
  SORT_PRODUCTS,
  FILTER_BY_MEDIUM,
  FILTER_BY_SIZE,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
  FILTER_BY_DIAMOND,
  FILTER_BY_RARITY,
  FILTER_BY_STYLE,
  FILTER_BY_FRAME,
  FILTER_BY_LOCATION,
 } = filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;
