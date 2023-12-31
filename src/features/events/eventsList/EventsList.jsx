import React, {useEffect,useState} from 'react'
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import styles from './eventsList.module.css';

import { fetchEvents, updateEvent, deleteEvent } from '../eventsSlice';

import { useDispatch, useSelector } from "react-redux";
import { EventEditModal } from '../editEvent/EventEditModal';

export const EventsList = () => 
{
    const navigate=useNavigate();
    const events = useSelector(state=>state.events.events);
    const dispatch = useDispatch();

    const [showModal,setShowModal] = useState({ modal: false, item: {} })

    const editHandler=(newEvent)=>
    {
        dispatch(updateEvent(newEvent))
    }

    const deleteHandler=(eventId)=>
    {
        dispatch(deleteEvent(eventId));
    }

    useEffect(()=>{
        dispatch(fetchEvents());
    },[dispatch]);
    
  return (
    <>
    {showModal.modal &&  <EventEditModal item={showModal.item} setShowModal={setShowModal} editHandler={editHandler}/>}
    <table className={styles.table}>
        <thead >
            <tr className={styles[`heading-row`]}>
                <th>Name</th>
                <th>Location</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            { events.map(item=>(
                <tr key={item._id}>
                    <td className={`${styles[`table-data`]} ${styles.name}`} onClick={()=>navigate(`/events/${item._id}`)}>{item.name}</td>
                    <td className={styles[`table-data`]}> {item.location}</td>
                    <td className={`${styles[`icon-container`]} ${styles[`table-data`]}`}>
                        <FontAwesomeIcon icon={faPenToSquare} className={styles.edit} onClick={() => setShowModal({ modal: true, item })}/>
                        <FontAwesomeIcon icon={faTrash} className={styles.delete} onClick={()=>deleteHandler(item._id)}/>
                    </td>
                </tr>
            ))
            }
        </tbody>
    </table>
    </>
  )
}
