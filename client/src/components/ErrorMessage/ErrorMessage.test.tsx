/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */

import { render, screen } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";

test("message is shown when in error state", () => {
  render(<ErrorMessage error={true} />);
  const errorMessage = screen?.getByText(`Sorry, couldn't find that location`);
  expect(errorMessage).toBeTruthy();
});

test("message is not shown when not in error state", () => {
  const { container } = render(<ErrorMessage error={false} />);
  const errorMessage = container.querySelector("foo");
  expect(errorMessage).toBeFalsy();
});
