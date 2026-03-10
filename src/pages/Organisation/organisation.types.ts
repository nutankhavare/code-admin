export type OrgType =
  | "OFFICE"
  | "INSTITUTION"
  | "MOTOR_DRIVING_SCHOOL"
  | "VENDOR";

export interface Organisation {
  id: number;
  name: string;
  type: OrgType;
  domain: string;
  regNumber: string;
  city: string;
  state: string;
  email?: string;
  phone?: string;
  address?: string;
  createdAt: string;
  status: "Active" | "Inactive";
}

export const initialOrganisations: Organisation[] = [
  {
    id: 1,
    name: "VANLOKA TECHNOLOGIES",
    type: "OFFICE",
    domain: "vanloka.localhost",
    regNumber: "UDYAM-73736637",
    city: "Belagavi",
    state: "Karnataka",
    email: "admin@vanloka.com",
    phone: "+91 9876543210",
    address: "123 Tech Park, Belagavi",
    createdAt: "2024-01-01",
    status: "Active",
  },

  {
    id: 2,
    name: "BELAGAVI PUBLIC SCHOOL",
    type: "INSTITUTION",
    domain: "bps.edu",
    regNumber: "SCH-112233",
    city: "Belagavi",
    state: "Karnataka",
    email: "admin@bps.edu",
    phone: "+91 9876500000",
    address: "School Road, Belagavi",
    createdAt: "2024-02-10",
    status: "Active",
  },

  {
    id: 3,
    name: "DRIVE SAFE ACADEMY",
    type: "MOTOR_DRIVING_SCHOOL",
    domain: "drivesafe.localhost",
    regNumber: "MDS-556677",
    city: "Hubli",
    state: "Karnataka",
    email: "contact@drivesafe.com",
    phone: "+91 9999999999",
    address: "NH Road, Hubli",
    createdAt: "2024-03-05",
    status: "Inactive",
  },

  {
    id: 4,
    name: "RAHUL_ORG",
    type: "OFFICE",
    domain: "rorgs.localhost",
    regNumber: "UDYAM-01010101",
    city: "Belagavi",
    state: "Karnataka",
    email: "rahul@rorgs.com",
    phone: "+91 9123456789",
    address: "MG Road, Belagavi",
    createdAt: "2024-02-10",
    status: "Active",
  },
];
export const ORG_TYPES: OrgType[] = [
  "OFFICE",
  "INSTITUTION",
  "MOTOR_DRIVING_SCHOOL",
  "VENDOR",
];

export const ORG_TYPE_LABELS: Record<OrgType, string> = {
  OFFICE: "Office",
  INSTITUTION: "Institution",
  MOTOR_DRIVING_SCHOOL: "Motor Driving School",
  VENDOR: "Vendor",
};

export interface FormDropdown {
  label: string;
  value: string;
}

export interface StateDistrict {
  state: string;
  district: string;
}

interface BaseOrgData {
  state?: string;
  district?: string;
  city?: string;
  address_line_1?: string;
  address_line_2?: string;
  pin_code?: string;
  landmark?: string;
  
  // Contacts
  primary_person_name?: string;
  primary_person_email?: string;
  primary_person_phone_1?: string;
  primary_person_phone_2?: string;
  
  secondary_person_name?: string;
  secondary_person_email?: string;
  secondary_person_phone_1?: string;
  secondary_person_phone_2?: string;

  // Login
  email?: string;
  password?: string;
  
  // Remarks
  remarks?: string;
  
  // Consent
  consent_timestamp?: string;
}

export interface MotorDrivingSchoolData extends BaseOrgData {
  driving_school_name: string;
  license_number_rto: string;
  license_issue_date: string;
  license_expiry_date: string;
  udyam_msme_registration_no: string;
  registration_type: string;
  registration_number: string;
  registration_date: string;
  pan_number: string;
  gst_number: string;
  driving_school_phone: string;
  driving_school_email: string;
  domain: string;
  subscription_plan?: number;
  
  // File fields
  license_certificate_doc?: File | string;
  gst_certificate_doc?: File | string;
  pan_card_doc?: File | string;
  udyam_msme_certificate_doc?: File | string;
  registration_certificate_doc?: File | string;
  additional_doc?: File | string;
}

export interface OfficeData extends BaseOrgData {
  organisation_name: string;
  organisation_type: string;
  registration_type: string;
  registration_number: string;
  registration_date: string;
  gst_number: string;
  pan_number: string;
  tan_number?: string;
  udyam_msme_registration_no: string;
  organisation_email?: string;
  organisation_phone?: string;
  domain: string;
  subscription_plan?: number;
  number_of_employees?: number;
  number_of_vehicles?: number;
  number_of_travellers?: number;
  number_of_gps?: number;
  number_of_beacons?: number;
  shifts?: number;
  units_branches?: number;
  working_hours?: number;
  working_days?: string[];

  // File fields
  registration_certificate_doc?: File | string;
  gst_certificate_doc?: File | string;
  pan_card_doc?: File | string;
  udyam_msme_certificate_doc?: File | string;
  transport_policy_doc?: File | string;
  safety_sop_doc?: File | string;
  vendor_policy_doc?: File | string;
  driver_vetting_policy_doc?: File | string;
  insurance_certificate_doc?: File | string;
  subscription_agreement_doc?: File | string;
  additional_doc?: File | string;
}

export interface InstitutionData extends BaseOrgData {
  institution_name: string;
  institution_type: string;
  registration_type: string;
  registration_number: string;
  registration_date: string;
  gst_number: string;
  pan_number: string;
  udyam_msme_registration_no: string;
  institution_email?: string;
  institution_phone?: string;
  domain: string;
  subscription_plan?: number;
  number_of_students?: number;
  number_of_staff?: number;
  number_of_vehicles?: number;
  number_of_gps?: number;
  number_of_beacons?: number;
  affiliation_board_university?: string;
  udise_code_college_code?: string;
  number_of_branches?: number;

  // File fields
  registration_certificate_doc?: File | string;
  gst_certificate_doc?: File | string;
  pan_card_doc?: File | string;
  udyam_msme_certificate_doc?: File | string;
  transport_policy_doc?: File | string;
  safety_sop_doc?: File | string;
  vendor_policy_doc?: File | string;
  driver_vetting_policy_doc?: File | string;
  insurance_certificate_doc?: File | string;
  subscription_agreement_doc?: File | string;
  additional_doc?: File | string;
  udise_code_college_code_doc?: File | string;
}

export interface VendorData extends BaseOrgData {
  organisation_name: string;
  vendor_type: string;
  contact_mobile: string;
  organisation_email?: string;
  emergency_contact_name: string;
  emergency_contact_number: string;
  village?: string;
  pincode: string;
  gst_number: string;
  pan_number: string;
  aadhaar_number?: string;
  msme_number?: string;
  bank_account_number: string;
  bank_ifsc: string;
  account_holder_name: string;
  contract_start_date: string;
  contract_end_date: string;
  insurance_coverage: string;
  vehicle_count: number;
  vehicle_numbers: string;
  vehicle_types: string;
  vendor_notes?: string;
  consent?: boolean;
}

export interface OnboardingData {
  type: string;
  [key: string]: any;
}
