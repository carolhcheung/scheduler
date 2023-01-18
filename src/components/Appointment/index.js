import React from "react";

import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm";
import Error from "./Error"

import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {

    // saving status until response from bookInterview returns
    transition(SAVING)
    console.log('Saving...')

    //form onSave/save button will create new interview object and call bookInterview
    const id = props.id
    const interview = {
      student: name,
      interviewer
    };
    console.log("int", interview)
    props.bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true))

      console.log('id-inter', id, interview)
      console.log('props.int', props.interview);
  }

  const deleteButton = () => {
    transition(CONFIRM)
  }
  //confirm delete appointment
  const destroy = () => {
    //delete status page when appointment is being delete and state being set
    transition(DELETE)
    const id = props.id;

    //delete request sent to appointment api
    props.cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true))
  }

  const editButton = () => {
    transition(EDIT)
  }

  return (
    <article className="appointment" data-testid="appointment">
      {/* modes require all props from stories */}
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={editButton}
          onDelete={deleteButton}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETE && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          message="Please confirm if you wish to delete your appointment."
          onConfirm={destroy}
          onCancel={() => back()}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Unable to save" onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Unable to delete" onClose={() => back()} />
      )}
    </article>

  );
};