import DetailItem from "../../../Components/UI/DetailItem";
import { SectionHeader } from "../../../Components/UI/SectionHeader";
import { formatDate } from "../../../Utils/Toolkit";
import type { InstitutionData, MotorDrivingSchoolData, OfficeData, OnboardingData } from "../organisation.types";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaUserTie,
  FaCogs,
  FaCalendarAlt,
  FaInfoCircle,
} from "react-icons/fa";

interface OrgInfoTabProps {
  entity: OnboardingData;
  typeFromUrl: 'office' | 'institution' | 'motor_driving_school' | null;
}



// Entity Type Badge Component
const EntityTypeBadge = ({ type }: { type: string }) => {
  const getTypeConfig = () => {
    switch (type) {
      case 'office':
        return { label: 'Office', color: 'bg-blue-100 text-blue-800 border-blue-200' };
      case 'institution':
        return { label: 'Institution', color: 'bg-amber-100 text-amber-800 border-amber-200' };
      case 'motor_driving_school':
        return { label: 'Motor Driving School', color: 'bg-orange-100 text-orange-800 border-orange-200' };
      default:
        return { label: type, color: 'bg-gray-100 text-gray-800 border-gray-200' };
    }
  };

  const config = getTypeConfig();

  return (
    <span className={`inline-flex items-center gap-1 p-1 rounded-lg text-sm font-bold uppercase border-2 ${config.color}`}>
      <FaBuilding size={15} />
      {config.label}
    </span>
  );
};

// Status Badge Component
const StatusBadge = ({ status }: { status?: string }) => {
  const isActive = status === 'active' || !status;
  return (
    <span className={`inline-flex items-center gap-1 p-1 rounded-lg text-sm font-bold uppercase border-2 ${isActive
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-red-100 text-red-800 border-red-200'
      }`}>
      <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></span>
      {isActive ? 'Active' : 'Inactive'}
    </span>
  );
};

