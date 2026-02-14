import { useState, useCallback, useRef } from 'react';
import Input from './ui/Input';
import Select from './ui/Select';
import Toggle from './ui/Toggle';
import Button from './ui/Button';
import Card from './ui/Card';
import Badge from './ui/Badge';
import Spinner from './ui/Spinner';
import Alert from './ui/Alert';
import useForm from '../hooks/useForm';
import useSubmit from '../hooks/useSubmit';
import { submitResume } from '../services/api';

const INITIAL_FORM = {
    fullName: '',
    mobile: '',
    email: '',
    city: '',
    jobRole: '',
    experience: '',
    salary: '',
    relocate: false,
};

const experienceOptions = [
    { value: '', label: 'Select Experience' },
    { value: 'fresher', label: 'Fresher (0 years)' },
    { value: '1-2', label: '1–2 years' },
    { value: '3-5', label: '3–5 years' },
    { value: '5-10', label: '5–10 years' },
    { value: '10+', label: '10+ years' },
];

function validateForm(form, resume) {
    const errors = {};
    if (!form.fullName.trim()) errors.fullName = 'Full name is required';
    else if (form.fullName.trim().length < 2) errors.fullName = 'Name is too short';
    if (!form.mobile.trim()) errors.mobile = 'Mobile number is required';
    else if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) errors.mobile = 'Enter a valid 10-digit Indian mobile number';
    if (!form.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Enter a valid email address';
    if (!form.city.trim()) errors.city = 'Current city is required';
    if (!form.jobRole.trim()) errors.jobRole = 'Preferred job role is required';
    if (!form.experience) errors.experience = 'Select your experience level';
    if (!resume) errors.resume = 'Please upload your resume (PDF)';
    else {
        if (resume.type !== 'application/pdf') errors.resume = 'Only PDF files are accepted';
        else if (resume.size > 2 * 1024 * 1024) errors.resume = 'File size must be under 2MB';
    }
    return errors;
}

