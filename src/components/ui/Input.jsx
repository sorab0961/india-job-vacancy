export default function Input({ label, error, id, isDark = true, className = '', ...props }) {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            {label && (
                <label htmlFor={id} className={`text-sm font-medium ${isDark ? 'text-navy-200' : 'text-slate-700'}`}>
                    {label}
                    {props.required && <span className="text-saffron ml-1">*</span>}
                </label>
            )}
            <input
                id={id}
                className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-saffron/50 focus:border-saffron ${isDark
                        ? `bg-navy-800/60 text-white placeholder-navy-400 ${error ? 'border-red-500' : 'border-navy-600 hover:border-navy-400'}`
                        : `bg-slate-50 text-slate-900 placeholder-slate-400 ${error ? 'border-red-500' : 'border-slate-300 hover:border-slate-400'}`
                    }`}
                {...props}
            />
            {error && <p className="text-xs text-red-400 mt-0.5">{error}</p>}
        </div>
    );
}
