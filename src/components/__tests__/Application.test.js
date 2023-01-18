import React from "react";

import { render, cleanup, waitForElement } from "@testing-library/react";

import Application from "components/Application";


afterEach(cleanup);

//replace with defaults to Monday and changes sched....
// xit("renders without crashing", () => {
//   render(<Application />);
// });

//wait for fake API req to complete before confirm data loaded
//waitForElement returns promise that resolves, when cb returns truthy
//cb rejects after timeout when cant find text
it("defaults to Monday and changes the schedule when a new day is selected", () => {
  const { getByText } = render(<Application />);

  return waitForElement(() => getByText("Monday"));
});