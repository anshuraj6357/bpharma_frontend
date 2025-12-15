import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tenants: []
};

const tenantSlice = createSlice({
    name: "tenants",
    initialState,
    reducers: {

        setAlltenants: (state, action) => {
            state.tenants = action.payload
        }


    },
});

export const { setAlltenants } = tenantSlice.actions;
export default tenantSlice.reducer;
