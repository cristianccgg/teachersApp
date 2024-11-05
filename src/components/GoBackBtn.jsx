import { Link } from "react-router-dom";

function GoBackBtn() {
  return (
    <div>
      <Link
        to={"/"}
        className="bg-pink-500 text-white px-4 py-2 rounded-md font-semibold"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}

export default GoBackBtn;
