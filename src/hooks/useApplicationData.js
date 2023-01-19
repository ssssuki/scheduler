import  { useState, useEffect } from "react";
import axios from "axios";



export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Tuesday",
    days: [],
    appointments: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const updateSpots = function(state) {
    return state.days.map(day => {
      let spots = Object.values(state.appointments)
        .filter(appointment => day.appointments.includes(appointment.id))
        .filter(appointment => appointment.interview === null)
        .length;
      day.spots = spots;
      return day;
    });
  }

  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const updatedState = { ...state, appointments };
    const updatedDays = updateSpots(updatedState);

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({ ...updatedState, days: updatedDays });
    });
  };

  const cancelInterview = (id) => {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };

    const updatedState = { ...state, appointments };
    const updatedDays = updateSpots(updatedState);

    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        setState({ ...updatedState, days: updatedDays });
      });
  };


    return {
      state: state,
      setDay: setDay,
      bookInterview: bookInterview,
      cancelInterview: cancelInterview
    };
};