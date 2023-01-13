import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  function reset() {
    setStudent('');
    setInterviewer(null);
  }

  function cancel() {
    reset();
    props.onCancel();
  }

  function handleSubmit(e){
    e.preventDefault()
    props.onSave(student, interviewer);
    
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={student}
            onChange={event => setStudent(event.target.value)}
            placeholder='Enter Student Name'
            data-testid='student-name-input'
          /*
            This must be a controlled component
            your code goes here
          */
          />
        </form>
        <InterviewerList
        /* your code goes here */
         interviewers={props.interviewers}
         interviewer={interviewer || props.interviewer}
         setInterviewer={event => setInterviewer(event)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={handleSubmit}>Save</Button>
        </section>
      </section>
    </main>
  )
}