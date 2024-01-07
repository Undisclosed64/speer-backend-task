export const DeleteConfirmationModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-4 rounded-lg">
        <p className="text-lg mb-4">
          Are you sure you want to delete this note?
        </p>
        <div className="flex justify-end">
          <button
            className="text-gray-500 hover:underline mr-4"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button className="text-red-500 hover:underline" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
