export default function Card({ children, className = '', hover = true, glow = false, isDark = true }) {
    return (
        <div
            className={`backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300
        ${isDark
                    ? 'bg-navy-800/50 border-navy-700/50'
                    : 'bg-white/80 border-slate-200 shadow-sm'
                }
        ${hover
                    ? isDark
                        ? 'hover:border-saffron/30 hover:shadow-lg hover:shadow-saffron/5 hover:-translate-y-1'
                        : 'hover:border-saffron/40 hover:shadow-lg hover:shadow-saffron/10 hover:-translate-y-1'
                    : ''
                }
        ${glow ? 'shadow-lg shadow-saffron/10' : ''}
        ${className}`}
        >
            {children}
        </div>
    );
}
