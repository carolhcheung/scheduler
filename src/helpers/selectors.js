export function getAppointmentsForDay(state, day) {
  const result = [];
  //check if state.days is empty array
  if (!state.days.length) {
    return result;
  }
  // console.log('days', state.days)
  const selectedDay = state.days.find(stateDay => stateDay.name === day);
  //check if selected day is not found
  if (!selectedDay) {
    return result;
  }
  //return array of state.appointments[appointment] from each selectedDay.appointments
  console.log('all appointments', selectedDay.appointments)
  return selectedDay.appointments.map(appointment => state.appointments[appointment]);
}


export function getInterview(state, interview) {

  if (!interview) {
    return null
  }

  const interviewerId = interview.interviewer
  const interviewers = state.interviewers

  for (const id in interviewers) {
    if (interviewerId === interviewers[id].id) {

      const interviewDetails = {
        student: interview.student,
        interviewer: interviewers[id]
      }

      return interviewDetails
    }
  }

}

export function getInterviewersForDay(state, day) {
  const result = [];
  //check if state.days is empty array
  if (!state.days.length) {
    return result;
  }
  // console.log('days', state.days)
  const selectedDay = state.days.find(stateDay => stateDay.name === day);
  //check if selected day is not found
  if (!selectedDay) {
    return result;
  }
  //get interviewer ID for selectedDay
  const interviewerIdForDay = selectedDay.interviewers;
  //get interviewer info for all
  const interviewers = state.interviewers;

  //return array of interviewers[id] from each selectedDay.appointments = (interview info for select day)
  console.log('forDay', interviewerIdForDay)
  console.log('interviewer info', interviewers[2])
  interviewerIdForDay.forEach(id => {
    if (id === interviewers[id].id) {
      result.push(interviewers[id])
    }
  })
  return result;
}

 ///pseudo-code to look for interviewerId=state.appointments[appointment].interviewer; if interviewerId === state.interviewers[interviewerId] return state.interviewers[].name


//  export function getInterviewersForDay(state, day) {
//   //... returns an array of appointments for that day
//   const result = [];
//   console.log('State.Days:', state.days);
//   // // if no interviewers in days data
//   if (!state.days.length) {
//     return result;
//   }
//   // filter through array for a specific day details
//   const getDay = state.days.filter(x => x.name === day);

//   // if no data/object for a specific day
//   if (!getDay[0]) {
//     return result;
//   }

//   // get the interviewers IDs for that day
//   const interviewerIdsForDay = getDay[0].interviewers;

//   // get details for all interviewers
//   const interviewers = state.interviewers;

//   // get interviewers details for the specific day if id matches
//   interviewerIdsForDay.forEach(id => {
//     if (id === interviewers[id].id) {
//       result.push(interviewers[id]);
//     }
//   });

//   return result;
// }

// export function getAppointmentsForDay(state, day) {
//   //... returns an array of appointments for that day
//   const result = [];

//   // if no days data
//   if (!state.days.length) {
//     return result;
//   }
//   // filter through state for a specific day
//   const getDay = state.days.filter(x => x.name === day);

//   // if no data for a specific day
//   if (!getDay[0]) {
//     return result;
//   }

//   // get the appointments IDs for that day
//   const appointmentIdsForDay = getDay[0].appointments;

//   // get details for all appointments
//   const appointments = state.appointments;

//   // get appointment details for the specific day if id matches
//   appointmentIdsForDay.forEach(id => {
//     if (id === appointments[id].id) {
//       result.push(appointments[id]);
//     }
//   });

//   return result;
// }


// export function getAppointmentsForDay(state, day) {
//   //check if state.days is empty array
//   if (!state.days.length) {
//     return [];
//   }

//   //look up appointments for selected day
//   const selectedDay = state.days.filter(
//     stateDay => stateDay.name === day)[0];
//   // console.log('selectedDay', selectedDay)
//   //[0] because state.days.filter returns arr with single obj [{ id: 2, name: 'Tuesday', appointments: [ 4, 5 ] }]
//   //returns [] if no match for day selected, and return undefined
//   // console.log('day obj', state.days)
//   // console.log('selectedDay', selectedDay)
//   if (!selectedDay) {
//     return [];
//   }
//   // console.log('selected appointments', selectedDay.appointments)

//   const result = [];
//   selectedDay.appointments.forEach(appointment => {
//     // console.log('appointment', appointment)
//     if (appointment === state.appointments[appointment].id) {
//       result.push(state.appointments[appointment]);
//     }
//   });
//   console.log('res', result);
//   return result;
// }
