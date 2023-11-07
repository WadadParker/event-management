import styles from "./volunteerList.module.css";

import React, {useEffect,useState} from 'react'
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { fetchVolunteers, updateVolunteer, deleteVolunteer } from "../volunteersSlice";

export const VolunteerList = () => 
{
    const navigate=useNavigate();
    const volunteers = useSelector(state=>state.volunteers.volunteers);
    const dispatch = useDispatch();

    const [showModal,setShowModal] = useState({ modal: false, item: {} });

    const editHandler=(newVolunteer)=>
    {
        dispatch(updateVolunteer(newVolunteer));
    }

    const deleteHandler=(volunteerId)=>
    {
        dispatch(deleteVolunteer(volunteerId));
    }

    useEffect(()=>{
        dispatch(fetchVolunteers());
    },[dispatch,volunteers])

  return (
    <table className={styles.table}>
        <thead >
            <tr className={styles[`heading-row`]}>
                <th>Name</th>
                <th>Contact</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            { volunteers.map(item=>(
                <tr key={item._id}>
                    <td className={`${styles[`table-data`]} ${styles.name}`} onClick={()=>navigate(`/volunteers/${item._id}`)}>{item.name}</td>
                    <td className={styles[`table-data`]}>{item.contact}</td>
                    <td className={`${styles[`icon-container`]} ${styles[`table-data`]}`}>
                        <FontAwesomeIcon icon={faPenToSquare} className={styles.edit} onClick={() => setShowModal({ modal: true, item })}/>
                        <FontAwesomeIcon icon={faTrash} className={styles.delete} onClick={()=>deleteHandler(item._id)}/>
                    </td>
                </tr>
            ))
            }
        </tbody>
    </table>
  )
}
