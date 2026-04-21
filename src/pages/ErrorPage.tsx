import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="error_page">
      <h1>404</h1>
      <Link to={"/"}>HOME</Link>
    </div>
  );
}
