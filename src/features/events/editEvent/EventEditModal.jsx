import styles from "./eventEditModal.module.css";

import React, { useState } from 'react'
import { AddRole } from "../../../components/multiSelect/AddRole";

export const EventEditModal = ({item,setShowModal,editHandler}) => 
{
    const [input,setInput]=useState(item);
    const [volunteers,setVolunteers] = useState(item.volunteerRoleRequirements);

    const changeHandler=(inputField,text)=>
    {
      setInput(prev=>({...prev,[inputField]:text}))
    }

    const clickHandler=()=>
    {
        editHandler({...input,volunteerRoleRequirements:volunteers});
        setShowModal({modal:false,item:{}});
    }

    const isDisabled = () => input.name==="" | input.date==="" || input.location==="" || input.description===""

  return (
    <div className={styles[`background-container`]}>
        <main className={styles[`modal-container`]}>
            <h3>Edit Event Form</h3>
            <input placeholder='Event Name' value={input.name} onChange={(e)=>changeHandler("name",e.target.value)}/>
            <input type="date" value={input.date} onChange={(e)=>changeHandler("date",e.target.value)} />

            <input placeholder='Location' value={input.location} onChange={(e)=>changeHandler("location",e.target.value)}/>
            <input placeholder='Description' value={input.description} onChange={(e)=>changeHandler("description",e.target.value)}/>

            <AddRole volunteers={volunteers} setVolunteers={setVolunteers} />

            <section className={styles[`button-container`]}>
                    <button className={styles.close} onClick={()=>setShowModal({modal:false,item:{}})}>Close</button>
                    <button className={styles.update} disabled={isDisabled()} onClick={()=>clickHandler()}>Update Event</button>
            </section>
    </main>
  </div>
  )
}
