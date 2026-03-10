import os
import re

files = [
    'src/pages/Organisation/Forms/InstitutionCreateForm.tsx',
    'src/pages/Organisation/Forms/MotorDrivingSchoolCreateForm.tsx',
    'src/pages/Organisation/Forms/VendorCreateForm.tsx'
]

for f in files:
    if not os.path.exists(f): continue
    with open(f, 'r', encoding='utf-8') as file:
        c = file.read()
    
    repls = {
        'rp-form-card rp-form-wide': 'form-card',
        'className="rp-section"': 'className="form-section"',
        'className="rp-section-body"': 'className="form-section-body"',
        'className="rp-grid-3"': 'className="form-grid"',
        'className="rp-grid-2"': 'className="form-grid"',
        'className="rp-section-title"': 'className="form-section-header"',
        'className="rp-section-icon"': 'className="form-section-icon"',
        'className="rp-info-banner"': 'className="form-info-banner"',
        'className="rp-info-icon"': 'className="form-info-icon"',
        'className="rp-info-text"': 'className="form-info-text"'
    }
    
    for old, new in repls.items():
        c = c.replace(old, new)
        
    # Fix the inner HTML of form-section-header to match the Plan layout
    def repl_header(match):
        icon = match.group(1)
        text = match.group(2).strip()
        return f'<div className="form-section-header">\n          <{icon} className="form-section-icon" />\n          <h4 className="form-section-title">{text}</h4>\n        </div>'
        
    c = re.sub(r'<div className="form-section-header">\s*<([A-Za-z0-9_]+)\s+className="form-section-icon"[^>]*/>\s*(.*?)\s*</div>', repl_header, c)
        
    with open(f, 'w', encoding='utf-8') as file:
        file.write(c)

print("Replacement complete.")
