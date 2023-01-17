import React from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
//import useApplication from ../hooks/useApplicationData
import useApplicationData from "../hooks/useApplicationData";

//when import with curly braces object don't need default on the export function line
import { getAppointmentsForDay, getInterview, getInterviewersForDay, } from "helpers/selectors";


export default function Application(props) {
  //retrieve from useApplicationData after it's been called
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  
  //giving dailyAppointments an empty array to hold them
  //now dailyAppointments is from getAppointments function from state object
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  //get interviewer info for days
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  
  // passingg all props/data for each appointment to the the component
  //get schedule from appointments
  const appointmentComponent = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      // <Appointment key={appointment.id} {...appointment} />
      <Appointment 
      key={appointment.id} 
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={dailyInterviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      />
    );
  })

  

    return (
      <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
          />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            // setDay={setDay} use onchange instead setDay passed to 
            // Application > DayList > DayListItem
            //use onChange isn't using onChange, but setting the name of our props to be same as those keywords
            onChange={setDay}
            />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        { appointmentComponent }
        <Appointment key="last" time="5pm" bookInterview={bookInterview} />
      </section>
    </main>
  );
}

  // const days = [
  //   {
  //     id: 1,
  //     name: "Monday",
  //     spots: 2,
  //   },
  //   {
  //     id: 2,
  //     name: "Tuesday",
  //     spots: 5,
  //   },
  //   {
  //     id: 3,
  //     name: "Wednesday",
  //     spots: 0,
  //   },
  // ];
  
  // const appointments = {
  //   "1": {
  //     id: 1,
  //     time: "12pm",
  //   },
  //   "2": {
  //     id: 2,
  //     time: "1pm",
  //     interview: {
  //       student: "Lydia Miller-Jones",
  //       interviewer: {
  //         id: 3,
  //         name: "Sylvia Palmer",
  //         avatar: "https://i.imgur.com/LpaY82x.png",
  //       }
  //     }
  //   },
  //   "3": {
  //     id: 3,
  //     time: "2pm",
  //   },
  //   "4": {
  //     id: 4,
  //     time: "3pm",
  //     interview: {
  //       student: "Archie Andrews",
  //       interviewer: {
  //         id: 4,
  //         name: "Cohana Roy",
  //         avatar: "https://i.imgur.com/FK8V841.jpg",
  //       }
  //     }
  //   },
  //   "5": {
  //     id: 5,
  //     time: "4pm",
  //   }
  // };