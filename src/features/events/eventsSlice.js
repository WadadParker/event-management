import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

import axios from "axios";

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
    const response = await axios.get(`${apiUrl}/events`);
    return response.data.events;
});

export const addNewEvent = createAsyncThunk("events/addEvent", async (newEvent) => {
   try{
    const response = await axios.post(`${apiUrl}/events`, newEvent, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response.data.newEvent;
}
catch(error) {
    console.error('Error adding new event:', error);
        throw error;
}
});

export const updateEvent = createAsyncThunk("events/updateEvent", async (eventDetails) => {
    const response = await axios.post(`${apiUrl}/events/${eventDetails._id}`, eventDetails, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response.data.updatedEvent;
});

export const deleteEvent = createAsyncThunk("events/deleteEvent", async (eventId) => {
    const response = await axios.delete(`${apiUrl}/events/${eventId}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response.data.deletedEvent;
});

const initialState ={
    events:[],
    status:"idle",
    error:null,
}

export const eventsSlice = createSlice({name:"events",initialState,reducers:{},extraReducers:{

    [fetchEvents.pending]: (state) =>{
        state.status = "idle"
    },
    [fetchEvents.fulfilled]: (state,action) => 
    {
        state.status = "success";
        state.events = action.payload;
    },
    [fetchEvents.rejected]: (state,action)=>
    {
        state.status = "error";
        state.error = action.error.message;
    },

    [addNewEvent.pending]: (state) =>
    {
        state.status = "idle"
    },
    [addNewEvent.fulfilled]: (state,action)=>
    {
        state.status = "success";
        state.events.push(action.payload);
    },
    [addNewEvent.rejected]: (state,action) =>
    {
        state.state="error";
        state.error= action.error.message;
    },

    [updateEvent.pending]: (state)=>
    {
        state.status = "idle"
    },
    [updateEvent.fulfilled]: (state,action)=>
    {
        state.success = "success";
        const updatedEvent = action.payload;

        const index = state.events.findIndex(event=>event._id === updatedEvent._id);
        if(index !== -1)
        {
            state.events[index] = updatedEvent;
        }
    },
    [updateEvent.rejected]: (state,action)=>
    {
        state.status="error";
        state.error = action.error.message;
    },

    [deleteEvent.pending]: (state)=>
    {
        state.status = "idle"
    },
    [deleteEvent.fulfilled]: (state,action)=>
    {
        state.status = "success",
        state.events = [...state.events].filter(event=>event._id!== action.payload._id)
    },
    [deleteEvent.rejected]: (state,action)=>
    {
        state.status = "error",
        state.error = action.error.message
    }

}})