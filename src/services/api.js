/**
 * API service layer for IndiaJobConnect.
 * All external API calls go through this module.
 */

const API_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';

/**
 * Submit candidate data + resume to Google Apps Script web app.
 *
 * @param {Object} data - Candidate form fields
 * @param {File|null} resumeFile - PDF file to upload
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function submitResume(data, resumeFile) {
    if (!API_URL) {
        throw new Error(
            'Google Apps Script URL is not configured. Set VITE_GOOGLE_SCRIPT_URL in your .env file.'
        );
    }

    // Use FormData — browsers send it as multipart/form-data without an explicit
    // Content-Type header, which avoids triggering a CORS preflight OPTIONS request
    // that Google Apps Script cannot handle.
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        formData.append(key, String(value));
    });

    formData.append('submittedAt', new Date().toISOString());

    // Convert PDF to base64 so Apps Script can decode it server-side
    if (resumeFile) {
        const base64 = await fileToBase64(resumeFile);
        formData.append('resume', base64);
        formData.append('resumeName', resumeFile.name);
    }

    const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
        redirect: 'follow',
    });

    if (!response.ok) {
        throw new Error(`Server returned ${response.status}. Please try again.`);
    }

    let result;
    try {
        result = await response.json();
    } catch {
        throw new Error('Invalid response from server.');
    }

    if (result.status === 'error') {
        throw new Error(result.message || 'Submission failed.');
    }

    return { success: true, message: result.message || 'Resume submitted successfully!' };
}

/**
 * Convert a File to a base64 string (without the data-URL prefix).
 */
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            // reader.result = "data:application/pdf;base64,XXXXX..."
            const base64 = reader.result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = () => reject(new Error('Failed to read file.'));
        reader.readAsDataURL(file);
    });
}

/**
 * Health-check the API endpoint.
 * @returns {Promise<boolean>}
 */
export async function checkApiHealth() {
    if (!API_URL) return false;
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        return data.status === 'ok';
    } catch {
        return false;
    }
}
