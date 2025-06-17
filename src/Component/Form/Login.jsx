import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { login } from "../ReduxToolKit/authSlice";

const schema = yup.object({
    username: yup
        .string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters"),
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
}).required();

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        dispatch(login({ username: data.username, password: data.password }));
        navigate("/");
    };

    return (
        <form className="container mt-4 w-50" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    className={`form-control ${errors.username ? "is-invalid" : ""}`}
                    {...register("username")}
                />
                {errors.username && (
                    <div className="invalid-feedback">{errors.username.message}</div>
                )}
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    {...register("password")}
                />
                {errors.password && (
                    <div className="invalid-feedback">{errors.password.message}</div>
                )}
            </div>
            <button type="submit" className="btn btn-danger">
                Submit
            </button>
        </form>
    );
}

export default Login;