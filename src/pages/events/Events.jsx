import styles from "./events.module.css";

import React from 'react'

import { AddEvent } from "../../features/events/addEvent/AddEvent";
import { EventsList } from "../../features/events/eventsList/EventsList";

export const Events = () => {
  return (
    <div>
      <h1>Events</h1>
      <section className={styles.container}>
      <AddEvent />
      <EventsList />
      </section>
    </div>
  )
}
