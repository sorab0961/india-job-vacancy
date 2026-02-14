export default function Select({ label, error, id, children, isDark = true, className = '', ...props }) {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            {label && (
                <label htmlFor={id} className={`text-sm font-medium ${isDark ? 'text-navy-200' : 'text-slate-700'}`}>
                    {label}
                    {props.required && <span className="text-saffron ml-1">*</span>}
                </label>
            )}
            <select
                id={id}
                className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-saffron/50 focus:border-saffron appearance-none cursor-pointer ${isDark
                        ? `bg-navy-800/60 text-white ${error ? 'border-red-500' : 'border-navy-600 hover:border-navy-400'}`
                        : `bg-slate-50 text-slate-900 ${error ? 'border-red-500' : 'border-slate-300 hover:border-slate-400'}`
                    }`}
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239ca3af' d='M6 8.825a.5.5 0 0 1-.354-.146l-4-4a.5.5 0 1 1 .708-.708L6 7.617l3.646-3.646a.5.5 0 1 1 .708.708l-4 4A.5.5 0 0 1 6 8.825Z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center',
                    backgroundSize: '12px',
                }}
                {...props}
            >
                {children}
            </select>
            {error && <p className="text-xs text-red-400 mt-0.5">{error}</p>}
        </div>
    );
}
