import ClipLoader from "react-spinners/ClipLoader";

function Spinner({ isLoading }) {
  if (!isLoading) return null;

  return (
    <ClipLoader
      className="spinner"
      color="var(--primary)"
      cssOverride={{ position: "absolute", top: "calc(50vh - 50px)" }}
    />
  );
}

export default Spinner;
