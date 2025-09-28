import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppSelector } from "../../hooks/hooks.ts";
import { LoginAction } from "../../redux/slices/auth.slice.ts";
import Spinner from "../../components/common/Spinner.tsx";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import Button from "../../components/common/Button.tsx";
import TextField from "../../components/common/TextField.tsx";
import { AppDispatch, RootState } from '../../redux/store.ts';
import { useDispatch } from "react-redux";

const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Too short").required("Required"),
});

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
   const auth = useAppSelector((s: RootState) => s.loginUser);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <div className="bg-white shadow rounded-md w-full max-w-sm p-6">
                <Formik
                    initialValues={{ email: "", password: "", remember: false }}
                    validationSchema={LoginSchema}
                    onSubmit={async (values, { setSubmitting, setFieldError }) => {
                        const result = await dispatch(LoginAction(values))
                        setSubmitting(false);
                        if (result?.payload) {
                            navigate("/users");
                        } else {
                            setFieldError("email", (result.payload as string));
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            <TextField
                                name="email"
                                type="email"
                                placeholder="eve.holt@reqres.in"
                                icon={<Mail className="h-5 w-5" />}
                            />

                            <TextField
                                name="password"
                                type="password"
                                placeholder="********"
                                icon={<Lock className="h-5 w-5" />}
                            />


                            <div className="flex items-center space-x-2">
                                <Field
                                    type="checkbox"
                                    name="remember"
                                    className="h-4 w-4 text-blue-500 border-gray-300 rounded cursor-pointer"
                                />
                                <label htmlFor="remember" className="text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>

                            <Button
                                type="submit"
                                loading={isSubmitting || auth.status === "loading"}
                            >
                                {isSubmitting || auth.status === "loading" ? <Spinner /> : "Log in"}
                            </Button>

                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;
