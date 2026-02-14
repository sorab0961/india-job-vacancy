import { useState, useCallback } from 'react';

/**
 * Custom hook for form state management with validation.
 *
 * @param {Object} initialValues - Initial form field values
 * @param {Function} validateFn - (values) => { fieldName: 'error message' }
 * @returns {{ form, errors, handleChange, handleToggle, setForm, setErrors, validate, resetForm }}
 */
export default function useForm(initialValues, validateFn) {
    const [form, setForm] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => {
            if (!prev[name]) return prev;
            const next = { ...prev };
            delete next[name];
            return next;
        });
    }, []);

    const handleToggle = useCallback((name, value) => {
        setForm((prev) => ({ ...prev, [name]: value }));
    }, []);

    const validate = useCallback(() => {
        if (!validateFn) return {};
        const errs = validateFn(form);
        setErrors(errs);
        return errs;
    }, [form, validateFn]);

    const resetForm = useCallback(() => {
        setForm(initialValues);
        setErrors({});
    }, [initialValues]);

    return { form, errors, handleChange, handleToggle, setForm, setErrors, validate, resetForm };
}
