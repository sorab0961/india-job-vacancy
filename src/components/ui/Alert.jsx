const alertStyles = {
    warning: {
        dark: 'bg-yellow-900/20 border-yellow-600/40',
        light: 'bg-amber-50 border-amber-300',
        icon: '⚠️',
        darkText: 'text-yellow-200',
        lightText: 'text-amber-800',
        darkStrong: 'text-yellow-100',
        lightStrong: 'text-amber-900',
    },
    info: {
        dark: 'bg-blue-900/20 border-blue-600/40',
        light: 'bg-blue-50 border-blue-300',
        icon: 'ℹ️',
        darkText: 'text-blue-200',
        lightText: 'text-blue-700',
        darkStrong: 'text-blue-100',
        lightStrong: 'text-blue-900',
    },
    success: {
        dark: 'bg-green-900/20 border-green-600/40',
        light: 'bg-emerald-50 border-emerald-300',
        icon: '✅',
        darkText: 'text-green-200',
        lightText: 'text-emerald-700',
        darkStrong: 'text-green-100',
        lightStrong: 'text-emerald-900',
    },
    error: {
        dark: 'bg-red-900/20 border-red-600/40',
        light: 'bg-red-50 border-red-300',
        icon: '❌',
        darkText: 'text-red-200',
        lightText: 'text-red-700',
        darkStrong: 'text-red-100',
        lightStrong: 'text-red-900',
    },
};

export default function Alert({ children, variant = 'warning', isDark = true, className = '' }) {
    const style = alertStyles[variant] || alertStyles.warning;

    return (
        <div
            className={`flex items-start gap-3 px-5 py-4 rounded-xl border transition-colors duration-300 ${isDark ? style.dark : style.light} ${className}`}
            role="alert"
        >
            <span className="text-lg shrink-0 mt-0.5">{style.icon}</span>
            <p className={`text-sm leading-relaxed ${isDark ? style.darkText : style.lightText} [&>strong]:font-semibold ${isDark ? `[&>strong]:${style.darkStrong}` : `[&>strong]:${style.lightStrong}`}`}>{children}</p>
        </div>
    );
}
