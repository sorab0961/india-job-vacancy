export default function Button({ children, variant = 'primary', className = '', disabled = false, ...props }) {
    const base = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-saffron hover:bg-saffron-light text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:ring-saffron px-6 py-3 text-base',
        secondary: 'bg-navy-700 hover:bg-navy-600 text-white shadow-md hover:shadow-lg focus:ring-navy-500 px-6 py-3 text-base',
        outline: 'border-2 border-navy-300 text-navy-200 hover:bg-navy-800 hover:border-navy-200 focus:ring-navy-400 px-6 py-3 text-base',
        ghost: 'text-navy-200 hover:text-white hover:bg-navy-800/50 focus:ring-navy-400 px-4 py-2 text-sm',
        nav: 'text-navy-200 hover:text-saffron transition-colors px-3 py-2 text-sm font-medium',
    };

    return (
        <button
            className={`${base} ${variants[variant] || variants.primary} ${className}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}
