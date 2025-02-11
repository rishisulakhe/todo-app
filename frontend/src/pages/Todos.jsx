import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, addTodo, deleteTodo, toggleTodo } from "../redux/slices/todoSlice"; // Add toggleTodo action
import AddTodoModal from "../components/AddTodoModel";
import { FaTrash, FaCheckCircle } from "react-icons/fa"; // Import FaCheckCircle for the completed icon

const TodoPage = () => {
    const dispatch = useDispatch();
    const { todos, loading } = useSelector((state) => state.todos);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleAddTodo = (title, description) => {
        if (title.length < 3) return;
        dispatch(addTodo({ title, description, completed: false })); // Add completed: false by default
    };

    const handleDeleteTodo = (id) => {
        dispatch(deleteTodo(id));
    };

    const handleToggleTodo = (id) => {
        dispatch(toggleTodo(id)); // Dispatch the toggleTodo action
    };

    const [name, setName] = useState(localStorage.getItem("name") || "User");

    useEffect(() => {
        setName(localStorage.getItem("name") || "Bro");
    }, []);

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Hello {name}</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Add New Todo
                    </button>
                </div>

                {/* Add New Todo Modal */}
                <AddTodoModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onAddTodo={handleAddTodo}
                />

                {/* Todo List */}
                {loading ? (
                    <p className="text-center text-gray-600">Loading todos...</p>
                ) : (
                    <ul>
                        {todos.map((todo) => (
                            <li
                                key={todo.id}
                                className="p-6 bg-white rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow duration-200 flex justify-between items-center"
                            >
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">{todo.title}</h3>
                                    <p className="text-gray-600 mt-2">{todo.description}</p>
                                    <span className="text-sm text-gray-400">
                                        Created on: {new Date(todo.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => handleToggleTodo(todo.id)}
                                        className="text-gray-400 hover:text-green-500 transition duration-200"
                                    >
                                        <FaCheckCircle
                                            className={`w-6 h-6 ${
                                                todo.completed ? "text-green-500" : "text-gray-400"
                                            }`}
                                        />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTodo(todo.id)}
                                        className="text-red-500 hover:text-red-700 transition duration-200"
                                    >
                                        <FaTrash className="w-5 h-5" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default TodoPage;