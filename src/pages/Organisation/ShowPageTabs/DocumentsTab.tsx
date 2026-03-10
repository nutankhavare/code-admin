// src/components/Organisation/tabs/DocumentsTab.tsx
import type { InstitutionData, MotorDrivingSchoolData, OfficeData, OnboardingData } from "../organisation.types";
import { FaFilePdf, FaFileImage, FaExternalLinkAlt, FaEye, FaIdCard } from "react-icons/fa";
import { BsFileEarmarkTextFill } from "react-icons/bs";
import EmptyState from "../../../Components/UI/EmptyState";
import { asset } from '../../../Services/apiservice';

interface DocumentsTabProps {
    entity: OnboardingData;
}

// Helper to determine file type and render preview
const DocumentCard = ({ label, path }: { label: string; path: string }) => {
    // Construct full URL (assuming path is relative from backend storage)
    const fileUrl = `${asset}${path}`;

    // Check extension
    const extension = path.split('.').pop()?.toLowerCase();
    const isImage = ['jpg', 'jpeg', 'png', 'webp'].includes(extension || '');
    const isPdf = extension === 'pdf';

    return (
        <div className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col h-full">
            {/* Preview Area (Fixed Aspect Ratio 3:4 for document look) */}
            <div className="relative aspect-3/4 bg-slate-50 border-b border-slate-100 flex items-center justify-center overflow-hidden">
                {isImage ? (
                    <img
                        src={fileUrl}
                        alt={label}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center text-slate-300 group-hover:text-purple-500 transition-colors">
                        {isPdf ? (
                            <FaFilePdf size={48} />
                        ) : (
                            <BsFileEarmarkTextFill size={48} />
                        )}
                        <span className="text-xs font-bold mt-2 uppercase tracking-wide text-slate-400">
                            {extension || 'FILE'}
                        </span>
                    </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                    <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white text-slate-900 rounded-full hover:bg-purple-600 hover:text-white transition-all transform hover:scale-110 shadow-lg"
                        title="View Document"
                    >
                        <FaEye size={16} />
                    </a>
                </div>
            </div>

            {/* Footer Label */}
            <div className="p-3 bg-white flex  justify-between flex-1">
                <h4 className="text-xs font-bold text-slate-700 uppercase leading-snug line-clamp-2" title={label}>
                    {label}
                </h4><a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 uppercase"
                >
                    <FaExternalLinkAlt size={13} />
                </a>

            </div>
        </div>
    );
};

const DocumentsTab = ({ entity }: DocumentsTabProps) => {

    // Helper to extract relevant docs based on type
    const getDocuments = () => {
        const docs: { label: string; path: FileList }[] = [];

        if (entity.type === 'office') {
            const d = entity as OfficeData;
            if (d.pan_card_doc) docs.push({ label: "PAN Card", path: d.pan_card_doc });
            if (d.gst_certificate_doc) docs.push({ label: "GST Certificate", path: d.gst_certificate_doc });
            if (d.registration_certificate_doc) docs.push({ label: "Registration Cert.", path: d.registration_certificate_doc });
            if (d.udyam_msme_certificate_doc) docs.push({ label: "UDYAM / MSME Cert.", path: d.udyam_msme_certificate_doc });
            if (d.safety_sop_doc) docs.push({ label: "Safety SOP", path: d.safety_sop_doc });
            if (d.transport_policy_doc) docs.push({ label: "Transport Policy", path: d.transport_policy_doc });
            if (d.insurance_certificate_doc) docs.push({ label: "Insurance Cert.", path: d.insurance_certificate_doc });
            if (d.driver_vetting_policy_doc) docs.push({ label: "Driver Vetting Policy", path: d.driver_vetting_policy_doc });
            if (d.subscription_agreement_doc) docs.push({ label: "Subscription Agreement", path: d.subscription_agreement_doc });
        }
        else if (entity.type === 'institution') {
            const d = entity as InstitutionData;
            if (d.pan_card_doc) docs.push({ label: "PAN Card", path: d.pan_card_doc });
            if (d.registration_certificate_doc) docs.push({ label: "Registration Cert.", path: d.registration_certificate_doc });
            if (d.udise_college_code_proof_doc) docs.push({ label: "UDISE / Code Proof", path: d.udise_college_code_proof_doc });
            if (d.safety_sop_doc) docs.push({ label: "Safety SOP", path: d.safety_sop_doc });
            if (d.transport_policy_doc) docs.push({ label: "Transport Policy", path: d.transport_policy_doc });
            if (d.insurance_certificate_doc) docs.push({ label: "Insurance Cert.", path: d.insurance_certificate_doc });
            if (d.driver_vetting_policy_doc) docs.push({ label: "Driver Vetting Policy", path: d.driver_vetting_policy_doc });
            if (d.subscription_agreement_doc) docs.push({ label: "Subscription Agreement", path: d.subscription_agreement_doc });
            if (d.additional_doc) docs.push({ label: "Consent Declaration", path: d.additional_doc });
        }
        else if (entity.type === 'motor_driving_school') {
            const d = entity as MotorDrivingSchoolData;
            if (d.rto_license_copy_doc) docs.push({ label: "RTO License Copy", path: d.rto_license_copy_doc });
            if (d.pan_card_doc) docs.push({ label: "PAN Card", path: d.pan_card_doc });
            if (d.registration_certificate_doc) docs.push({ label: "Registration Cert.", path: d.registration_certificate_doc });
            if (d.safety_sop_doc) docs.push({ label: "Safety SOP", path: d.safety_sop_doc });
            if (d.instructor_policy_doc) docs.push({ label: "Instructor Policy", path: d.instructor_policy_doc });
            if (d.subscription_agreement_doc) docs.push({ label: "Subscription Agreement", path: d.subscription_agreement_doc });
            if (d.additional_doc) docs.push({ label: "Consent Declaration", path: d.additional_doc });
        }

        return docs;
    };

    const documents = getDocuments();

    if (documents.length === 0) {
        return (
            <div className="py-12">
                <EmptyState
                    title="No Documents Uploaded"
                    description="This entity has not uploaded any verification documents yet."
                />
            </div>
        );
    }

    return (
        <div className="mt-4">
            <div className="bg-gray-50 rounded-md p-2 border border-gray-100 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-white rounded-md shadow-md">
                            <FaFileImage className="text-blue-700" size={20} />
                        </div>
                        <div>
                            <h1 className="text-sm uppercase font-bold text-gray-900">
                                Uploaded Documents
                            </h1>
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                                <FaIdCard size={14} />
                                {entity.type === 'office' && (entity as OfficeData).organisation_name}
                                {entity.type === 'institution' && (entity as InstitutionData).institution_name}
                                {entity.type === 'motor_driving_school' && (entity as MotorDrivingSchoolData).driving_school_name}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <span className='bg-amber-200 text-amber-800  font-bold text-xs uppercase p-1 rounded-lg'>Total {documents.length}</span>
                    </div>
                </div>
            </div>
            <div className="overflow-y-auto h-[78vh] space-y-2 border border-gray-200 rounded-lg p-4 mt-2">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4">
                    {documents.map((doc, index) => (
                        <DocumentCard key={index} label={doc.label} path={String(doc.path)} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DocumentsTab;