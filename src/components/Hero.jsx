import Button from './ui/Button';
import Badge from './ui/Badge';

export default function Hero({ isDark }) {
    return (
        <section id="home" className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-16 transition-colors duration-300 ${isDark ? 'bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950' : 'theme-hero bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50'
            }`}>
            {/* Decorative elements */}
            <div className="absolute top-20 left-4 sm:left-10 w-40 h-40 sm:w-72 sm:h-72 bg-saffron/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-4 sm:right-10 w-52 h-52 sm:w-96 sm:h-96 bg-india-green/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] rounded-full blur-3xl ${isDark ? 'bg-navy-600/5' : 'bg-saffron/3'
                }`} />

            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.15)'} 1px, transparent 0)`,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Tricolor top bar */}
            <div className="absolute top-16 left-0 right-0 h-1 flex">
                <div className="flex-1 bg-gradient-to-r from-transparent to-saffron" />
                <div className={`flex-1 ${isDark ? 'bg-white/80' : 'bg-navy-800/80'}`} />
                <div className="flex-1 bg-gradient-to-r from-india-green to-transparent" />
            </div>

            <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <div className="mb-6 flex justify-center">
                    <Badge variant="saffron">🇮🇳 Pan India Recruitment Network</Badge>
                </div>

                <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6 ${isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                    Submit Your Resume –{' '}
                    <span className="bg-gradient-to-r from-saffron via-amber-400 to-india-green bg-clip-text text-transparent">
                        Get Hired Across India
                    </span>
                </h1>

                <p className={`text-lg sm:text-xl max-w-2xl mx-auto mb-4 leading-relaxed ${isDark ? 'text-navy-300' : 'text-slate-600'
                    }`}>
                    We connect job seekers with verified recruiters across India.
                </p>

                <p className={`text-base mb-10 ${isDark ? 'text-navy-400' : 'text-slate-500'}`}>
                    <span className="text-india-green-light font-semibold">100% Free</span>
                    <span className={`mx-2 ${isDark ? 'text-navy-600' : 'text-slate-300'}`}>•</span>
                    <span className="text-saffron font-semibold">No Charges</span>
                    <span className={`mx-2 ${isDark ? 'text-navy-600' : 'text-slate-300'}`}>•</span>
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>Freshers & Experienced</span>
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        variant="primary"
                        className="!px-8 !py-4 !text-lg !rounded-2xl"
                        onClick={() => document.querySelector('#submit-resume')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Submit Your Resume
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </Button>
                    <Button
                        variant={isDark ? 'outline' : 'secondary'}
                        className="!px-8 !py-4 !text-lg !rounded-2xl"
                        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Learn More
                    </Button>
                </div>

                {/* Stats bar */}
                <div className="mt-10 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
                    {[
                        { value: '10,000+', label: 'Resumes Received' },
                        { value: '500+', label: 'Partner Companies' },
                        { value: '28+', label: 'States Covered' },
                        { value: '100%', label: 'Free Service' },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-saffron">{stat.value}</div>
                            <div className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-navy-400' : 'text-slate-500'}`}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 animate-bounce">
                <span className={`text-xs uppercase tracking-widest ${isDark ? 'text-navy-500' : 'text-slate-400'}`}>Scroll</span>
                <svg className={`w-5 h-5 ${isDark ? 'text-navy-500' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
}
