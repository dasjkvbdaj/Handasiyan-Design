import React from 'react';

const PrivacyPolicy = () => {
    
    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-16 px-6">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-4xl md:text-5xl font-bold border-b border-white/10 pb-6 text-[#d4af37]">Privacy Policy</h1>
                <p className="text-white/60">Last updated: {new Date().toLocaleDateString()}</p>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">1. Introduction</h2>
                    <p className="text-white/60 leading-relaxed">
                        Handasiyan ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">2. The Data We Collect</h2>
                    <p className="text-white/60 leading-relaxed">
                        We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                    </p>
                    <ul className="list-disc list-inside text-white/60 space-y-2 ml-4">
                        <li>Identity Data includes first name, last name, username or similar identifier.</li>
                        <li>Contact Data includes email address and telephone numbers.</li>
                        <li>Technical Data includes internet protocol (IP) address, browser type and version, time zone setting and location, and other technology on the devices you use to access this website.</li>
                        <li>Usage Data includes information about how you use our website and services.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">3. How We Use Your Data</h2>
                    <p className="text-white/60 leading-relaxed">
                        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                    </p>
                    <ul className="list-disc list-inside text-white/60 space-y-2 ml-4">
                        <li>To respond to your inquiries through our contact forms.</li>
                        <li>To provide you with architectural and interior design services.</li>
                        <li>To improve our website, services, marketing, and customer relationships.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">4. Data Security</h2>
                    <p className="text-white/60 leading-relaxed">
                        We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">5. Contact Us</h2>
                    <p className="text-white/60 leading-relaxed">
                        If you have any questions about this privacy policy or our privacy practices, please contact us at:
                        <br />
                        Email: Handasiyan.2020@gmail.com
                        <br />
                        Phone: +233 596 399 006
                    </p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
