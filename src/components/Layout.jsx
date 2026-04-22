import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="relative min-h-screen bg-black text-white selection:bg-white/20">
            <Navbar />
            <main className="relative">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
