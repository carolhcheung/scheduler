import React, { useState } from 'react';

import InterviewerList from "../InterviewerList";
import Button from "../Button";

import { action } from "@storybook/addon-actions";

//allows student to create appointment with interviewer
export default function Form(props) {
  //destructured and set initial value
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  //clear function to clear all fields
  const reset = () => {
    setStudent("")
    setInterviewer(null)
  }

  //create cancel function to reset form and cancel when user clicks on cancel button
  const cancel = () => {
    reset();
    props.onCancel()
  }

  //to save student and interviewer from input field and interviewer selected and shows states in hooks>actions of form in devtools
  const save = () => {
    props.onSave(student, interviewer);
  }; 


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={e => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(e) => setStudent(e.target.value)}

          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}

        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={save}>Save</Button>
        </section>
      </section>
    </main>
  );
};