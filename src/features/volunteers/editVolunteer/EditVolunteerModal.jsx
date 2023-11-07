import styles from "./editVolunteer.module.css"

import React, { useState, useEffect } from 'react'

import { useSelector,useDispatch } from "react-redux";

import { fetchEvents } from "../../events/eventsSlice";

export const EditVolunteerModal = ({item,setShowModal,editHandler}) => 
{
    const [input,setInput]=useState({...item,assignedEvents:[]});

    const events = useSelector(state=>state.events.events);
    const dispatch = useDispatch();

    const changeHandler=(inputField,text)=>
    {
      setInput(prev=>({...prev,[inputField]:text}))
    }

    const clickHandler=()=>
    {
        editHandler(input);
        setShowModal({modal:false,item:{}});
    }

    const handleSelectChange = (e) => {
       
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setInput(prev=>({ ...prev, assignedEvents: selectedOptions }));
      };

    const isDisabled = () => input.name==="" || input.contact==="" || input.skills==="" || input.assignedEvents.length===0 || input.areasOfInterest===""

    useEffect(()=>
    {
        dispatch(fetchEvents());
    },[dispatch])

  return (
    <div className={styles[`background-container`]}>

        <main className={styles[`modal-container`]}>
            <h3>Edit Volunteer Form</h3>
            <input placeholder='Name' value={input.name} onChange={(e)=>changeHandler("name",e.target.value)}/>
            <input placeholder='Contact' value={input.contact} onChange={(e)=>changeHandler("contact",e.target.value)}/>
            <input placeholder='Skills' value={input.skills} onChange={(e)=>changeHandler("skills",e.target.value)}/>
            <input placeholder='Areas of Interest' value={input.areasOfInterest} onChange={(e)=>changeHandler("areasOfInterest",e.target.value)}/>
            <section>
                <label htmlFor='availability'>Availability</label>
                <input id="availability" type='checkbox' checked={input.availability} onChange={()=>setInput(prev=>({...prev,availability:!prev.availability}))} />
            </section>

            <select multiple value={input.assignedEvents} onChange={(e)=>handleSelectChange(e)} className={styles.select}>

            {events.map( event => (
                <option key={event._id} value={event._id}>{event.name}</option>
            ))}
            </select>

            <section className={styles[`button-container`]}>
                <button className={styles.close} onClick={()=>setShowModal({modal:false,item:{}})}>Close</button>
                <button className={styles.update} disabled={isDisabled()} onClick={()=>clickHandler()}>Update Volunteer</button>
            </section>
       </main>
    </div>
  )
}
