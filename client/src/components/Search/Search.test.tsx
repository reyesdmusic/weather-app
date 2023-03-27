/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */

import { screen, render } from "@testing-library/react";
import Search from "./Search";

describe("search component", () => {
  it("should show location input label", () => {
    render(
      <Search
        setError={{}}
        setIsLoading={{}}
        setSnapshot={{}}
        setForecast={{}}
      />
    );
    const label = screen.getByText("Location");
    expect(label).toBeTruthy();
  });

  it("should show location button with expected aria label", () => {
    render(
      <Search
        setError={{}}
        setIsLoading={{}}
        setSnapshot={{}}
        setForecast={{}}
      />
    );
    const locationButton = screen.getByLabelText("get current location");
    expect(locationButton).toBeTruthy();
  });

  test("should show search button with expected aria label", () => {
    render(
      <Search
        setError={{}}
        setIsLoading={{}}
        setSnapshot={{}}
        setForecast={{}}
      />
    );
    const searchButton = screen.getByLabelText("get weather data");
    expect(searchButton).toBeTruthy();
  });
});
