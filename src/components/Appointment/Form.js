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

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
          /*
            This must be a controlled component
            your code goes here
          */
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        // onChange={(e) => setInterviewer(e.target.value)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={props.onSave}>Save</Button>
        </section>
      </section>
    </main>
  );
};