import React from 'react';
import { type Control, type FieldErrors, useController } from 'react-hook-form';

interface DaysCheckboxGroupProps {
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
    errors: FieldErrors;
    label: string;
    required?: boolean;
}

const DaysCheckboxGroup: React.FC<DaysCheckboxGroupProps> = ({
    name,
    control,
    errors,
    label,
    required = false,
}) => {
    const {
        field: { value, onChange },
    } = useController({
        name,
        control,
        defaultValue: [],
    });

    const days = [
        { label: 'Monday', value: 'monday' },
        { label: 'Tuesday', value: 'tuesday' },
        { label: 'Wednesday', value: 'wednesday' },
        { label: 'Thursday', value: 'thursday' },
        { label: 'Friday', value: 'friday' },
        { label: 'Saturday', value: 'saturday' },
        { label: 'Sunday', value: 'sunday' },
    ];

    const handleCheckboxChange = (dayValue: string, checked: boolean) => {
        if (checked) {
            onChange([...(value || []), dayValue]);
        } else {
            onChange((value || []).filter((day: string) => day !== dayValue));
        }
    };

    return (
        <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {days.map((day) => (
                    <label key={day.value} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={(value || []).includes(day.value)}
                            onChange={(e) => handleCheckboxChange(day.value, e.target.checked)}
                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                        <span className="text-sm text-gray-700">{day.label}</span>
                    </label>
                ))}
            </div>
            {errors[name] && (
                <p className="mt-1 text-sm text-red-600">{errors[name]?.message as string}</p>
            )}
        </div>
    );
};

export default DaysCheckboxGroup;
