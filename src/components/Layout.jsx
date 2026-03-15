import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-white/20">
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
