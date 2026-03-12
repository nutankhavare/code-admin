import React from 'react';
import { useFormContext } from 'react-hook-form';
import InputField from '../../../Components/Form/InputField';
import SelectField from '../../../Components/Form/SelectField';
import type { InstitutionData } from '../organisation.types';
import '../../Organisation/Organisation.css';

/* ── StaffCreate style helpers ────────────────────────── */
const SectionHeader = ({ icon, title }: { icon: string; title: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', borderBottom: '1.5px solid var(--border)', background: 'var(--surface)' }}>
        <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--primary)' }}>{icon}</span>
        <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: '.07em', textTransform: 'uppercase' }}>{title}</span>
    </div>
);

const Card = ({ children }: { children: React.ReactNode }) => (
    <div style={{ background: 'white', border: '1.5px solid var(--border)', borderRadius: 12, marginBottom: 20, overflow: 'hidden' }}>
        {children}
    </div>
);

const Body = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
    <div style={{ padding: '20px 22px', ...style }}>{children}</div>
);

const Grid = ({ cols, children }: { cols: string; children: React.ReactNode }) => (
    <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 16 }}>{children}</div>
);

const Label = ({ children }: { children: React.ReactNode }) => (
    <label style={{ display: 'block', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.06em', color: '#64748B', marginBottom: 5 }}>
        {children}
    </label>
);

const Err = ({ msg }: { msg?: string }) => msg ? (
    <div style={{ fontSize: 10, color: '#DC2626', fontWeight: 700, marginTop: 3 }}>⚠ {msg}</div>
) : null;

/* ── Hardcoded Dummy Data ──────────────────────────────── */
const dummyPlans = [
    { label: 'Basic Plan', value: '1' },
    { label: 'Premium Plan', value: '2' }
];

const dummyInstitutionTypes = [
    { label: 'University', value: 'University' },
    { label: 'Engineering College', value: 'Engineering College' },
    { label: 'Degree College', value: 'Degree College' },
    { label: 'School', value: 'School' },
    { label: 'Training Center', value: 'Training Center' }
];

const dummyStates = [
    { state: 'Karnataka', district: '' },
    { state: 'Maharashtra', district: '' },
    { state: 'Delhi', district: '' }
];

const InstitutionCreateForm: React.FC = () => {
    const {
        register,
        setValue,
        watch,
        formState: { errors },
    } = useFormContext<InstitutionData>();

    // const selectedState = useWatch({ control, name: 'state' });
    const watchedFiles = watch();

    const handleDoc = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue(fieldName as any, file as any);
        }
    };

    const uploadFields = [
        { label: 'AICTE / UGC Approval', name: 'aicte_ugc_approval_doc' },
        { label: 'Registration Certificate', name: 'registration_certificate_doc' },
        { label: 'GST Certificate', name: 'gst_certificate_doc' },
        { label: 'PAN Card Copy', name: 'pan_card_doc' },
        { label: 'Institution Brochure', name: 'institution_brochure_doc' },
        { label: 'Additional Document', name: 'additional_doc' },
    ];

    return (
        <div className="org-form-container">
            {/* 1. Basic Institution Information */}
            <Card>
                <SectionHeader icon="school" title="Basic Institution Information" />
                <Body>
                    <Grid cols="repeat(3, 1fr)">
                        <InputField label="Institution Name" name="organisation_name" register={register} errors={errors} required />
                        <SelectField label="Institution Type" name="institution_type" register={register} errors={errors} options={dummyInstitutionTypes} required />
                        <InputField label="Registration Number" name="registration_number" register={register} errors={errors} required />
                        <InputField label="Registration Date" name="registration_date" type="date" register={register} errors={errors} required />
                        <InputField label="AICTE / UGC Id" name="aicte_ugc_id" register={register} errors={errors} required />
                        <InputField label="GST Number" name="gst_number" register={register} errors={errors} />
                        <InputField label="PAN Number" name="pan_number" register={register} errors={errors} />
                        <InputField label="Institution Phone" name="organisation_phone" register={register} errors={errors} required validation={{ pattern: { value: /^[0-9]{10}$/, message: 'Must be exactly 10 digits' } }} />
                        <InputField label="Institution Email" name="organisation_email" type="email" register={register} errors={errors} required />
                        <InputField label="Website / Domain" name="domain" register={register} errors={errors} placeholder="e.g. jain-university" />
                        <SelectField label="Subscription Plan" name="subscription_plan" register={register} errors={errors} options={dummyPlans} required />
                    </Grid>
                </Body>
            </Card>

            {/* 2. Operational Details */}
            <Card>
                <SectionHeader icon="settings" title="Operational Details" />
                <Body>
                    <Grid cols="repeat(3, 1fr)">
                        <InputField label="Number of Students" name="number_of_students" type="number" register={register} errors={errors} required />
                        <InputField label="Number of Staff" name="number_of_employees" type="number" register={register} errors={errors} required />
                        <InputField label="Number of Vehicles" name="number_of_vehicles" type="number" register={register} errors={errors} required />
                        <InputField label="Working Hours" name="working_hours" register={register} errors={errors} placeholder="e.g. 8:30 AM - 4:30 PM" required />
                    </Grid>
                </Body>
            </Card>

            {/* 3. Address Details */}
            <Card>
                <SectionHeader icon="location_on" title="Address Details" />
                <Body>
                    <Grid cols="repeat(3, 1fr)">
                        <InputField label="Address Line 1" name="address_line_1" register={register} errors={errors} required />
                        <InputField label="Address Line 2" name="address_line_2" register={register} errors={errors} />
                        <SelectField label="State" name="state" register={register} errors={errors} options={dummyStates.map((s) => ({ label: s.state, value: s.state }))} required />
                        <InputField label="City" name="city" register={register} errors={errors} required />
                        <InputField label="Pincode" name="pin_code" register={register} errors={errors} required validation={{ pattern: { value: /^[0-9]{6}$/, message: 'Must be exactly 6 digits' } }} />
                        <InputField label="Landmark" name="landmark" register={register} errors={errors} />
                    </Grid>
                </Body>
            </Card>

            {/* 4. Contact Persons */}
            <Card>
                <SectionHeader icon="group" title="Contact Persons" />
                <Body>
                    <div style={{ marginBottom: 16 }}>
                        <Label>Primary Contact (Principal / Director)</Label>
                    </div>
                    <Grid cols="repeat(2, 1fr)">
                        <InputField label="Full Name" name="primary_person_name" register={register} errors={errors} required />
                        <InputField label="Email Address" name="primary_person_email" type="email" register={register} errors={errors} required />
                        <InputField label="Phone Number 1" name="primary_person_phone_1" register={register} errors={errors} required />
                        <InputField label="Phone Number 2" name="primary_person_phone_2" register={register} errors={errors} />
                    </Grid>
                </Body>
            </Card>

            {/* 5. Document Uploads */}
            <Card>
                <SectionHeader icon="upload_file" title="Document Uploads" />
                <Body>
                    <Grid cols="1fr 1fr 1fr">
                        {uploadFields.map(({ label, name }) => {
                            const file = (watchedFiles as any)[name];
                            return (
                                <div key={name}>
                                    <Label>{label}</Label>
                                    <label
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: 96,
                                            borderRadius: 10,
                                            border: '2px dashed var(--border)',
                                            background: file ? '#F5F3FF' : 'var(--surface)',
                                            cursor: 'pointer',
                                            gap: 6,
                                            borderColor: file ? 'var(--primary)' : undefined,
                                        }}
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: 26, color: file ? 'var(--primary)' : '#CBD5E1' }}>cloud_upload</span>
                                        <span style={{ fontSize: 10, fontWeight: 700, color: file ? 'var(--primary)' : '#94A3B8', textAlign: 'center', padding: '0 8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
                                            {file instanceof File ? file.name : (typeof file === 'string' ? file.split('/').pop() : 'Click or Drag to Upload')}
                                        </span>
                                        <span style={{ fontSize: 9, color: '#CBD5E1' }}>PDF, JPG up to 5MB</span>
                                        <input type="file" style={{ display: 'none' }} onChange={(e) => handleDoc(e, name)} />
                                    </label>
                                    <Err msg={(errors as any)[name]?.message} />
                                </div>
                            );
                        })}
                    </Grid>
                </Body>
            </Card>

            {/* 6. Remarks Section */}
            <Card>
                <SectionHeader icon="notes" title="Remarks / Additional Notes" />
                <Body>
                    <textarea
                        className="form-input"
                        rows={3}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1.5px solid var(--border)', outline: 'none', transition: 'border-color 0.2s', resize: 'vertical' }}
                        placeholder="Enter any additional remarks..."
                        {...register('remarks')}
                    />
                </Body>
            </Card>

            {/* 7. Consent Section */}
            <Card>
                <SectionHeader icon="task_alt" title="Consent & Terms" />
                <Body>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            style={{ width: 18, height: 18, accentColor: 'var(--primary)', cursor: 'pointer' }}
                            {...register('consent' as any, { required: 'You must agree to the terms' })}
                        />
                        <span style={{ fontSize: 13, fontWeight: 700 }}>I verify that all information provided is accurate and I agree to the institution service terms.</span>
                    </label>
                    <Err msg={(errors as any).consent?.message} />
                </Body>
            </Card>
        </div>
    );
};

export default InstitutionCreateForm;
