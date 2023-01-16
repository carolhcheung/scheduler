import React from "react";

import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"

import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {

    // saving status until response from bookInterview returns
    transition(SAVING)
    console.log('Saving...')

//form onSave will create new interview object and call bookInterview
    const id = props.id
    const interview = {
      student: name,
      interviewer
    };
    console.log("int", interview)
    props.bookInterview(id, interview)
    // transition(SHOW)
      .then(() => transition(SHOW))
      .then(() => console.log('Completed'))  //after bookInterview PUT complete, transition to SHOW
    console.log('id-inter', id, interview)
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={() => back()} />}
      {mode === SAVING && <Status message="Saving" />}
    </article>

  );
};