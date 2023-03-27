# weather-app

### Install npm packages

To install npm packages for root as well as client and server:

- `npm run install-all`

### Run Application

To run both client and server from root:

- `npm run dev`

### Run Unit Tests

To run Unit Tests, from root or client directory:

- `npm run test`
- Currently only a couple small client tests are running. More tests will need to be written.

### Accessibility considerations

Semantic HTML and appropriate header elements were used, descriptive aria-labels placed for icon buttons, focus outline on focusable elements, alert role on error message, contrast of 4.5:1 or greater for all text, fully keyboard navigable

### Dependencies

- [React](https://react.dev/)
- [Express](https://www.npmjs.com/package/express)
- [Axios](https://axios-http.com/docs/api_intro)
- [react-spinners](https://www.npmjs.com/package/react-spinners)
- [react-autocomplete](https://www.npmjs.com/package/react-autocomplete)
- [react-icons](https://react-icons.github.io/react-icons/)
- [recharts](https://recharts.org/en-US/)
- [date-fns](https://date-fns.org/)

### Third Party API

Weather data is fetched from [OpenWeatherMap](https://openweathermap.org/api)

- Currently utilzing the weather, four-day forecast, and location APIs

### Geolocation

[Geolocation.getCurrentPosition](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) used for geolocation

### Error Handling

- The handleError utils in the client and server are placeholders for more robust implementations of error logging and monitoring
