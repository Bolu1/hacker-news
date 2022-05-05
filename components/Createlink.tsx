import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import client from "../apollo-client";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { FEED_QUERY } from "./LinkList";
import dynamic from "next/dynamic";

const CreateLink = () => {
  const router = useRouter();
  if (!Cookies.get("user")) {
    router.push("/auth/login");
  }
  const [formState, setFormState] = useState({
    description: "",
    url: "",
  });

  const CREATE_LINK_MUTATION = gql`
    mutation PostMutation($description: String!, $url: String!) {
      post(description: $description, url: $url) {
        id
        createdAt
        url
        description
      }
    }
  `;

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      description: formState.description,
      url: formState.url,
    },
    // update: (cache, { data: { post } }) => {
    //   const data:any = cache.readQuery({
    //     query: FEED_QUERY,
    //   });

    //   cache.writeQuery({
    //     query: FEED_QUERY,
    //     data: {
    //       feed: {
    //         links: [post, ...data.feed.links]
    //       }
    //     },
    //   });
    // },
    onCompleted: () =>
      location.replace("https://hacker-news-black.vercel.app/"),
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    createLink();
  };

  return (
    <div className="flex justify-center mt-10">
      <form className="mt-5" onSubmit={onSubmit}>
        <div className="flex flex-column mt3">
          <input
            className="block px-4 py-2 mt-2 mx-5  placeholder-gray-400  border border-gray-200 rounded-md  placeholder-gray-600   border-gray-700 focus:border-blue-400  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            value={formState.description}
            onChange={(e) =>
              setFormState({
                ...formState,
                description: e.target.value,
              })
            }
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="block px-4 py-2 mt-2 mx-5  placeholder-gray-400  border border-gray-200 rounded-md  placeholder-gray-600   border-gray-700 focus:border-blue-400  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            value={formState.url}
            onChange={(e) =>
              setFormState({
                ...formState,
                url: e.target.value,
              })
            }
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <div className="flex justify-center mt-10">
          <button
            className="m-5 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default dynamic(() => Promise.resolve(CreateLink), { ssr: false });
