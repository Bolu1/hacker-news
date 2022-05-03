/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unknown-property */
import React, { useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { gql, useMutation } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginHandler] = useMutation(LOGIN_MUTATION, {
    //   e.preventDefault()
    variables: {
      email: email,
      password: password,
    },
    onCompleted: ({ login }) => {

    console.log("2ws")
      console.log(login.token);
      Cookies.set("user", login.token);
      router.push("/");
    },
  });

  return (
    <div>
      <div
        style={{ minHeight: "100vh" }}
        className="flex justify-center bg-gray-100"
      >
        <div className="w-full max-w-sm p-6 m-auto bg-white rounded-md shadow-md :bg-gray-800">
          <h1 className="text-3xl font-semibold text-center text-blue-600 :text-white">
            HackerNews
          </h1>

          <div className="mt-6">
            <div>
              <label className="block text-sm text-gray-800 :text-gray-200">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 :focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm text-gray-800 :text-gray-200">
                  Password
                </label>
              </div>

              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 :focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-6">
              {!loading ? (
                <button
                  onClick={()=>loginHandler()}
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transdiv bg-blue-600 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-gray-600"
                >
                  Login
                </button>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 rounded-full motion-safe:animate-bounce animate-pulse bg-blue-400"></div>
                  <div className="w-4 h-4 rounded-full motion-safe:animate-bounce animate-pulse bg-blue-400"></div>
                  <div className="w-4 h-4 rounded-full motion-safe:animate-bounce animate-pulse bg-blue-400"></div>
                </div>
              )}
            </div>
          </div>

          <p className="mt-8 text-xs font-light text-center text-gray-400">
            {" "}
            Don not have an account?{" "}
            <a
              href="/auth/register"
              className="font-medium text-gray-700 :text-gray-200 hover:underline"
            >
              Create One
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Register), { ssr: false });
