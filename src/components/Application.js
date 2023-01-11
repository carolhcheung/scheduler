import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";

//when import with curly braces object don't need default on the export function line
import { getAppointmentsForDay, getInterview } from "helpers/selectors";


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

export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // //create effect to make request to /api/days using axios and update days state with response
  // const [days, setDays] = useState([]);
  // const [appointments, setAppointments] = useState({})

  //combine state for day, days, appointments from ln89-70 into state of a single object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    // appointments: {}
  });
  // console.log(day);
  const setDay = day => setState({ ...state, day });
  
  // const setDays = days => setState(prev => ({...prev, days}));
  //giving dailyAppointments an empty array to hold them
  //now dailyAppointments is from getAppointments function from state object
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  //get schedule from appointments
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
  })

  //get api data
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
     ]).then((all) => {
        // console.log(all[0].data);
        const days = all[0].data;
        // console.log(all[1].data);
        const appointments = all[1].data;
        // console.log(appointments)
        const interviewers = all[2].data;
        // console.log(all[2].data);
        // setDays([...res.data]) //this passes in res.data into setDays
      setState(prev => ({...prev, days, appointments, interviewers}))
      })
  }, []);

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
        {dailyAppointments.map((appointment) => {
          return (
            <Appointment key={appointment.id} {...appointment} />
          )
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
