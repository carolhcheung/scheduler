import React, { useState } from 'react';

import InterviewerList from "../InterviewerList";
import Button from "../Button";

// import { action } from "@storybook/addon-actions";

//allows student to create appointment with interviewer
export default function Form(props) {
  //destructured and set initial value
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  //error state to Form component
  const [error, setError] = useState("");


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
  // const save = () => {
  //   props.onSave(student, interviewer);
  // };

  //validate form

  const validate = () => {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
    setError("");
    props.onSave(student, interviewer);
  }


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
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
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
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
};