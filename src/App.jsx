import React from "react"
import { Route, Routes } from "react-router-dom"

import { SideBar } from "./components/sideBar/sideBar"
import { Volunteers } from "./pages/volunteers/Volunteers"
import { Events } from "./pages/events/Events"
import { EventDetails } from "./features/events/eventDetails/EventDetails"
import { VolunteerDetails } from "./features/volunteers/volunteerDetails/VolunteerDetails"

function App() {

  return (
    <div className='app'>
      <SideBar />

      <Routes>
        <Route path="/" element={<Volunteers />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/volunteers/:volunteerId" element={<VolunteerDetails />} />
      </Routes>

    </div>
  )
}

export default App
