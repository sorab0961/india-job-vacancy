export default function Footer({ isDark }) {
    const currentYear = new Date().getFullYear();

    return (
        <footer id="contact" className="relative bg-navy-950 border-t border-navy-800/50">
            {/* Tricolor bar */}
            <div className="h-1 flex">
                <div className="flex-1 bg-saffron" />
                <div className="flex-1 bg-white" />
                <div className="flex-1 bg-india-green" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
                    {/* Brand */}
                    <div className="sm:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-9 h-9 bg-gradient-to-br from-saffron via-white to-india-green rounded-lg flex items-center justify-center">
                                <span className="text-navy-900 font-black text-sm">IV</span>
                            </div>
                            <span className="text-lg font-bold text-white tracking-tight">
                                India<span className="text-saffron">Job</span> Vacancy
                            </span>
                        </div>
                        <p className="text-navy-400 text-sm leading-relaxed max-w-md mb-6">
                            India&apos;s trusted recruitment network connecting job seekers with verified employers across all states. Submit your resume for free and take the first step towards your dream career.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-navy-400">
                            <svg className="w-4 h-4 text-saffron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <a href="mailto:contact@indiajobvacancy.com" className="hover:text-saffron transition-colors">
                                contact@indiajobvacancy.com
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            {[
                                { label: 'Home', href: '#home' },
                                { label: 'Submit Resume', href: '#submit-resume' },
                                { label: 'About Us', href: '#about' },
                                { label: 'Contact', href: '#contact' },
                            ].map((link) => (
                                <li key={link.href}>
                                    <a href={link.href} className="text-sm text-navy-400 hover:text-saffron transition-colors">{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h3>
                        <ul className="space-y-3">
                            {['Privacy Policy', 'Terms & Conditions', 'Disclaimer', 'Refund Policy'].map((label) => (
                                <li key={label}>
                                    <a href="#" className="text-sm text-navy-400 hover:text-saffron transition-colors">{label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-navy-800/50 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
                    <p className="text-xs text-navy-500">© {currentYear} IndiaJob Vacancy. All rights reserved.</p>
                    <p className="text-xs text-navy-600">Made with ❤️ for India&apos;s workforce</p>
                </div>
            </div>
        </footer>
    );
}