const OrgInfoTab = ({ entity }: OrgInfoTabProps) => {
  return (
    <div className="space-y-4 mt-2 pb-10">
      {/* Header Card with Entity Type and Status */}
      <div className="bg-gray-50 rounded-md p-2 border border-gray-100 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white rounded-md shadow-md">
              <FaBuilding className="text-blue-700" size={20} />
            </div>
            <div>
              <h1 className="text-sm uppercase font-bold text-gray-900">
                {entity.type === 'office' && (entity as OfficeData).organisation_name}
                {entity.type === 'institution' && (entity as InstitutionData).institution_name}
                {entity.type === 'motor_driving_school' && (entity as MotorDrivingSchoolData).driving_school_name}
              </h1>

            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <EntityTypeBadge type={entity.type} />
            <StatusBadge status={entity.status} />
          </div>
        </div>
      </div>

      <div className="overflow-y-auto h-[78vh] space-y-2 border border-gray-200 rounded-lg p-4">
        {/* Basic Information Section */}
        <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <SectionHeader
            icon={<FaInfoCircle size={20} />}
            title="Basic Information"
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6">
            {entity.type === 'office' && (
              <>
                <DetailItem label="Organisation Name" value={(entity as OfficeData).organisation_name} />
                <DetailItem label="Organisation Type" value={(entity as OfficeData).organisation_type} />
                <DetailItem label="Registration Type" value={(entity as OfficeData).registration_type} />
                <DetailItem label="Registration Number" value={(entity as OfficeData).registration_number} />
                <DetailItem label="Registration Date" value={formatDate((entity as OfficeData).registration_date)} />
                <DetailItem label="GST Number" value={(entity as OfficeData).gst_number} />
                <DetailItem label="PAN Number" value={(entity as OfficeData).pan_number} />
                <DetailItem label="Tan Number" value={(entity as OfficeData).tan_number} />
                <DetailItem label="UDYAM / MSME No." value={(entity as OfficeData).udyam_msme_registration_no} />
                <DetailItem label="Email" value={(entity as OfficeData).organisation_email} />
                <DetailItem label="Phone" value={(entity as OfficeData).organisation_phone} />
              </>
            )}

            {entity.type === 'institution' && (
              <>
                <DetailItem label="Institution Name" value={(entity as InstitutionData).institution_name} />
                <DetailItem label="Institution Type" value={(entity as InstitutionData).institution_type} />
                <DetailItem label="Affiliation Board" value={(entity as InstitutionData).affiliation_board_university} />
                <DetailItem label="Registration Type" value={(entity as InstitutionData).registration_type} />
                <DetailItem label="Registration Number" value={(entity as InstitutionData).registration_number} />
                <DetailItem label="Registration Date" value={formatDate((entity as InstitutionData).registration_date)} />
                <DetailItem label="UDISE / College Code" value={(entity as InstitutionData).udise_code_college_code} />
                <DetailItem label="GST Number" value={(entity as InstitutionData).gst_number} />
                <DetailItem label="PAN Number" value={(entity as InstitutionData).pan_number} />
              </>
            )}

            {entity.type === 'motor_driving_school' && (
              <>
                <DetailItem label="Driving School Name" value={(entity as MotorDrivingSchoolData).driving_school_name} />
                <DetailItem label="License Number (RTO)" value={(entity as MotorDrivingSchoolData).license_number_rto} />
                <DetailItem label="License Issue Date" value={formatDate((entity as MotorDrivingSchoolData).license_issue_date)} />
                <DetailItem label="License Expiry Date" value={formatDate((entity as MotorDrivingSchoolData).license_expiry_date)} />
                <DetailItem label="Registration Type" value={(entity as MotorDrivingSchoolData).registration_type} />
                <DetailItem label="Registration Number" value={(entity as MotorDrivingSchoolData).registration_number} />
                <DetailItem label="Registration Date" value={formatDate((entity as MotorDrivingSchoolData).registration_date)} />
                <DetailItem label="PAN Number" value={(entity as MotorDrivingSchoolData).pan_number} />
                <DetailItem label="GST Number" value={(entity as MotorDrivingSchoolData).gst_number} />
                <DetailItem label="Driving School Email" value={(entity as MotorDrivingSchoolData).driving_school_email} />
                <DetailItem label="Driving School Phone" value={(entity as MotorDrivingSchoolData).driving_school_phone} />
                <DetailItem label="UDYAM / MSME No." value={(entity as MotorDrivingSchoolData).udyam_msme_registration_no} />
              </>
            )}

            <DetailItem label="Tenant ID" value={entity.tenant_id} />
            <DetailItem
              label="Domain"
              value={
                <a
                  href={`http://${entity.domain}.localhost`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline font-semibold"
                >
                  {entity.domain}.localhost
                </a>
              }
            />
            <DetailItem
              label="Onboarded on"
              value={
                <span className="flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-400" size={14} />
                  {formatDate(entity.created_at)}
                </span>
              }
            />

          </div>
        </div>

        {/* Operational Details Section */}
        <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <SectionHeader
            icon={<FaCogs size={20} />}
            title="Operational Details"
          />

          <div className="grid grid-cols-2 lg:grid-cols-7 md:grid-cols-3 gap-6">
            {entity.type === 'office' && (
              <>
                <div className="bg-linear-to-br from-blue-50 to-blue-100 p-4 rounded-lg border-2 border-blue-200">
                  <p className="text-xs text-blue-600 uppercase font-semibold mb-1">Employees</p>
                  <p className="text-2xl font-bold text-blue-900">{(entity as OfficeData).number_of_employees || 0}</p>
                </div>
                <div className="bg-linear-to-br from-green-50 to-green-100 p-4 rounded-lg border-2 border-green-200">
                  <p className="text-xs text-green-600 uppercase font-semibold mb-1">Vehicles</p>
                  <p className="text-2xl font-bold text-green-900">{(entity as OfficeData).number_of_vehicles || 0}</p>
                </div>
                {/* <div className="bg-linear-to-br from-purple-50 to-purple-100 p-4 rounded-lg border-2 border-purple-200">
                  <p className="text-xs text-purple-600 uppercase font-semibold mb-1">Travellers</p>
                  <p className="text-2xl font-bold text-purple-900">{(entity as OfficeData).number_of_travellers || 0}</p>
                </div> */}
                <div className="bg-linear-to-br from-orange-50 to-orange-100 p-4 rounded-lg border-2 border-orange-200">
                  <p className="text-xs text-orange-600 uppercase font-semibold mb-1">GPS Devices</p>
                  <p className="text-2xl font-bold text-orange-900">{(entity as OfficeData).number_of_gps || 0}</p>
                </div>
                <div className="bg-linear-to-br from-pink-50 to-pink-100 p-4 rounded-lg border-2 border-pink-200">
                  <p className="text-xs text-pink-600 uppercase font-semibold mb-1">Beacons</p>
                  <p className="text-2xl font-bold text-pink-900">{(entity as OfficeData).number_of_beacons || 0}</p>
                </div>

                <div className="col-span-2 bg-linear-to-br from-purple-50 to-purple-100 p-4 rounded-lg border-2 border-purple-200">
                  <p className="text-xs text-purple-600 uppercase font-semibold mb-2">Working Days</p>
                  {Array.isArray((entity as OfficeData).working_days) && (entity as OfficeData).working_days.length > 0 ? (
                    <p className="text-sm font-bold text-purple-900">
                      {(entity as OfficeData).working_days.join(', ')}
                    </p>
                  ) : (
                    <p className="text-sm text-purple-400 italic">No working days configured</p>
                  )}
                </div>


                <div className="bg-linear-to-br from-red-50 to-red-100 p-4 rounded-lg border-2 border-red-200">
                  <p className="text-xs text-red-600 uppercase font-semibold mb-1">Woeking Hours</p>
                  <p className="text-2xl font-bold text-red-900">{(entity as OfficeData).working_hours || 0}</p>
                </div>
              </>
            )}

            {entity.type === 'institution' && (
              <>
                <div className="bg-linear-to-br from-blue-50 to-blue-100 p-4 rounded-lg border-2 border-blue-200">
                  <p className="text-xs text-blue-600 uppercase font-semibold mb-1">Students</p>
                  <p className="text-2xl font-bold text-blue-900">{(entity as InstitutionData).number_of_students || 0}</p>
                </div>
                <div className="bg-linear-to-br from-green-50 to-green-100 p-4 rounded-lg border-2 border-green-200">
                  <p className="text-xs text-green-600 uppercase font-semibold mb-1">Staff</p>
                  <p className="text-2xl font-bold text-green-900">{(entity as InstitutionData).number_of_staff || 0}</p>
                </div>
                <div className="bg-linear-to-br from-purple-50 to-purple-100 p-4 rounded-lg border-2 border-purple-200">
                  <p className="text-xs text-purple-600 uppercase font-semibold mb-1">Vehicles</p>
                  <p className="text-2xl font-bold text-purple-900">{(entity as InstitutionData).number_of_vehicles || 0}</p>
                </div>
                <div className="bg-linear-to-br from-orange-50 to-orange-100 p-4 rounded-lg border-2 border-orange-200">
                  <p className="text-xs text-orange-600 uppercase font-semibold mb-1">GPS</p>
                  <p className="text-2xl font-bold text-orange-900">{(entity as InstitutionData).number_of_gps || 0}</p>
                </div>
                <div className="bg-linear-to-br from-pink-50 to-pink-100 p-4 rounded-lg border-2 border-pink-200">
                  <p className="text-xs text-pink-600 uppercase font-semibold mb-1">Beacons</p>
                  <p className="text-2xl font-bold text-pink-900">{(entity as InstitutionData).number_of_beacons || 0}</p>
                </div>
              </>
            )}

            {entity.type === 'motor_driving_school' && (
              <>
                <div className="bg-linear-to-br from-blue-50 to-blue-100 p-4 rounded-lg border-2 border-blue-200">
                  <p className="text-xs text-blue-600 uppercase font-semibold mb-1">Vehicles</p>
                  <p className="text-2xl font-bold text-blue-900">{(entity as MotorDrivingSchoolData).number_of_vehicles || 0}</p>
                </div>
                <div className="bg-linear-to-br from-green-50 to-green-100 p-4 rounded-lg border-2 border-green-200">
                  <p className="text-xs text-green-600 uppercase font-semibold mb-1">Trainers</p>
                  <p className="text-2xl font-bold text-green-900">{(entity as MotorDrivingSchoolData).number_of_trainers || 0}</p>
                </div>
                <div className="bg-linear-to-br from-purple-50 to-purple-100 p-4 rounded-lg border-2 border-purple-200">
                  <p className="text-xs text-purple-600 uppercase font-semibold mb-1">Students</p>
                  <p className="text-2xl font-bold text-purple-900">{(entity as MotorDrivingSchoolData).number_of_students || 0}</p>
                </div>
                <div className="bg-linear-to-br from-orange-50 to-orange-100 p-4 rounded-lg border-2 border-orange-200">
                  <p className="text-xs text-orange-600 uppercase font-semibold mb-1">GPS</p>
                  <p className="text-2xl font-bold text-orange-900">{(entity as MotorDrivingSchoolData).number_of_gps || 0}</p>
                </div>
                <div className="bg-linear-to-br from-pink-50 to-pink-100 p-4 rounded-lg border-2 border-pink-200">
                  <p className="text-xs text-pink-600 uppercase font-semibold mb-1">Beacons</p>
                  <p className="text-2xl font-bold text-pink-900">{(entity as MotorDrivingSchoolData).number_of_beacons || 0}</p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Address Details Section */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <SectionHeader
              icon={<FaMapMarkerAlt size={20} />}
              title="Address Details"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-6">
              <div className="">
                <DetailItem label="Address Line 1" value={entity.address_line_1} />
              </div>
              <DetailItem label="Address Line 2" value={entity.address_line_2} />
              <DetailItem label="Landmark" value={entity.landmark} />
              <DetailItem label="City" value={entity.city} />
              <DetailItem label="District" value={entity.district} />
              <DetailItem label="State" value={entity.state} />
              <DetailItem label="PIN Code" value={entity.pin_code} />
            </div>
          </div>

          {/* Contact Persons Section */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <SectionHeader
              icon={<FaUserTie size={20} />}
              title="Contact Persons"
            />

            {/* Primary Contact */}
            <div className="p-4">
              <h3 className="text-sm font-bold text-blue-700 uppercase mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Primary
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4">
                <DetailItem label="Name" value={entity.primary_person_name} />
                <DetailItem label="Email" value={entity.primary_person_email} />
                <DetailItem label="Primary Number" value={entity.primary_person_phone_1} />
                <DetailItem label="Secondary Number" value={entity.primary_person_phone_2} />
              </div>
            </div>

            {/* Secondary Contact */}
            <div className="p-4 ">
              <h3 className="text-sm font-bold text-blue-700 uppercase mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Secondary
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4">
                <DetailItem label="Name" value={entity.secondary_person_name} />
                <DetailItem label="Email" value={entity.secondary_person_email} />
                <DetailItem label="Primary Number" value={entity.secondary_person_phone_1} />
                <DetailItem label="Secondary Number" value={entity.secondary_person_phone_2} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgInfoTab;
