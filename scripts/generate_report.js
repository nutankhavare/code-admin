const fs = require('fs');
const path = require('path');

const srcPagesDir = path.join(__dirname, '../src/pages');
const outputReport = path.join(__dirname, '../report.md');

let report = `# In-Depth Module Analysis Report
This document provides a comprehensive overview of all the modules and features implemented in the application based on the \`src/pages\` directory. 

## Overview
The application is a comprehensive operational dashboard/admin panel. It manages multiple entities such as Users, Staff, Organisations (Offices, Schools, Vendors), Suppliers, Plans, and devices (GPS/Beacons).

---

`;

const pages = fs.readdirSync(srcPagesDir, { withFileTypes: true });

pages.forEach(dirent => {
    if (dirent.isDirectory()) {
        const modulePath = path.join(srcPagesDir, dirent.name);
        report += `## Module: ${dirent.name}\n`;
        
        try {
            const files = fs.readdirSync(modulePath, { recursive: true });
            
            report += `### Files:\n`;
            files.forEach(f => {
                if (typeof f === 'string' && (f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.css'))) {
                   report += `- \`${f}\`\n`;
                }
            });
            report += `\n`;
            
            // Add a brief description based on the module name
            let description = '';
            switch(dirent.name) {
                case 'AppUser':
                    description = 'Manages application users, including viewing the user list, creating new users, editing roles, and managing statuses. It links users to specific organization types (\`orgType\`).';
                    break;
                case 'Auth':
                    description = 'Handles authentication flows such as Login, Registration, and Password Reset interfaces.';
                    break;
                case 'Beacon':
                    description = 'Manages Beacon devices, likely used for proximity tracking or attendance systems within the vehicles or staff.';
                    break;
                case 'Feedback':
                    description = 'Deals with reviewing and resolving feedback or complaints submitted by users/trainees. Includes resolution tracking.';
                    break;
                case 'Gps':
                    description = 'Manages GPS tracking devices attached to vehicles from different suppliers.';
                    break;
                case 'Organisation':
                    description = 'A core multi-step module for onboarding and managing organizations. Supports 4 distinct sub-types: Offices, Institutions/Schools, Motor Driving Schools, and Vendors. Includes distinct validation and creation forms for each.';
                    break;
                case 'Plan':
                    description = 'Subscription or pricing plan management. Includes interfaces (\`AddPlan.tsx\`, \`Plan.tsx\`) to define plan names, pricing strategies, and dynamic lists of features (Basic, Advanced, Premium) with descriptions.';
                    break;
                case 'RolePermission':
                    description = 'Manages system roles, access levels, and specific user permissions.';
                    break;
                case 'Staff':
                    description = 'Manages internal administrative staff and employees. Includes a complex creation form (\`StaffCreate.tsx\`) with image uploads and validation, plus list views (\`Staff.tsx\`).';
                    break;
                case 'Supplier':
                    description = 'Manages third-party suppliers who provide equipment (like devices/GPS). Includes creating suppliers, viewing a supplier index, and managing devices linked to suppliers.';
                    break;
                default:
                    description = `General management features for ${dirent.name}.`;
            }
            report += `### Description:\n${description}\n\n---\n\n`;
            
        } catch (e) {
            console.error(`Error reading ${modulePath}`, e);
        }
    } else if (dirent.isFile() && dirent.name.endsWith('.tsx')) {
         // Standalone files
         report += `## Standalone Page: ${dirent.name.replace('.tsx', '')}\n`;
         let desc = '';
         switch (dirent.name) {
            case 'Dasboard.tsx':
                desc = 'The main landing dashboard displaying key metrics via Stat Cards (e.g., total users, active vehicles, organizations). Features trend indicators and quick links.';
                break;
            case 'Report.tsx':
                desc = 'Generates and displays analytical reports and exports.';
                break;
            case 'BulkCommunication.tsx':
                desc = 'Interface for sending mass notifications, emails, or SMS messages to specific user groups or organizations.';
                break;
            case 'Setting.tsx':
                desc = 'Global application settings and configuration.';
                break;
            case 'TraineeComplaint.tsx':
                desc = 'Specific interface for handling complaints raised by trainees (likely tied to Motor Driving Schools).';
                break;
            case 'VehiclesPage.tsx':
            case 'OrgnizationsPage.tsx':
                desc = 'High-level listing/index pages for these entities (often acts as a simple wrapper or secondary view).';
                break;
            default:
                desc = `Standalone page component for ${dirent.name}.`;
         }
         report += `### Description:\n${desc}\n\n---\n\n`;
    }
});

fs.writeFileSync(outputReport, report, 'utf8');
console.log('Report generated at ' + outputReport);
