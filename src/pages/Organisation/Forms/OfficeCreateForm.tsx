import React, { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import InputField from '../../../Components/Form/InputField';
import SelectField from '../../../Components/Form/SelectField';

import type { OfficeData } from '../organisation.types';
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

const dummyOrgTypes = [
    { label: 'Corporate Office', value: 'Corporate' },
    { label: 'Branch Office', value: 'Branch' },
    { label: 'Satellite Office', value: 'Satellite' }
];

const dummyRegistrationTypes = [
    { label: 'Private Limited', value: 'Private Limited' },
    { label: 'Partnership', value: 'Partnership' },
    { label: 'Proprietorship', value: 'Proprietorship' },
    { label: 'LLP', value: 'LLP' }
];

const dummyStates = [
    { state: 'Karnataka', district: '' },
    { state: 'Maharashtra', district: '' },
    { state: 'Delhi', district: '' },
    { state: 'Tamil Nadu', district: '' }
];

const dummyDistrictsMap: Record<string, { district: string }[]> = {
    'Karnataka': [{ district: 'Bangalore' }, { district: 'Mysore' }, { district: 'Hubli' }],
    'Maharashtra': [{ district: 'Mumbai' }, { district: 'Pune' }, { district: 'Nagpur' }],
    'Delhi': [{ district: 'North Delhi' }, { district: 'South Delhi' }, { district: 'New Delhi' }],
    'Tamil Nadu': [{ district: 'Chennai' }, { district: 'Coimbatore' }, { district: 'Madurai' }]
};

const OfficeCreateForm: React.FC = () => {
    const {
        register,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useFormContext<OfficeData>();

    // Watch State Selection
    const selectedState = useWatch({ control, name: 'state' });

    // Handle District Reset on State Change
    useEffect(() => {
        // setValue('district', '');
    }, [selectedState, setValue]);

    const currentDistricts = selectedState ? dummyDistrictsMap[selectedState] || [] : [];
    const watchedFiles = watch();

    const handleDoc = (e: React.ChangeEvent<HTMLInputElement>, fieldName: any) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue(fieldName, file as any);
        }
    };

    const uploadFields = [
        { label: 'Registration Certificate', name: 'registration_certificate_doc' },
        { label: 'GST Certificate', name: 'gst_certificate_doc' },
        { label: 'PAN Card Copy', name: 'pan_card_doc' },
        { label: 'UDYAM / MSME Certificate', name: 'udyam_msme_certificate_doc' },
        { label: 'TAN Document', name: 'tan_doc' },
        { label: 'Additional Document', name: 'additional_doc' },
    ];

    return (
        <div className="org-form-container">
            {/* 1. Basic Organisation Information */}
            <Card>
                <SectionHeader icon="info" title="Basic Organisation Information" />
                <Body>
                    <Grid cols="repeat(3, 1fr)">
                        <InputField label="Organisation Name" name="organisation_name" register={register} errors={errors} required />
                        <SelectField label="Organisation Type" name="organisation_type" register={register} errors={errors} options={dummyOrgTypes} required />
                        <SelectField label="Registration Type" name="registration_type" register={register} errors={errors} options={dummyRegistrationTypes} required />
                        <InputField label="Registration Number" name="registration_number" register={register} errors={errors} required />
                        <InputField label="Registration Date" name="registration_date" type="date" register={register} errors={errors} required />
                        <InputField label="TAN Number" name="tan_number" register={register} errors={errors} validation={{ pattern: { value: /^[A-Z]{4}[0-9]{5}[A-Z]{1}$/, message: 'Invalid TAN format' } }} />
                        <InputField label="UDYAM / MSME Registration No" name="udyam_msme_registration_no" register={register} errors={errors} />
                        <InputField label="GST Number" name="gst_number" register={register} errors={errors} validation={{ pattern: { value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, message: 'Invalid GST format' } }} />
                        <InputField label="PAN Number" name="pan_number" register={register} errors={errors} validation={{ pattern: { value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, message: 'Invalid PAN format' } }} />
                        <InputField label="Organisation Phone" name="organisation_phone" register={register} errors={errors} required validation={{ pattern: { value: /^[0-9]{10}$/, message: 'Must be exactly 10 digits' } }} />
                        <InputField label="Organisation Email" name="organisation_email" type="email" register={register} errors={errors} required validation={{ pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid email address' } }} />
                        <InputField label="Website / Domain" name="domain" register={register} errors={errors} placeholder="e.g. city-drives" />
                        <SelectField label="Subscription Plan" name="subscription_plan" register={register} errors={errors} options={dummyPlans} required />
                    </Grid>
                </Body>
            </Card>

            {/* 2. Operational Details */}
            <Card>
                <SectionHeader icon="settings" title="Operational Details" />
                <Body>
                    <Grid cols="repeat(3, 1fr)">
                        <InputField label="Number of Employees" name="number_of_employees" type="number" register={register} errors={errors} required />
                        <InputField label="Number of Vehicles" name="number_of_vehicles" type="number" register={register} errors={errors} required />
                        <InputField label="Number of GPS Devices" name="number_of_gps" type="number" register={register} errors={errors} required />
                        <InputField label="Number of Beacons" name="number_of_beacons" type="number" register={register} errors={errors} required />
                        <InputField label="Working Hours" name="working_hours" register={register} errors={errors} placeholder="e.g. 9:00 AM - 6:00 PM" required />
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
                        <SelectField label="District" name="district" register={register} errors={errors} options={currentDistricts.map((d) => ({ label: d.district, value: d.district }))} disabled={!selectedState} required />
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
                        <Label>Primary Contact (Authorised Signatory)</Label>
                    </div>
                    <Grid cols="repeat(2, 1fr)">
                        <InputField label="Full Name" name="primary_person_name" register={register} errors={errors} required />
                        <InputField label="Email Address" name="primary_person_email" type="email" register={register} errors={errors} required validation={{ pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid email address' } }} />
                        <InputField label="Phone Number 1" name="primary_person_phone_1" register={register} errors={errors} required validation={{ pattern: { value: /^[0-9]{10}$/, message: 'Must be exactly 10 digits' } }} />
                        <InputField label="Phone Number 2" name="primary_person_phone_2" register={register} errors={errors} validation={{ pattern: { value: /^[0-9]{10}$/, message: 'Must be exactly 10 digits' } }} />
                    </Grid>
                    <div style={{ marginTop: 32, marginBottom: 16 }}>
                        <Label>Secondary Contact</Label>
                    </div>
                    <Grid cols="repeat(2, 1fr)">
                        <InputField label="Full Name" name="secondary_person_name" register={register} errors={errors} />
                        <InputField label="Email Address" name="secondary_person_email" type="email" register={register} errors={errors} validation={{ pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid email address' } }} />
                        <InputField label="Phone Number 1" name="secondary_person_phone_1" register={register} errors={errors} validation={{ pattern: { value: /^[0-9]{10}$/, message: 'Must be exactly 10 digits' } }} />
                        <InputField label="Phone Number 2" name="secondary_person_phone_2" register={register} errors={errors} validation={{ pattern: { value: /^[0-9]{10}$/, message: 'Must be exactly 10 digits' } }} />
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
                        placeholder="Enter any additional remarks or internal notes regarding this organisation..."
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
                        <span style={{ fontSize: 13, fontWeight: 700 }}>I verify that all information provided is accurate and I agree to the service terms.</span>
                    </label>
                    <Err msg={(errors as any).consent?.message} />
                </Body>
            </Card>
        </div>
    );
};

export default OfficeCreateForm;
