import "./ErrorMessage.css";

function ErrorMessage({ error }) {
  if (!error) return null;

    
  return (
    <div className="error-message">
        Sorry, couldn't find that location
    </div>
  );
}

export default ErrorMessage;
