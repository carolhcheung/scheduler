import { useState, useEffect } from "react";
import axios from "axios";

//interview appointment data and state export to application.js
export default function useApplicationData(initial) {

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


  //update day in state, select day
  const setDay = day => setState({ ...state, day });

  // const setDays = days => setState(prev => ({...prev, days}));
  //get api data and set initial state
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {

      const days = all[0].data;

      const appointments = all[1].data;

      const interviewers = all[2].data;

      setState(prev => ({ ...prev, days, appointments, interviewers }))
    })
  }, []);

  //update spots when interview is added/removed
  const updateSpots = (state, appointments) => {
    // Get the day
    const dayObj = state.days.find((d) => d.name === state.day);

    // count the null appointments
    let spots = 0
    for (const id of dayObj.appointments) {
      const appointment = appointments[id]
      if (!appointment.interview) {
        spots++
      }
    }


    const day = { ...dayObj, spots }
    const days = state.days.map(d => d.name === state.day ? day : d)

    return days
  }

  //book a new interview or PUT update interview
  const bookInterview = (id, interview) => {

    // from form component onSave, get sppointment id + interview object { student: name, interviewer: id}

    // update the database for this appointment id
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {

        console.log("Response Status: ", response.status);

        // create new appointment object with interview details
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview },
        };

        // create new appointments object with appointment details
        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };
//updateSpots(state, not true because want to decrement a spot when interview is booked )
        const days = updateSpots(state, appointments)
        // set the state with new appointments object
        setState({ ...state, appointments, days });

      });

  };

  //cancel interview function, sets interview state to the state after it's been deleted from db
  const cancelInterview = (id) => {
    return axios
      .delete(`/api/appointments/${id}`)
      .then((response) => {
        console.log("Response Status: ", response.status);
        // set appointment object with interview deleted
        const appointment = {
          ...state.appointments[id],
          interview: null,
        };

        // create new appointments object with appointment details
        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };

        const days = updateSpots(state, appointments)
        // set the state with new appointments object
        setState({ ...state, appointments, days });
        console.log('Delete complete')
      });

  };

  //return from all helper functions in hook
  return { state, setDay, bookInterview, cancelInterview };

}