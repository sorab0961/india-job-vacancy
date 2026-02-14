const badgeStyles = {
    saffron: 'bg-saffron/15 text-saffron border-saffron/30',
    green: 'bg-india-green/15 text-india-green-light border-india-green/30',
    blue: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    navy: 'bg-navy-700 text-navy-200 border-navy-600',
};

export default function Badge({ children, variant = 'saffron', className = '' }) {
    return (
        <span
            className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border ${badgeStyles[variant] || badgeStyles.saffron
                } ${className}`}
        >
            {children}
        </span>
    );
}
