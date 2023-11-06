import React, { useState } from 'react'

import styles from "./addRole.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const AddRole = ({volunteers,setVolunteers}) => 
{

  const [input,setInput]= useState({role:"",requiredVolunteers:""})

  const changeHandler=(inputField,text)=>
  {
    setInput(prev=>({...prev,[inputField]:text}));
  }

  const clickHandler=()=>
  {
    setVolunteers(prev=>[...prev,input]);
    setInput({role:"",requiredVolunteers:""});
  }

  const deleteHandler=(selectedItem)=>
  {
    setVolunteers(prev=>prev.filter(item=>item!==selectedItem));
  }

  const isDisabled = () => input.role==="" | input.requiredVolunteers<1 
    
  return (
    <div className={styles.container}>
        <section className={styles.section}>
            <input placeholder='Role' value={input.role} onChange={(e)=>changeHandler("role",e.target.value)}/>
            <input placeholder='Number of Volunteers' value={input.requiredVolunteers} onChange={(e)=>changeHandler("requiredVolunteers",Number(e.target.value))}/>
            <button disabled={isDisabled()} className={styles.button} onClick={()=>clickHandler()}>+</button>
        </section>

        <main>
            {volunteers.map(item=>
                (
                    <li className={styles[`list-item`]} key={item.role}>
                        <span>Role: <b> {item.role} </b> - Required: <b> {item.requiredVolunteers} </b> </span>
                        <FontAwesomeIcon icon={faTrash} className={styles.icon} onClick={()=>deleteHandler(item)}/>
                    </li>
                ))}
        
        </main>
    </div>
  )
}
