/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateInputs, authUser } from "../redux/slices/authSlice"; 
import { useEffect } from "react";
import { motion } from "framer-motion"; 

export const Auth = ({ type }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { postInputs, loading, error } = useSelector((state) => state.auth);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/todos");
        }
    }, [navigate]);

    const handleInputChange = (key, value) => {
        dispatch(updateInputs({ [key]: value }));
    };

    const handleSubmit = () => {
        dispatch(authUser({ type, postInputs })).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
                navigate("/todos");
            }
        });
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-50 to-purple-50">
            <motion.div
                initial={{ opacity: 0, y: -50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }} 
                className="card w-96 bg-white shadow-2xl rounded-lg p-8"
            >
                <div className="text-3xl font-bold text-center mb-6 text-gray-800">
                    {type === "signup" ? "Create an Account" : "Sign in"}
                </div>
                <div className="text-sm text-center text-gray-600 mb-6">
                    {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                    <Link
                        className="pl-2 text-blue-600 hover:text-blue-700 transition duration-200"
                        to={type === "signin" ? "/signup" : "/signin"}
                    >
                        {type === "signin" ? "Sign up" : "Sign in"}
                    </Link>
                </div>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="alert alert-error text-sm mb-4 bg-red-100 text-red-600 p-3 rounded-lg"
                    >
                        {error}
                    </motion.div>
                )}
                <div className="space-y-6">
                    {type === "signup" && (
                        <LabelledInput
                            label="Name"
                            placeholder="John Doe..."
                            onChange={(e) => handleInputChange("name", e.target.value)}
                        />
                    )}
                    <LabelledInput
                        label="Email"
                        placeholder="john@gmail.com"
                        onChange={(e) => handleInputChange("username", e.target.value)}
                    />
                    <LabelledInput
                        label="Password"
                        type="password"
                        placeholder="••••••"
                        onChange={(e) => handleInputChange("password", e.target.value)}
                    />
                    <motion.button
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }} 
                        onClick={handleSubmit}
                        type="button"
                        className={`btn w-full p-3 bg-blue-600 text-white hover:bg-blue-700 transition duration-200 ${
                            loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={loading}
                    >
                        {loading ? "Loading..." : type === "signup" ? "Sign up" : "Sign in"}
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

const LabelledInput = ({ label, placeholder, onChange, type }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <label className="label">
                <span className="label-text font-semibold text-gray-700">{label}</span>
            </label>
            <input
                onChange={onChange}
                type={type || "text"}
                className="input w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
                placeholder={placeholder}
                required
            />
        </motion.div>
    );
};