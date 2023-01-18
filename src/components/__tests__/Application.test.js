import React from "react";
import axios from "axios";

import {
  debug,
  prettyDOM,
  getByTestId,
  getAllByTestId,
  getByText,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText,
  render,
  cleanup,
  waitForElement,
  fireEvent
} from "@testing-library/react";

import Application from "components/Application";


afterEach(cleanup);

//replace with defaults to Monday and changes sched....
// xit("renders without crashing", () => {
//   render(<Application />);
// });

//wait for fake API req to complete before confirm data loaded
//waitForElement returns promise that resolves, when cb returns truthy
//cb rejects after timeout when cant find text
describe("Application", () => {

  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    //Render the Application.
    const { container } = render(<Application />);
    // Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // console.log(prettyDOM(container));
    //gets all containers named data-testid=appointment
    const appointments = getAllByTestId(container, "appointment");

    // console.log(prettyDOM(appointments));
    //gets first container named data-testid=appointment[0]
    const appointment = appointments[0];
    // console.log(prettyDOM(appointment));
    //Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, "Add"))
    //Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    })
    // Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    //Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));
    //Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    //Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    //Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });
})

//cancelling interview
it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const { container } = render(<Application />);
  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Delete" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
    );

  fireEvent.click(queryByAltText(appointment, "Delete"));
  // 4. Check that the confirmation message is shown.
  expect(getByText(appointment, "Please confirm if you wish to delete your appointment.")).toBeInTheDocument();
  // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(queryByText(appointment, "Confirm"));
  // 6. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, "Deleting")).toBeInTheDocument();
  // 7. Wait until the element with the "Add" button is displayed.
  await waitForElement(() => getByAltText(appointment, "Add"));
  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
});

//edit interview
it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  // 1. Render the Application.
  const { container } = render(<Application />);
  //wait for archie to display
  await waitForElement(() => getByText(container, "Archie Cohen"));
  //We want to start by finding an existing interview.
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
    );
  //With the existing interview we want to find the edit button.
  fireEvent.click(queryByAltText(appointment, "Edit"));
  //We change the name and save the interview.
  fireEvent.change(getByTestId(appointment, "student-name-input"), {
    target: { value: "Carol C" }
  });
  
  fireEvent.click(getByText(appointment, "Save"));

  expect(getByText(appointment, "Saving")).toBeInTheDocument();
  //Wait until the element with the text "Lydia Miller-Jones" is displayed.
  await waitForElement(() => getByText(appointment, "Carol C"));
  //We don't want the spots to change for "Monday", since this is an edit.
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );
  //Read the errors because sometimes they say that await cannot be outside of an async function.
  await waitForElement(() =>
      expect(getByText(day, "1 spot remaining")).toBeInTheDocument()
    );

});



//mocking a mock
//handling error for save
it("shows the save error when failing to save an appointment", async () => {
  //mock axios error
  axios.put.mockRejectedValueOnce();
  // 1. Render the Application
  const { container, debug } = render(<Application />);
  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));
  // gets first container named data-testid=appointment[0]
  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];
  //Click the "Add" button on the first empty appointment.
  fireEvent.click(getByAltText(appointment, "Add"))
  //Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  })
  // Click the first interviewer in the list.
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  //Click the "Save" button on that same appointment.
  fireEvent.click(getByText(appointment, "Save"));
  //Check that the element with the text "Saving" is displayed.
  expect(getByText(appointment, "Saving")).toBeInTheDocument();
  //Wait until the element with the text "Unable to save" from appointment index.js is displayed. Error rendered
  await waitForElement(() => getByText(appointment, "Unable to save"));
});



//error handling for delete
it.only("shows the save error when failing to save an appointment", async () => {
  //mock axios error
  axios.delete.mockRejectedValueOnce();
  // 1. Render the Application.
  const { container } = render(<Application />);
  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Delete" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Delete"));
  // 4. Check that the confirmation message is shown.
  expect(getByText(appointment, "Please confirm if you wish to delete your appointment.")).toBeInTheDocument();
  // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(queryByText(appointment, "Confirm"));
  // 6. Check that the element with the text "Deleting" is displayed.
  expect(ByText(appointment, "Deleting")).toBeInTheDocument();
  //Wait until the element with the text "Unable to delete" from appointment index.js is displayed. Error rendered
  await waitForElement(() => getByText(appointment, "Unable to delete"));
  expect(getByText(appointment, "Error")).toBeInTheDocument();

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
});

// it("defaults to Monday and changes the schedule when a new day is selected", () => {
//   const { getByText } = render(<Application />);
//   //promise chain with waitForElement, fire clickevent on Tuesday then verify Leopold Silvers is in doc
//   return waitForElement(() => getByText("Monday")).then(() => {
//     fireEvent.click(getByText("Tuesday"));

//     expect(getByText("Leopold Silvers")).toBeInTheDocument();
//   });
// });
