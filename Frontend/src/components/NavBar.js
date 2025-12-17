import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="NavBar">
      <Link to="/">Welcome</Link>
      <Link to="/x">About</Link>
      <Link to="/y">Contact</Link>
      <Link to="/z">Login</Link>
      <Link to="/LebanonGuide">Plan</Link>
    </div>
  );
}
export default NavBar;