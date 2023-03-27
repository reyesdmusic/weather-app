// import "./ErrorMessage.css";
import ClipLoader from "react-spinners/ClipLoader";

function Spinner({ isLoading }) {
  if (!isLoading) return null;

    
  return (
    <ClipLoader color="var(--primary)" cssOverride={ { position: "absolute", top: "calc(50vh - 50px)" } }/>
  );
}

export default Spinner;
