import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types'; 


function interviewerList(props) {
  const Interviewers=props.interviewers.map((interviewer)=>{
    return(
      <InterviewerListItem
      id={interviewer.id}
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={props.setInterviewer}
      />
    )
  })
  return (<ul>
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{Interviewers}</ul>
    </section>  </ul>
  )
}
interviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default interviewerList;