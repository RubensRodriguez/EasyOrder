import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  user: null,
  token: null,
  addSupplierPopup: false,
  addProductPopup: false,
  removeSupplierPopup: false,
  modifySupplierPopup: false,
  removeProductPopup: false,
  modifyProductPopup: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setAddSupplierPopup: (state) => {
      state.addSupplierPopup = state.addSupplierPopup === true ? false : true;
    },
    setAddProductPopup: (state) => {
      state.addProductPopup = state.addProductPopup === true ? false : true;
    },
    setRemoveSupplierPopup: (state) => {
      state.removeSupplierPopup =
        state.removeSupplierPopup === true ? false : true;
    },
    setModifySupplierPopup: (state) => {
      state.modifySupplierPopup =
        state.modifySupplierPopup === true ? false : true;
    },
    setRemoveProductPopup: (state) => {
      state.removeProductPopup =
        state.removeProductPopup === true ? false : true;
    },
    setModifyProductPopup: (state) => {
      state.modifyProductPopup =
        state.modifyProductPopup === true ? false : true;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setUser,
  setAddSupplierPopup,
  setAddProductPopup,
  setRemoveSupplierPopup,
  setModifySupplierPopup,
  setRemoveProductPopup,
  setModifyProductPopup,
} = globalSlice.actions;

export default globalSlice.reducer;
