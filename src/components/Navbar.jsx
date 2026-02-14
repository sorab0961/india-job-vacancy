import { useState } from 'react';
import Button from './ui/Button';

export default function Navbar({ isDark, toggleTheme }) {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { label: 'Home', href: '#home' },
        { label: 'Submit Resume', href: '#submit-resume' },
        { label: 'About', href: '#about' },
        { label: 'Contact', href: '#contact' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 ${isDark ? 'bg-navy-950/80 border-navy-800/50' : 'bg-white/90 border-slate-200'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <a href="#home" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 bg-gradient-to-br from-saffron via-white to-india-green rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-saffron/30 transition-shadow duration-300">
                            <span className="text-navy-900 font-black text-sm">IV</span>
                        </div>
                        <span className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            India<span className="text-saffron">Job</span> Vacancy
                        </span>
                    </a>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {links.map((link) => (
                            <button
                                key={link.href}
                                onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })}
                                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${isDark ? 'text-navy-200 hover:text-saffron' : 'text-slate-600 hover:text-saffron'
                                    }`}
                            >
                                {link.label}
                            </button>
                        ))}

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className={`ml-2 p-2 rounded-xl transition-all duration-300 cursor-pointer ${isDark
                                    ? 'bg-navy-800 hover:bg-navy-700 text-yellow-400'
                                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                }`}
                            aria-label="Toggle theme"
                        >
                            {isDark ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>

                        <div className="ml-3">
                            <Button
                                variant="primary"
                                className="!px-5 !py-2.5 !text-sm"
                                onClick={() => document.querySelector('#submit-resume')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                Submit Resume
                            </Button>
                        </div>
                    </div>

                    {/* Mobile: Theme toggle + Hamburger */}
                    <div className="md:hidden flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-lg transition-colors cursor-pointer ${isDark ? 'text-yellow-400 hover:bg-navy-800' : 'text-slate-600 hover:bg-slate-100'
                                }`}
                            aria-label="Toggle theme"
                        >
                            {isDark ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>
                        <button
                            className={`p-2 rounded-lg transition-colors ${isDark ? 'text-navy-300 hover:text-white hover:bg-navy-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                                }`}
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className={`px-4 pb-4 pt-2 space-y-1 backdrop-blur-xl border-b ${isDark ? 'bg-navy-950/95 border-navy-800/50' : 'bg-white/95 border-slate-200'
                    }`}>
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={`block px-4 py-3 text-sm font-medium rounded-xl transition-colors ${isDark ? 'text-navy-200 hover:text-saffron hover:bg-navy-800/50' : 'text-slate-600 hover:text-saffron hover:bg-slate-50'
                                }`}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <div className="pt-2">
                        <Button
                            variant="primary"
                            className="w-full !py-3"
                            onClick={() => {
                                setIsOpen(false);
                                document.querySelector('#submit-resume')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Submit Resume
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
