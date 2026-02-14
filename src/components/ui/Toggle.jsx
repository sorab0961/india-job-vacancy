export default function Toggle({ label, checked, onChange, id, isDark = true, className = '' }) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <button
                type="button"
                role="switch"
                id={id}
                aria-checked={checked}
                onClick={() => onChange(!checked)}
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-saffron/50 focus:ring-offset-2 ${isDark ? 'focus:ring-offset-navy-900' : 'focus:ring-offset-white'} ${checked ? 'bg-saffron' : isDark ? 'bg-navy-600' : 'bg-slate-300'
                    }`}
            >
                <span
                    className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-300 ${checked ? 'translate-x-5' : 'translate-x-0'
                        }`}
                />
            </button>
            {label && (
                <label htmlFor={id} className={`text-sm font-medium cursor-pointer select-none ${isDark ? 'text-navy-200' : 'text-slate-700'}`}>
                    {label}
                </label>
            )}
        </div>
    );
}
