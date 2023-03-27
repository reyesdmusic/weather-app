import "./ErrorMessage.css";

function ErrorMessage({ error }) {
  if (!error) return null;

  return (
    <div role="alert" className="error-message">
      Sorry, couldn't find that location
    </div>
  );
}

export default ErrorMessage;
