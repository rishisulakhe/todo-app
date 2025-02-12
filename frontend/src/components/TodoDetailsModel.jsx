/* eslint-disable react/prop-types */
import { FaTimes, FaFile, FaDownload } from "react-icons/fa"; 
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
const TodoDetailsModal = ({ isOpen, onClose, todo }) => {
    const [isClosing, setIsClosing] = useState(false); 

    useEffect(() => {
        if (isOpen) {
            setIsClosing(false); 
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsClosing(true); 
        setTimeout(() => {
            onClose(); 
        }, 300); 
    };

    if (!isOpen || !todo) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
            onClick={handleClose} 
        >
            <div
                className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl transform transition-all duration-300 ${
                    isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
                }`}
                onClick={(e) => e.stopPropagation()} 
            >
              
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">{todo.title}</h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 transition duration-200"
                    >
                        <FaTimes className="w-6 h-6" />
                    </button>
                </div>

              
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Description</h3>
                    <p className="text-gray-600 whitespace-pre-wrap">{todo.description}</p>
                </div>

           
                {todo.files && todo.files.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Attachments</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {todo.files.map((file) => (
                                <div key={file.id} className="border rounded-lg overflow-hidden">
                                    {file.filename.endsWith(".jpg") || file.filename.endsWith(".png") ? (
                                        <img
                                            src={`${BACKEND_URL}/${file.path}`} // Replace with the correct file URL
                                            alt={`Attachment ${file.filename}`}
                                            className="w-full h-48 object-cover"
                                            onError={(e) => {
                                                e.target.src = "/placeholder-image.png"; // Fallback for broken images
                                            }}
                                        />
                                    ) : (
                                        <div className="p-4 bg-gray-50 flex flex-col items-center">
                                            <FaFile className="w-8 h-8 text-gray-500 mb-2" /> {/* File icon */}
                                            <span className="text-sm text-gray-600 text-center">
                                                {file.filename}
                                            </span>
                                            <a
                                                href={`${BACKEND_URL}/${file.path}`} // Replace with the correct file URL
                                                download
                                                className="text-blue-500 hover:text-blue-700 mt-2 flex items-center"
                                            >
                                                <FaDownload className="mr-1" /> Download
                                            </a>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TodoDetailsModal;