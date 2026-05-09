import React from 'react';
import { useSEO } from '../hooks/useSEO';

const PrivacyPolicy = () => {
    useSEO({
        title: 'Privacy Policy',
        description: 'Read Handasiyan\'s Privacy Policy to understand how we collect, use, and protect your personal information while you use our services.'
    });

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-16 px-6">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-4xl md:text-5xl font-bold border-b border-white/10 pb-6 text-[#d4af37]">Privacy Policy</h1>
                <p className="text-white/60">Last updated: {new Date().toLocaleDateString()}</p>

                <div className="space-y-8 text-white/80 leading-relaxed">
                    <p>At Handasiyan, we value your privacy and are committed to protecting your personal information.</p>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">Information We Collect</h2>
                        <p>We may collect:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Name</li>
                            <li>Phone number</li>
                            <li>Email address</li>
                            <li>Any information you provide through our contact forms</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">How We Use Your Information</h2>
                        <p>We use your information to:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Respond to inquiries</li>
                            <li>Provide our services</li>
                            <li>Improve our website and customer experience</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">Data Protection</h2>
                        <p>We implement appropriate security measures to protect your personal information from unauthorized access or disclosure.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">Third-Party Services</h2>
                        <p>We may use third-party tools (such as Google Analytics) to understand website usage. These tools may collect non-personal data.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">Cookies</h2>
                        <p>Our website may use cookies to enhance user experience and analyze traffic.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">Your Rights</h2>
                        <p>You have the right to request access, correction, or deletion of your personal data.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold text-white">Contact Us</h2>
                        <p>If you have any questions regarding this policy:</p>
                        <div className="space-y-2">
                            <p>📧 handasiyan.2020@gmail.com</p>
                            <p>📞 +233 59 639 9006</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
