/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const EditTodoModal = ({ isOpen, onClose, todo, onUpdateTodo }) => {
    const [title, setTitle] = useState(todo?.title || "");
    const [description, setDescription] = useState(todo?.description || "");
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if (todo) {
            setTitle(todo.title || "");
            setDescription(todo.description || "");
            setFiles(todo.files ? [...todo.files] : []); 
        }
    }, [todo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim().length < 3) return;

        if (!todo?.id) {
            console.error("Error: Todo ID is missing!");
            return;
        }

        onUpdateTodo(todo.id, title, description, files);
        onClose();
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
    };

    if (!isOpen || !todo) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Todo</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Title (min 3 chars)"
                        value={title ?? ""}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={description ?? ""}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload New Files or Images
                        </label>
                        <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-600 transition duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                            Update Todo
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTodoModal;
