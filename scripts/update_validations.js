const fs = require('fs');
const path = require('path');

const formsDir = path.join(__dirname, '../src/pages/Organisation/Forms');
const files = fs.readdirSync(formsDir).filter(f => f.endsWith('.tsx'));

const gstRegex = /<InputField\s+label="GST Number"\s+name="gst_number"\s+register={register}\s+errors={errors}\s*\/>/;
const panRegex = /<InputField\s+label="PAN Number"\s+name="pan_number"\s+register={register}\s+errors={errors}\s*\/>/;
const pinCodeRegex = /<InputField\s+label="PIN Code"\s+name="pin_code"\s+register={register}\s+errors={errors}\s+required\s*\/>/;
const pinCodeRegex2 = /<InputField\s+label="Pincode"\s+name="pin_code"\s+register={register}\s+errors={errors}\s+required\s*\/>/;
const emailRegex = /<InputField\s+label="([^"]+)"\s+name="([^"]*email[^"]*)"\s+(?:type="email"\s+)?register={register}\s+errors={errors}(?:\s+required)?(?:\s+placeholder="[^"]+")?\s*\/>/g;
const phoneRegex = /<InputField\s+label="([^"]+)"\s+name="([^"]*phone[^"]*)"\s+register={register}\s+errors={errors}(?:\s+required)?\s*\/>/g;

for (const file of files) {
    const filePath = path.join(formsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Make sure we only replace if not already replaced
    
    // Email (needs to handle required and placeholder dynamically, better to match by name prop)
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
