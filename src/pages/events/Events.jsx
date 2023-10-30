import styles from "./events.module.css";

import React from 'react'

import { AddEvent } from "../../features/events/addEvent/AddEvent";

export const Events = () => {
  return (
    <div>
      <h1>Events</h1>
      <AddEvent />
    </div>
  )
}