export default function ResumeForm({ isDark }) {
    const [resume, setResume] = useState(null);
    const [fileErrors, setFileErrors] = useState('');
    const fileInputRef = useRef(null);

    const { form, errors, handleChange, handleToggle, setErrors, resetForm } = useForm(INITIAL_FORM);

    const clearAll = useCallback(() => {
        resetForm();
        setResume(null);
        setFileErrors('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    }, [resetForm]);

    const { isSubmitting, submitStatus, submitMessage, handleSubmit } = useSubmit(
        (data, file) => submitResume(data, file),
        clearAll
    );

    const handleFileChange = useCallback((e) => {
        const file = e.target.files?.[0] || null;
        setFileErrors('');
        if (file) {
            if (file.type !== 'application/pdf') { setFileErrors('Only PDF files are accepted'); setResume(null); return; }
            if (file.size > 2 * 1024 * 1024) { setFileErrors('File size must be under 2MB'); setResume(null); return; }
        }
        setResume(file);
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm(form, resume);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            if (validationErrors.resume) setFileErrors(validationErrors.resume);
            return;
        }
        const data = {
            fullName: form.fullName.trim(),
            mobile: form.mobile.trim(),
            email: form.email.trim(),
            city: form.city.trim(),
            jobRole: form.jobRole.trim(),
            experience: form.experience,
            expectedSalary: form.salary.trim(),
            willingToRelocate: form.relocate ? 'Yes' : 'No',
        };
        await handleSubmit(data, resume);
    };

    return (
        <section id="submit-resume" className={`relative py-24 transition-colors duration-300 ${isDark
            ? 'bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950'
            : 'bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50'
            }`}>
            <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent ${isDark ? 'via-saffron/30' : 'via-saffron/20'
                }`} />

            <div className="absolute top-1/2 left-0 w-72 h-72 bg-saffron/3 rounded-full blur-3xl -translate-y-1/2" />
            <div className="absolute top-1/3 right-0 w-80 h-80 bg-india-green/3 rounded-full blur-3xl" />

            <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <Badge variant="saffron" className="mb-4">📄 Resume Submission</Badge>
                    <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Submit Your <span className="text-saffron">Resume</span>
                    </h2>
                    <p className={`max-w-xl mx-auto ${isDark ? 'text-navy-300' : 'text-slate-600'}`}>
                        Fill out the form below and upload your resume. Our team will connect you with matching recruiters.
                    </p>
                </div>

                <Card hover={false} isDark={isDark} className={`!p-8 sm:!p-10 ${isDark ? '!bg-navy-800/30 !border-navy-700/30' : '!bg-white/90 !border-slate-200 !shadow-lg'
                    }`}>
                    <form onSubmit={onSubmit} noValidate>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <Input label="Full Name" id="fullName" name="fullName" placeholder="e.g. Rahul Sharma" value={form.fullName} onChange={handleChange} error={errors.fullName} isDark={isDark} required />
                            <Input label="Mobile Number" id="mobile" name="mobile" type="tel" placeholder="e.g. 9876543210" value={form.mobile} onChange={handleChange} error={errors.mobile} maxLength={10} isDark={isDark} required />
                            <Input label="Email Address" id="email" name="email" type="email" placeholder="e.g. rahul@email.com" value={form.email} onChange={handleChange} error={errors.email} isDark={isDark} required />
                            <Input label="Current City" id="city" name="city" placeholder="e.g. Mumbai" value={form.city} onChange={handleChange} error={errors.city} isDark={isDark} required />
                            <Input label="Preferred Job Role" id="jobRole" name="jobRole" placeholder="e.g. Software Engineer" value={form.jobRole} onChange={handleChange} error={errors.jobRole} isDark={isDark} required />
                            <Select label="Experience" id="experience" name="experience" value={form.experience} onChange={handleChange} error={errors.experience} isDark={isDark} required>
                                {experienceOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value} disabled={!opt.value} className={isDark ? 'bg-navy-800 text-white' : 'bg-white text-slate-900'}>
                                        {opt.label}
                                    </option>
                                ))}
                            </Select>
                            <Input label="Expected Salary (per month)" id="salary" name="salary" placeholder="e.g. ₹30,000" value={form.salary} onChange={handleChange} isDark={isDark} />
                            <div className="flex items-end">
                                <Toggle label="Willing to Relocate" id="relocate" checked={form.relocate} onChange={(val) => handleToggle('relocate', val)} isDark={isDark} />
                            </div>
                        </div>

                        {/* File Upload */}
                        <div className="mt-6">
                            <label className={`text-sm font-medium block mb-2 ${isDark ? 'text-navy-200' : 'text-slate-700'}`}>
                                Upload Resume <span className="text-saffron">*</span>
                                <span className={`font-normal ml-2 ${isDark ? 'text-navy-500' : 'text-slate-400'}`}>(PDF only, max 2MB)</span>
                            </label>
                            <input
                                type="file"
                                id="resume-upload"
                                ref={fileInputRef}
                                accept=".pdf,application/pdf"
                                onChange={handleFileChange}
                                className={`block w-full text-sm file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:cursor-pointer file:transition-colors cursor-pointer border rounded-xl transition-colors ${isDark
                                    ? 'text-navy-300 file:bg-saffron/10 file:text-saffron hover:file:bg-saffron/20 border-navy-600 bg-navy-800/60 hover:border-navy-400'
                                    : 'text-slate-500 file:bg-saffron/10 file:text-saffron hover:file:bg-saffron/20 border-slate-300 bg-slate-50 hover:border-slate-400'
                                    }`}
                            />

                            {/* File preview */}
                            {resume && !fileErrors && (
                                <div className={`mt-3 flex items-center gap-3 p-3 border rounded-xl ${isDark ? 'bg-navy-800/40 border-navy-700/40' : 'bg-slate-50 border-slate-200'
                                    }`}>
                                    <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center shrink-0">
                                        <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>{resume.name}</p>
                                        <p className={`text-xs ${isDark ? 'text-navy-400' : 'text-slate-500'}`}>
                                            {(resume.size / 1024).toFixed(0)} KB • PDF Document
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => { setResume(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                                        className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-navy-700 text-navy-400 hover:text-red-400' : 'hover:bg-slate-200 text-slate-400 hover:text-red-500'}`}
                                        aria-label="Remove file"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                            {fileErrors && <p className="text-xs text-red-400 mt-1">{fileErrors}</p>}
                        </div>

                        {submitStatus === 'success' && (<div className="mt-6"><Alert variant="success" isDark={isDark}>{submitMessage}</Alert></div>)}
                        {submitStatus === 'error' && (<div className="mt-6"><Alert variant="error" isDark={isDark}>{submitMessage}</Alert></div>)}

                        <div className="mt-8">
                            <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full !py-4 !text-lg !rounded-2xl">
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center gap-3"><Spinner size="sm" />Submitting...</span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        Submit Resume
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </span>
                                )}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </section>
    );
}
