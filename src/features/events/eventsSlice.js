import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

export const fetchEvents = createAsyncThunk("events/fetchEvents", async ()=>{
    const response = await fetch(`${apiUrl}/events`)
    const data = response.json();
    return data.data.events;
})

export const addNewEvent = createAsyncThunk("events/addEvent" , async (newEvent)=>
{
    const response = await fetch(`${apiUrl}/events`, {
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(newEvent)
    })
    const data = await response.json();
    return data.data.newEvent;
})

export const updateEvent = createAsyncThunk("events/updateEvent" , async(eventDetails)=>
{
    const response = await fetch(`${apiUrl}/events/${eventDetails._id}` , {
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(eventDetails)
    });
    const data = await response.json();

    return data.data.updatedEvent;
})

export const deleteEvent = createAsyncThunk("events/deleteEvent", async(eventId)=>
{
    const response = await fetch(`${apiUrl}/events/${eventId}`, {
        method:'DELETE',
        headers:{
            'Content-type':'application/json',
        },
    })
    const data = await response.json();
    return data.data.deletedEvent;
})

const initialState ={
    events:[],
    status:"idle",
    error:null,
}

export const eventsSlice = createSlice({name:"events",initialState,reducers:{},extraReducers:{

    [fetchEvents.pending]: (state) =>{
        state.status = "idle"
    },
    [fetchEvents.fulfilled]: (state) => 
    {
        state.status = "success";
        state.events = action.payload;
    },
    [fetchEvents.rejected]: (state)=>
    {
        state.status = "error";
        state.error = action.error.message;
    },

    [addNewEvent.pending]: (state) =>
    {
        state.status = "idle"
    },
    [addNewEvent.fulfilled]: (state)=>
    {
        state.status = "success";
        state.events.push(action.payload);
    },
    [addNewEvent.rejected]: (state) =>
    {
        state.state="error";
        state.error= action.error.message;
    },

    [updateEvent.pending]: (state)=>
    {
        state.status = "idle"
    },
    [updateEvent.fulfilled]: (state)=>
    {
        state.success = "success";
        const updatedEvent = action.payload;

        const index = state.events.findIndex(event=>event._id === updatedEvent._id);
        if(index !== -1)
        {
            state.events[index] = updatedEvent;
        }
    },
    [updateEvent.rejected]: (state)=>
    {
        state.status="error";
        state.error = action.error.message;
    },

    [deleteEvent.pending]: (state)=>
    {
        state.status = "idle"
    },
    [deleteEvent.fulfilled]: (state)=>
    {
        state.status = "success",
        state.events = [...state.events].filter(event=>event._id!== action.payload._id)
    }

}})