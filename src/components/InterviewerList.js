import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss"
import PropTypes from 'prop-types';

export default function InterviewerList(props) {

  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };
  const {interviewers, value, onChange} = props;


  return(
    <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list" >{interviewers.map((x) => (
    <InterviewerListItem 
      key={x.id}
      // id={x.id}
      name={x.name}
      avatar={x.avatar}
      selected={x.id === value}
      setInterviewer={() => onChange(x.id)}
    />
  ))}
  </ul>
</section>
  );
};

//interviewerList(parent) ln16 is to pass from id into setInterviewer(id) ln20 of InterviewerListItem(child) without passing 
