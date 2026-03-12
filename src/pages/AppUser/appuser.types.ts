export type UserStatus = 'Active' | 'Inactive' | 'Blocked';
export type UserDevice = 'Android' | 'iOS';

export interface AppUser {
    id: number;
    name: string;
    email: string;
    phone: string;
    organisation: string;
    orgType: "Office" | "Institute" | "Motor Driving School";
    joinedDate: string;
    lastActive: string;
    device: UserDevice;
    status: UserStatus;
}

const names = ['Rahul Sharma', 'Priya Mehta', 'Amit Kumar', 'Sunita Patel', 'Vijay Singh'];
const orgs = ['TechCorp', 'InfoSys', 'Wipro', 'HCL', 'TCS'];
const statuses: UserStatus[] = ['Active', 'Active', 'Inactive', 'Active', 'Blocked'];
const devices: UserDevice[] = ['Android', 'iOS'];
const orgTypes: AppUser["orgType"][] = ["Office", "Institute", "Motor Driving School"];

export const initialUsers: AppUser[] = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: names[i % names.length],
    email: `user${i + 1}@example.com`,
    phone: `+91 ${9800000000 + i}`,
    organisation: orgs[i % orgs.length],
    orgType: orgTypes[i % orgTypes.length],
    joinedDate: new Date(2024, i % 12, (i % 28) + 1).toLocaleDateString('en-IN'),
    lastActive: `${(i % 59) + 1} min ago`,
    device: devices[i % devices.length],
    status: statuses[i % statuses.length],
}));