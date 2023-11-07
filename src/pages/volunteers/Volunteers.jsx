import styles from "./volunteers.module.css";

import React from 'react'

import { AddVolunteer } from "../../features/volunteers/addVolunteer/AddVolunteer";
import { VolunteerList } from "../../features/volunteers/volunteerList/VolunteerList";

export const Volunteers = () => {
  return (
    <div>
      <h1>Volunteers</h1>
      <section className={styles.container}>
        <AddVolunteer />
        <VolunteerList />
      </section>
    </div>
  )
}
