import React from 'react';

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-16 px-6">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-4xl md:text-5xl font-bold border-b border-white/10 pb-6 text-[#d4af37]">Terms of Service</h1>
                <p className="text-white/60">Last updated: {new Date().toLocaleDateString()}</p>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">1. Agreement to Terms</h2>
                    <p className="text-white/60 leading-relaxed">
                        By accessing our website at handasiyan.com, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">2. Use License</h2>
                    <p className="text-white/60 leading-relaxed">
                        Permission is granted to temporarily view the materials (information or software) on Handasiyan's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">3. Disclaimer</h2>
                    <p className="text-white/60 leading-relaxed">
                        The materials on Handasiyan's website are provided on an 'as is' basis. Handasiyan makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">4. Limitations</h2>
                    <p className="text-white/60 leading-relaxed">
                        In no event shall Handasiyan or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Handasiyan's website.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">5. Governing Law</h2>
                    <p className="text-white/60 leading-relaxed">
                        These terms and conditions are governed by and construed in accordance with the laws of Ghana and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default TermsOfService;
