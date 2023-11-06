import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";

import styles from "./addVolunteer.module.css";

import { addNewVolunteer } from '../volunteersSlice';
import { fetchEvents } from '../../events/eventsSlice';

export const AddVolunteer = () => 
{
  const [input,setInput] = useState({name:"",contact:"",skills:"",availability:false,assignedEvents:[],areasOfInterest:""})

  const events = useSelector(state=>state.events.events);
  const dispatch = useDispatch();

  const changeHandler=(inputField,text)=>
  {
    setInput(prev=>({...prev, [inputField]:text}));
  }

  const handleSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setInput(prev=>({ ...input, assignedEvents: selectedOptions }));
  };

  const isDisabled = () => input.name==="" || input.contact==="" || input.skills==="" || input.assignedEvents.length===0 || input.areasOfInterest===""

  const clickHandler = () =>
  {
    // dispatch(addNewVolunteer(input));
    setInput({name:"",contact:"",skills:"",availability:false,assignedEvents:[],areasOfInterest:""})
  }

  useEffect(()=>
  {
    dispatch(fetchEvents());
  },[dispatch]);

  return (
    <div className={styles[`form-container`]}>
      <h2 className={styles.heading}>Add New Volunteer</h2>
      <input placeholder='Name' value={input.name} onChange={(e)=>changeHandler("name",e.target.value)}/>
      <input placeholder='Contact' value={input.contact} onChange={(e)=>changeHandler("contact",e.target.value)}/>
      <input placeholder='Skills' value={input.skills} onChange={(e)=>changeHandler("skills",e.target.value)}/>
      <input placeholder='Areas of Interest' value={input.areasOfInterest} onChange={(e)=>changeHandler("areasOfInterest",e.target.value)}/>
      <section>
        <label htmlFor='availability'>Availability</label>
        <input id="availability" type='checkbox' checked={input.availability} onChange={()=>setInput(prev=>({...prev,availability:!prev.availability}))} />
      </section>

      <select multiple value={input.assignedEvents} onChange={handleSelectChange} className={styles.select}>

      {events.map( event => (
        <option key={event._id} value={event._id}>{event.name}</option>
      ))}
       </select>

       <button className={styles.button} disabled={isDisabled()} onClick={()=>clickHandler()}>Add Volunteer</button> 
    </div>
  )
}
