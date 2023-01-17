export function getAppointmentsForDay(state, day) {
  if(state.days.length===0){
    return[]
  }
  const appointmentsByDay = state.days.filter((singleDay) => {
    return singleDay.name === day;
  });

  if (appointmentsByDay.length === 0) {
    return [];
  }

  const mappedAppointments = appointmentsByDay[0].appointments.map(
    (appointment) => {
      return state.appointments[appointment];
    }
  );

  return mappedAppointments;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const newInterview = {
    ...interview,
    interviewer: state.interviewers[interview.interviewer],
  };
  return newInterview;
}

export function getInterviewersForDay(state, day) {
  if(state.days.length===0){
    return[]
  }
  const interviewersByDay = state.days.filter((singleDay) => {
    return singleDay.name === day;
  });

  if (interviewersByDay.length === 0) {
    return [];
  }

  const mappedInterviewers = interviewersByDay[0].interviewers.map(
    (interviewer) => {
      return state.interviewers[interviewer];
    }
  );

  return mappedInterviewers;
}