import React from "react";

import {
  prettyDOM,
  getAllByTestId,
  getByText,
  getByAltText,
  getByPlaceholderText,
  queryByText,
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

  it.only("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    //Render the Application.
    const { container } = render(<Application />);
    // Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // console.log(prettyDOM(container));
    //gets all containers named data-testid=appointment
    const appointments = getAllByTestId(container, "appointment");
    // console.log(prettyDOM(appointments));
    //gets first container named data-testid=appointment[0]
    const appointment = getAllByTestId(container, "appointment")[0];
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


// it("defaults to Monday and changes the schedule when a new day is selected", () => {
//   const { getByText } = render(<Application />);
//   //promise chain with waitForElement, fire clickevent on Tuesday then verify Leopold Silvers is in doc
//   return waitForElement(() => getByText("Monday")).then(() => {
//     fireEvent.click(getByText("Tuesday"));

//     expect(getByText("Leopold Silvers")).toBeInTheDocument();
//   });
// });
