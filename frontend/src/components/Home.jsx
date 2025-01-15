import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            {/* Navbar */}
            <nav className="navbar">
                <h1 className="logo">Wired</h1>
            </nav>

            {/* Hero Section */}
            <section className="hero">
                <h1>United Collaboration<br />for Success</h1>
                <p>
                    Discover projects, streamline workflows, and unlock your team&apos;s potential with Wired.
                </p>
                <div className="button-container">
                    <Link to="/login">
                        <button className="btn btn-primary">Login</button>
                    </Link>
                    <Link to="/register">
                        <button className="btn btn-secondary">Sign Up</button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>
                    &copy; 2024 <strong>Wired</strong>. All rights reserved. Empowering collaboration for a better tomorrow.
                </p>
            </footer>
        </div>
    );
}

export default Home;
