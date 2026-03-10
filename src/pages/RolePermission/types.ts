export interface Role {
    id: number;
    name: string;
    description?: string;
    permissions: string[];
    createdAt: string;
}

export const ALL_PERMISSIONS = [
    'VIEW_DASHBOARD',
    'VIEW_APP_USERS',
    'EDIT_APP_USERS',
    'VIEW_BEACONS',
    'EDIT_BEACONS',
    'VIEW_BOOKINGS',
    'EDIT_BOOKINGS',
    'VIEW_DRIVERS',
    'EDIT_DRIVERS',
    'VIEW_EMPLOYEES',
    'EDIT_EMPLOYEES',
    'VIEW_GPS',
    'EDIT_GPS',
    'VIEW_VEHICLES',
    'EDIT_VEHICLES',
    'DELETE_VEHICLES',
];

export const initialRoles: Role[] = [
    {
        id: 1,
        name: 'ADMIN',
        permissions: ALL_PERMISSIONS,
        createdAt: '2024-01-01',
    },
    {
        id: 2,
        name: 'MANAGER',
        permissions: [
            'VIEW_DASHBOARD',
            'VIEW_APP_USERS',
            'VIEW_BEACONS',
            'VIEW_GPS',
            'VIEW_VEHICLES',
        ],
        createdAt: '2024-01-02',
    },
    {
        id: 3,
        name: 'STAFF',
        permissions: ['VIEW_DASHBOARD', 'VIEW_APP_USERS'],
        createdAt: '2024-01-03',
    },
];
