import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="container mx-auto flex justify-between items-center rounded-lg">
        <Link href="/" className="navbar text-2xl">
          KUKS FRESH
        </Link>
        <div>
          <Link href="/" className="navbar mx-2">
            Home
          </Link>
          <Link href="/about" className="navbar mx-2">
            Autor
          </Link>
          
        </div>
        <div className="Navbar">
            <FaUserCircle className="text-3xl" />
          </div>
      </div>
    </nav>
  );
};

export default Navbar;
