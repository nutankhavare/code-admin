import * as fs from 'fs';
import * as path from 'path';

// Fix for ES Modules
const __dirname = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([a-zA-Z]:\/)/, '$1');

const formsDir = path.join(__dirname, '../src/pages/Organisation/Forms');
const files = fs.readdirSync(formsDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
    const filePath = path.join(formsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Email
    content = content.replace(/name="([^"]*email[^"]*)"(.*?)errors={errors}(.*?)\/>/gs, (match, name, before, after) => {
        if (match.includes('validation=')) return match;
        return `name="${name}"${before}errors={errors}${after.replace('/>', '')} validation={{ pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/, message: 'Invalid email address' } }}\n                        />`;
    });

    // Phone
    content = content.replace(/name="([^"]*phone[^"]*)"(.*?)errors={errors}(.*?)\/>/gs, (match, name, before, after) => {
        if (match.includes('validation=')) return match;
        return `name="${name}"${before}errors={errors}${after.replace('/>', '')} validation={{ pattern: { value: /^[0-9]{10}$/, message: 'Must be exactly 10 digits' } }}\n                        />`;
    });

    // GST
    content = content.replace(/name="gst_number"(.*?)errors={errors}(.*?)\/>/gs, (match, before, after) => {
        if (match.includes('validation=')) return match;
        return `name="gst_number"${before}errors={errors}${after.replace('/>', '')} validation={{ pattern: { value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, message: 'Invalid GST format' } }}\n                        />`;
    });

    // PAN
    content = content.replace(/name="pan_number"(.*?)errors={errors}(.*?)\/>/gs, (match, before, after) => {
        if (match.includes('validation=')) return match;
        return `name="pan_number"${before}errors={errors}${after.replace('/>', '')} validation={{ pattern: { value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, message: 'Invalid PAN format' } }}\n                        />`;
    });

    // PIN Code
    content = content.replace(/name="pin_code"(.*?)errors={errors}(.*?)\/>/gs, (match, before, after) => {
        if (match.includes('validation=')) return match;
        return `name="pin_code"${before}errors={errors}${after.replace('/>', '')} validation={{ pattern: { value: /^[0-9]{6}$/, message: 'Must be exactly 6 digits' } }}\n                        />`;
    });

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
}
