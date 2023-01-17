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
  // console.log(day);

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
      // console.log(all[0].data);
      const days = all[0].data;
      // console.log(all[1].data);
      const appointments = all[1].data;
      // console.log(appointments)
      const interviewers = all[2].data;
      // console.log(all[2].data);
      // setDays([...res.data]) //this passes in res.data into setDays
      setState(prev => ({ ...prev, days, appointments, interviewers }))
    })
  }, []);
  //updateSpots when an interview is added/removed, add default is false unless we state it to true in cancelInterview
  const updateSpots = (state, addSpot = false) => {
    //current day = state.day
    //find day in days array matching select day to update
    const selectedDay = state.days.filter((day) => day.name === state.day)[0];

    if (addSpot) {
      // add spot if an interview is being cancelled
      selectedDay.spots++;
    } else {
      // remove a spot if an interview is being booked
      selectedDay.spots--;
    }
    // create a new days Array and replace the day with selectedDay
    const days = state.days.map((day) => {
      if (day.name === state.day) {
        return selectedDay;
      } else {
        return day;
      }
    });

    return days;
  }; 

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
        const days = updateSpots(state)
        // set the state with new appointments object
        setState({ ...state, appointments, days });
        // })
        // .catch(err => {
        //   console.log(err)
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
        //update state.days with updated number of spots left, true because need to increment and addSpot after interview is cancelled
        const days = updateSpots(state, true)
        // set the state with new appointments object
        setState({ ...state, appointments, days });
        console.log('Delete complete')
      });
    // .catch(err => {
    //   console.log(err)
    // });
  };

  //return from all helper functions in hook
  return { state, setDay, bookInterview, cancelInterview };

}