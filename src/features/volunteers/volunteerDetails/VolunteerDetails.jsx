import styles from "./volunteerDetails.module.css";

import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import { useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { fetchVolunteers } from "../volunteersSlice";

export const VolunteerDetails = () => 
{
    const {volunteerId} = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const volunteers = useSelector(state=>state.volunteers.volunteers);

    const foundVolunteer = volunteers.find(({_id})=>_id === volunteerId);

    useEffect(()=>
    {
        dispatch(fetchVolunteers());
    },[dispatch])

  return (
    <div className={styles[`form-container`]}>
        <h2 className={styles.heading}>{foundVolunteer?.name} Details</h2>
        <p><b>Name: </b>{foundVolunteer?.name}</p>
        <p><b>Contact: </b> {foundVolunteer?.contact} </p>
        <p><b>Skills: </b> {foundVolunteer?.skills} </p>
        <p><b>Available: </b> {foundVolunteer?.availability?"Yes":"No"} </p>
        <p><b>Areas of Interest: </b> {foundVolunteer?.areasOfInterest} </p>
        <p><b>Events History: </b></p>
        {foundVolunteer?.assignedEvents?.map(event=>
            (
                <p className={styles.underline} onClick={()=>navigate(`/events/${event._id}`)}>{event?.name}</p>
            ))}
    </div>
  )
}
