import React from 'react';
import type { FieldErrors, UseFormRegister, RegisterOptions } from 'react-hook-form';

interface InputFieldProps {
    label: string;
    name: string;
    type?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>;
    errors: FieldErrors;
    placeholder?: string;
    required?: boolean;
    validation?: RegisterOptions;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    name,
    type = 'text',
    register,
    errors,
    placeholder,
    required = false,
    validation = {},
}) => {
    const rules = {
        ...validation,
        ...(required && !validation.required ? { required: 'This field is required' } : {}),
    };

    return (
        <div className="form-group">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="required-mark">*</span>}
            </label>
            <input
                id={name}
                type={type}
                {...register(name, rules)}
                placeholder={placeholder}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors[name] ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {errors[name] && (
                <p className="mt-1 text-sm text-red-600">{errors[name]?.message as string}</p>
            )}
        </div>
    );
};

export default InputField;
