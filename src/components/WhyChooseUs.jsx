import Card from './ui/Card';
import Badge from './ui/Badge';

const features = [
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: 'Pan India Hiring',
        description: 'Opportunities across all 28 states and 8 union territories. From metros to tier-2 cities.',
        badge: 'All India',
        badgeVariant: 'saffron',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        title: 'Verified Recruiters',
        description: 'Every recruiter in our network is verified. Your resume reaches only genuine employers.',
        badge: 'Trusted',
        badgeVariant: 'green',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        title: 'Freshers & Experienced',
        description: 'Whether you are a fresh graduate or a seasoned professional, we have matching opportunities.',
        badge: 'All Levels',
        badgeVariant: 'blue',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: 'Zero Registration Fees',
        description: 'Absolutely free for job seekers. No hidden charges, no premium plans required.',
        badge: '₹0 Cost',
        badgeVariant: 'saffron',
    },
];

export default function WhyChooseUs({ isDark }) {
    return (
        <section id="about" className={`relative py-24 transition-colors duration-300 ${isDark ? 'bg-navy-950' : 'bg-white'
            }`}>
            {/* Section separator */}
            <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent ${isDark ? 'via-navy-700' : 'via-slate-200'
                }`} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <Badge variant="green" className="mb-4">Why Choose Us</Badge>
                    <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Your Career, Our{' '}
                        <span className="text-saffron">Mission</span>
                    </h2>
                    <p className={`max-w-2xl mx-auto text-lg ${isDark ? 'text-navy-300' : 'text-slate-600'}`}>
                        We are building India&apos;s most trusted recruitment network — connecting talent with opportunity.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <Card key={index} isDark={isDark} className="text-center group">
                            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-300 ${isDark ? 'bg-gradient-to-br from-saffron/10 to-navy-700/50 text-saffron' : 'bg-gradient-to-br from-saffron/10 to-slate-100 text-saffron'
                                }`}>
                                {feature.icon}
                            </div>
                            <div className="mb-3">
                                <Badge variant={feature.badgeVariant}>{feature.badge}</Badge>
                            </div>
                            <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                {feature.title}
                            </h3>
                            <p className={`text-sm leading-relaxed ${isDark ? 'text-navy-300' : 'text-slate-600'}`}>
                                {feature.description}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
