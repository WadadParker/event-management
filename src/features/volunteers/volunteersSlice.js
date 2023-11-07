import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

export const fetchVolunteers = createAsyncThunk("volunteers/fetchVolunteers", async () => {
    const response = await axios.get(`${apiUrl}/volunteers`);
    return response.data.volunteers;
});

export const addNewVolunteer = createAsyncThunk("volunteers/addVolunteer", async (newVolunteer) => {
    const response = await axios.post(`${apiUrl}/volunteers`, newVolunteer, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response.data.newVolunteer;
});

export const updateVolunteer = createAsyncThunk("volunteers/updateVolunteer", async (volunteerDetails) => {
    const response = await axios.post(`${apiUrl}/volunteers/${volunteerDetails._id}`, volunteerDetails, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response.data.updatedVolunteer;
});

export const deleteVolunteer = createAsyncThunk("volunteers/deleteVolunteer", async (volunteerId) => {
    const response = await axios.delete(`${apiUrl}/volunteers/${volunteerId}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response.data.deletedVolunteer;
});

const initialState ={
    volunteers:[],
    status:"idle",
    error:null,
}

export const volunteersSlice = createSlice({name:"volunteers",initialState,reducers:{},extraReducers:{

    [fetchVolunteers.pending]: (state) =>{
        state.status = "idle"
    },
    [fetchVolunteers.fulfilled]: (state, action) => 
    {
        state.status = "success";
        state.volunteers = action.payload;
    },
    [fetchVolunteers.rejected]: (state, action)=>
    {
        state.status = "error";
        state.error = action.error.message;
    },

    [addNewVolunteer.pending]: (state) =>
    {
        state.status = "idle"
    },
    [addNewVolunteer.fulfilled]: (state, action)=>
    {
        state.status = "success";
        state.volunteers.push(action.payload);
    },
    [addNewVolunteer.rejected]: (state, action) =>
    {
        state.state="error";
        state.error= action.error.message;
    },

    [updateVolunteer.pending]: (state)=>
    {
        state.status = "idle"
    },
    [updateVolunteer.fulfilled]: (state, action)=>
    {
        state.success = "success";
        const updatedVolunteer = action.payload;

        const index = state.volunteers.findIndex(volunteer=>volunteer._id === updatedVolunteer._id);
        if(index !== -1)
        {
            state.volunteers[index] = updatedVolunteer;
        }
    },
    [updateVolunteer.rejected]: (state, action)=>
    {
        state.status="error";
        state.error = action.error.message;
    },

    [deleteVolunteer.pending]: (state)=>
    {
        state.status = "idle"
    },
    [deleteVolunteer.fulfilled]: (state, action)=>
    {
        state.status = "success",
        state.volunteers = [...state.volunteers].filter(volunteer=>volunteer._id!== action.payload._id)
    },
    [deleteVolunteer.rejected]: (state,action)=>
    {
        state.status = "error",
        state.error = action.error.message
    }
    

}})