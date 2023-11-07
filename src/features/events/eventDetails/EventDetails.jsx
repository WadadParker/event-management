import styles from "./eventDetails.module.css";

import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from "../eventsSlice";

export const EventDetails = () => 
{
    const {eventId} = useParams();

    const dispatch = useDispatch();
    const events = useSelector(state=>state.events.events);

    const foundEvent = events.find(({_id})=>_id === eventId);

    useEffect(()=>{
        dispatch(fetchEvents());
    },[dispatch]);

  return (
    <div className={styles[`form-container`]}>
        <h2 className={styles.heading}>Event Details</h2>
        <p><b>Name: </b>{foundEvent?.name}</p>
        <p><b>Description: </b> {foundEvent?.description} </p>
        <p><b>Date: </b> {new Date(foundEvent?.date).toLocaleDateString()} </p>
        <p><b>location: </b> {foundEvent?.location} </p>
        {foundEvent?.volunteerRoleRequirements?.map(item=>
            (
                <p key={item?._id}>
                    <span>Role: <b> {item?.role}</b></span>
                    {" "}
                    <span>Requirement:<b> {item?.requiredVolunteers} </b></span>
                </p>
            ))}
    </div>
  )
}
