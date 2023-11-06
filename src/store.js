import { configureStore } from "@reduxjs/toolkit";
import { eventsSlice } from "./features/events/eventsSlice";
import { volunteersSlice } from "./features/volunteers/volunteersSlice";

export default configureStore({
    reducer:{
        events:eventsSlice.reducer,
        volunteers:volunteersSlice.reducer
    }
})