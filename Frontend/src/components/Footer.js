import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <div className="Footer">
     <a href="https://www.instagram.com"><FaInstagram size={25} /></a>
     <a href="https://www.facebook.com"> <FaFacebook size={25} /></a>
     <a href="https://www.twitter.com"><FaTwitter size={25} /></a>
     <p> &copy; 2025-Lebanon Luxe Travel</p>
    </div>
  );
}
export default Footer;