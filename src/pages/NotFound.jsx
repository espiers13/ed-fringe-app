import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-full gap-4 mt-20">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-gray-600">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Button
        text="Back to Home"
        className="bg-yellow-300 hover:bg-yellow-400"
        onClick={() => navigate("/")}
      />
    </div>
  );
}

export default NotFound;
