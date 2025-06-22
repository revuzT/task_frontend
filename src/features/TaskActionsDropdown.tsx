/* eslint-disable @typescript-eslint/no-explicit-any */
import { Check, MoreVertical } from "lucide-react";
import { useRef, useState } from "react";

const TaskActionsDropdown = () => {
  const [open, setOpen] = useState(false);
  const [isEdited, setIsEdited] = useState(true);
  const dropdownRef = useRef(null);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div
        className="text-xl text-gray-700 cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors"
        onClick={() => {
          console.log("Icon clicked, toggling dropdown");
          setOpen((prev) => !prev);
        }}
      >
        <MoreVertical className="w-5 h-5 text-gray-700" />
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden transform origin-top-right transition-all duration-200 ease-out scale-95 opacity-0 animate-fade-in-scale">
          <button
            onClick={() => {
              console.log("Edit clicked");
              setIsEdited(!isEdited);
              setOpen(false);
            }}
            className="flex items-center w-full px-4 py-2 text-left text-sm hover:bg-gray-100 rounded-t-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            role="menuitem"
          >
            {isEdited && <Check className="w-4 h-4 mr-2 text-gray-600" />}
            Edit
          </button>
          <button
            onClick={() => {
              console.log("Delete clicked");
              setOpen(false);
            }}
            className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            role="menuitem"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskActionsDropdown;
