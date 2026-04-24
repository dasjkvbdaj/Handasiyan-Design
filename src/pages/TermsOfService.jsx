import React from 'react';

const TermsAndConditions = () => {
    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-16 px-6">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-4xl md:text-5xl font-bold border-b border-white/10 pb-6 text-[#d4af37]">Terms and Conditions</h1>
                <p className="text-white/60">Last updated: {new Date().toLocaleDateString()}</p>

                <div className="space-y-8 text-white/80 leading-relaxed">
                    <p>Welcome to Handasiyan. By accessing this website, you agree to the following terms:</p>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">Use of Website</h2>
                        <p>This website is intended to provide general information about our services. You agree not to misuse the website or attempt to disrupt its functionality.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">Services</h2>
                        <p>All services are subject to project agreements and contracts defined between Handasiyan and the client.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">Intellectual Property</h2>
                        <p>All content on this website (text, images, designs) is the property of Handasiyan and may not be copied or used without permission.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">Limitation of Liability</h2>
                        <p>Handasiyan is not liable for any direct or indirect damages resulting from the use of this website.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">External Links</h2>
                        <p>Our website may contain links to third-party websites. We are not responsible for their content or privacy practices.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">Changes to Terms</h2>
                        <p>We may update these terms at any time. Continued use of the website means you accept any changes.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">Contact Information</h2>
                        <div className="space-y-2">
                            <p>📧 handasiyan.2020@gmail.com</p>
                            <p>📞 +233 59 639 9006</p>
                            <p>📍 Accra, Ghana</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
