import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, addTodo, deleteTodo, toggleTodo,updateTodo } from "../redux/slices/todoSlice";
import AddTodoModal from "../components/AddTodoModel";
import TodoDetailsModal from "../components/TodoDetailsModel"; 
import { FaTrash, FaCheckCircle,FaEdit } from "react-icons/fa";
import EditTodoModal from "../components/EditTodoModel";
const TodoPage = () => {
    const dispatch = useDispatch();
    const { todos, loading } = useSelector((state) => state.todos);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); 
    const [selectedTodo, setSelectedTodo] = useState(null); 
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [todoToEdit, setTodoToEdit] = useState(null);

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleAddTodo = (title, description, files) => {
        if (title.length < 3) return;
        dispatch(addTodo({ title, description, completed: false, files })); 
    };

    const handleDeleteTodo = (id) => {
        dispatch(deleteTodo(id));
    };

    const handleToggleTodo = (id) => {
        dispatch(toggleTodo(id));
    };

    const handleTodoClick = (todo) => {
        setSelectedTodo(todo); 
        setIsDetailsModalOpen(true);
    };

   

const handleEditTodo = (todo) => {
    if (!todo) return; 
    setTodoToEdit(todo); 
    setIsEditModalOpen(true); 
};

const handleUpdateTodo = (id, title, description, files) => {
    if (!title || !description) return; 
    dispatch(updateTodo({ id, title, description, files }));
    setIsEditModalOpen(false);
};

    const [name, setName] = useState(localStorage.getItem("name") || "User");

    useEffect(() => {
        setName(localStorage.getItem("name") || "Bro");
    }, []);

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
             
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Hello {name}</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Add New Todo
                    </button>
                </div>

                <AddTodoModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onAddTodo={handleAddTodo}
                />

         
                <TodoDetailsModal
                    isOpen={isDetailsModalOpen}
                    onClose={() => setIsDetailsModalOpen(false)}
                    todo={selectedTodo}
                />

                <EditTodoModal
                 isOpen={isEditModalOpen}
                 onClose={() => setIsEditModalOpen(false)}
                 todo={todoToEdit}
                 onUpdateTodo={handleUpdateTodo}
                 />

            
                {loading ? (
                    <p className="text-center text-gray-600">Loading todos...</p>
                ) : (
                    <ul>
                        {todos.map((todo) => (
                        <li
                         key={todo.id}
                         onClick={() => handleTodoClick(todo)} // Open details modal on click
                         className="p-6 bg-white rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow duration-200 flex justify-between items-center cursor-pointer"
                           >
                       <div>
                           <h3 className="text-xl font-semibold text-gray-800">{todo.title}</h3>
                           <p className="text-gray-600 mt-2 line-clamp-2">{todo.description}</p>
                              <span className="text-sm text-gray-400">
                               Created on: {new Date(todo.createdAt).toLocaleDateString()}
                              </span>
                       </div>
                       <div className="flex items-center gap-4">
                         <button
                          onClick={(e) => {
                           e.stopPropagation(); // Prevent modal from opening
                           handleEditTodo(todo); // Open edit modal
                           }}
                        className="text-gray-400 hover:text-blue-500 transition duration-200"
                         >
                       <FaEdit className="w-5 h-5" /> {/* Edit icon */}
                  </button>
            <button
                onClick={(e) => {
                    e.stopPropagation(); // Prevent modal from opening
                    handleToggleTodo(todo.id);
                }}
                className="text-gray-400 hover:text-green-500 transition duration-200"
            >
                <FaCheckCircle
                    className={`w-6 h-6 ${
                        todo.completed ? "text-green-500" : "text-gray-400"
                    }`}
                />
            </button>
            <button
                onClick={(e) => {
                    e.stopPropagation(); // Prevent modal from opening
                    handleDeleteTodo(todo.id);
                }}
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