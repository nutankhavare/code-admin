import React from 'react';
import ConfirmationModal from './ConfirmationModal';

interface DeleteModalProps {
    itemName: string;
    itemLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
    itemName,
    itemLabel = 'item',
    onConfirm,
    onCancel,
}) => {
    return (
        <ConfirmationModal
            title={`Delete ${itemLabel}?`}
            message={`Are you sure you want to delete ${itemName}? This action cannot be undone.`}
            confirmLabel="Delete"
            onConfirm={onConfirm}
            onCancel={onCancel}
            type="delete"
        />
    );
};

export default DeleteModal;
