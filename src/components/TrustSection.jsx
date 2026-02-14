import Alert from './ui/Alert';
import Badge from './ui/Badge';

const disclaimers = [
    {
        variant: 'warning',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
        title: 'We NEVER Charge Money',
        description: 'If anyone asks for payment claiming to be from IndiaJob Vacancy, it is a fraud. Report immediately.',
    },
    {
        variant: 'warning',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
        ),
        title: 'Beware of Fraud Calls',
        description: 'Our team will never call you asking for personal banking details, OTPs, or passwords.',
    },
    {
        variant: 'info',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: 'No Placement Guarantee',
        description: 'We forward your resume to verified recruiters but do not guarantee job placement.',
    },
    {
        variant: 'success',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        title: 'Your Data is Safe',
        description: 'We handle your personal information with care and do not share it with unverified third parties.',
    },
];

const iconColors = {
    warning: { dark: 'text-amber-400 bg-amber-500/10', light: 'text-amber-600 bg-amber-100' },
    info: { dark: 'text-blue-400 bg-blue-500/10', light: 'text-blue-600 bg-blue-100' },
    success: { dark: 'text-emerald-400 bg-emerald-500/10', light: 'text-emerald-600 bg-emerald-100' },
};

export default function TrustSection({ isDark }) {
    return (
        <section className={`relative py-16 sm:py-20 transition-colors duration-300 ${isDark ? 'bg-navy-950' : 'bg-white'}`}>
            <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent ${isDark ? 'via-navy-700' : 'via-slate-200'}`} />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 sm:mb-14">
                    <Badge variant="saffron" className="mb-4">🛡️ Trust & Safety</Badge>
                    <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Important <span className="text-saffron">Disclaimer</span>
                    </h2>
                    <p className={`max-w-xl mx-auto text-sm sm:text-base ${isDark ? 'text-navy-400' : 'text-slate-500'}`}>
                        Please read carefully before submitting your resume
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {disclaimers.map((item, index) => {
                        const colors = iconColors[item.variant] || iconColors.warning;
                        return (
                            <div
                                key={index}
                                className={`group relative rounded-2xl border p-5 sm:p-6 transition-all duration-300 ${isDark
                                    ? 'bg-navy-800/30 border-navy-700/40 hover:border-navy-600/60 hover:bg-navy-800/50'
                                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md shadow-sm'
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${isDark ? colors.dark : colors.light
                                        }`}>
                                        {item.icon}
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className={`text-sm sm:text-base font-semibold mb-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                            {item.title}
                                        </h3>
                                        <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-navy-300' : 'text-slate-600'}`}>
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
