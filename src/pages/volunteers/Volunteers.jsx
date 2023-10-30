import styles from "./volunteers.module.css";

import React from 'react'

import { AddVolunteer } from "../../features/volunteers/addVolunteer/AddVolunteer";

export const Volunteers = () => {
  return (
    <div>
      <h1>Volunteers</h1>
      <AddVolunteer />
    </div>
  )
}
