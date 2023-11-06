import styles from "./addEvent.module.css";

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";

import { fetchEvents, addNewEvent } from "../eventsSlice";
import { AddRole } from "../../../components/multiSelect/AddRole";

export const AddEvent = () => 
{
  const [input,setInput] = useState({name:"",date:"",location:"",description:""});

  const [volunteers,setVolunteers] = useState([{role:"Captain",requiredVolunteers:5}]);

  const changeHandler = (inputField , text)=> {
    setInput(prev=>({...prev, [inputField]:text}));
  }

  const isDisabled = () => input.name==="" | input.date==="" || input.location==="" || input.description===""

  const clickHandler = () =>
  {
    setInput({name:"",date:"",location:"",description:"",
    volunteerRoleRequirements:[]});
  }

  return (
    <div className={styles[`form-container`]}>
      <h2 className={styles.heading}>Add New Event</h2>
      <input placeholder='Event Name' value={input.name} onChange={(e)=>changeHandler("name",e.target.value)}/>
      <input type="date" value={input.date} onChange={(e)=>changeHandler("date",e.target.value)} />

      <input placeholder='Location' value={input.location} onChange={(e)=>changeHandler("location",e.target.value)}/>
      <input placeholder='Description' value={input.description} onChange={(e)=>changeHandler("description",e.target.value)}/>

      <AddRole volunteers={volunteers} setVolunteers={setVolunteers} />

      <button className={styles.button} disabled={isDisabled()} onClick={()=>clickHandler()}>Add Event</button>
    </div>
  )
}
