export function getAppointmentsForDay(state, day) {
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