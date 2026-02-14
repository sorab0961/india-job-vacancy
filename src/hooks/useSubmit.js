import { useState, useCallback, useRef } from 'react';

const COOLDOWN_MS = 10_000; // 10 seconds between submissions

/**
 * Custom hook for resume form submission with rate limiting.
 *
 * @param {Function} submitFn - async (formData, file) => { success, message }
 * @param {Function} onSuccess - called after successful submit
 * @returns {{ isSubmitting, submitStatus, submitMessage, handleSubmit }}
 */
export default function useSubmit(submitFn, onSuccess) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'
    const [submitMessage, setSubmitMessage] = useState('');
    const lastSubmitRef = useRef(0);

    const handleSubmit = useCallback(
        async (data, file) => {
            setSubmitStatus(null);
            setSubmitMessage('');

            // Rate limiting
            const now = Date.now();
            if (now - lastSubmitRef.current < COOLDOWN_MS) {
                setSubmitStatus('error');
                setSubmitMessage('Please wait a few seconds before submitting again.');
                return false;
            }

            setIsSubmitting(true);

            try {
                const result = await submitFn(data, file);
                lastSubmitRef.current = Date.now();
                setSubmitStatus('success');
                setSubmitMessage(result.message);
                onSuccess?.();
                return true;
            } catch (err) {
                setSubmitStatus('error');
                setSubmitMessage(err.message || 'Something went wrong. Please try again.');
                return false;
            } finally {
                setIsSubmitting(false);
            }
        },
        [submitFn, onSuccess]
    );

    return { isSubmitting, submitStatus, submitMessage, handleSubmit };
}
