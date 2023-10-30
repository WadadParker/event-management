import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

export const fetchVolunteers = createAsyncThunk("volunteers/fetchVolunteers", async ()=>{
    const response = await fetch(`${apiUrl}/volunteers`)
    const data = response.json();
    return data.data.volunteers;
})

export const addNewVolunteer = createAsyncThunk("volunteers/addVolunteer" , async (newVolunteer)=>
{
    const response = await fetch(`${apiUrl}/volunteers`, {
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(newVolunteer)
    })
    const data = await response.json();
    return data.data.newVolunteer;
})

export const updateVolunteer = createAsyncThunk("volunteers/updateVolunteer" , async(volunteerDetails)=>
{
    const response = await fetch(`${apiUrl}/volunteers/${volunteerDetails._id}` , {
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(volunteerDetails)
    });
    const data = await response.json();

    return data.data.updatedVolunteer;
})

export const deleteVolunteer = createAsyncThunk("volunteers/deleteVolunteer", async(volunteerId)=>
{
    const response = await fetch(`${apiUrl}/volunteers/${volunteerId}`, {
        method:'DELETE',
        headers:{
            'Content-type':'application/json',
        },
    })
    const data = await response.json();
    return data.data.deletedVolunteer;
})

const initialState ={
    volunteers:[],
    status:"idle",
    error:null,
}

export const volunteersSlice = createSlice({name:"volunteers",initialState,reducers:{},extraReducers:{

    [fetchVolunteers.pending]: (state) =>{
        state.status = "idle"
    },
    [fetchVolunteers.fulfilled]: (state) => 
    {
        state.status = "success";
        state.volunteers = action.payload;
    },
    [fetchVolunteers.rejected]: (state)=>
    {
        state.status = "error";
        state.error = action.error.message;
    },

    [addNewVolunteer.pending]: (state) =>
    {
        state.status = "idle"
    },
    [addNewVolunteer.fulfilled]: (state)=>
    {
        state.status = "success";
        state.volunteers.push(action.payload);
    },
    [addNewVolunteer.rejected]: (state) =>
    {
        state.state="error";
        state.error= action.error.message;
    },

    [updateVolunteer.pending]: (state)=>
    {
        state.status = "idle"
    },
    [updateVolunteer.fulfilled]: (state)=>
    {
        state.success = "success";
        const updatedVolunteer = action.payload;

        const index = state.volunteers.findIndex(volunteer=>volunteer._id === updatedVolunteer._id);
        if(index !== -1)
        {
            state.volunteers[index] = updatedVolunteer;
        }
    },
    [updateVolunteer.rejected]: (state)=>
    {
        state.status="error";
        state.error = action.error.message;
    },

    [deleteVolunteer.pending]: (state)=>
    {
        state.status = "idle"
    },
    [deleteVolunteer.fulfilled]: (state)=>
    {
        state.status = "success",
        state.volunteers = [...state.volunteers].filter(volunteer=>volunteer._id!== action.payload._id)
    }

}})