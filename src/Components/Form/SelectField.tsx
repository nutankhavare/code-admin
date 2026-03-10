import React from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

interface Option {
    label: string;
    value: string | number;
}

interface SelectFieldProps {
    label: string;
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>;
    errors: FieldErrors;
    options: Option[];
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
    label,
    name,
    register,
    errors,
    options,
    placeholder = 'Select an option',
    required = false,
    disabled = false,
}) => {
    return (
        <div className="form-group">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="required-mark">*</span>}
            </label>
            <select
                id={name}
                {...register(name)}
                disabled={disabled}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors[name] ? 'border-red-500' : 'border-gray-300'
                } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {errors[name] && (
                <p className="mt-1 text-sm text-red-600">{errors[name]?.message as string}</p>
            )}
        </div>
    );
};

export default SelectField;
