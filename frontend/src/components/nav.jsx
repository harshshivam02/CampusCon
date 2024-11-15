import { Link } from 'react-router-dom';

 function Nav() {
    return (
        <nav className="bg-black shadow-lg">
            <div className="navbar flex justify-between items-center p-4 w-10/12 mx-auto">
                <div className="text-3xl font-bold">
                    <Link to="/" className="text-white hover:text-purple-300 transition-colors duration-300">
                        CampusConnect
                    </Link>
                </div>
                <div className="flex gap-4">
                    <Link to="/login">
                        <button className="bg-purple-900 text-white px-10 py-2 rounded-md hover:bg-purple-300 hover:text-black transition-all duration-300 shadow-md text-lg text-center">
                            Login
                        </button>
                    </Link>
                    <Link to="/signup">
                        <button className="bg-purple-900 text-white px-6 py-2 rounded-md hover:bg-purple-300 hover:text-black transition-all duration-300 shadow-md text-lg">
                            Signup
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
