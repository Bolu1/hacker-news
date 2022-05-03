import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import client from '../apollo-client';

const CreateLink = () => {
  const [formState, setFormState] = useState({
    description: '',
    url: ''
  });

  const CREATE_LINK_MUTATION = gql`
  mutation PostMutation(
    $description: String!
    $url: String!
  ) {
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
      url: formState.url
    }
  });

  const onSubmit = async(e)=>{

    e.preventDefault();
    createLink();
  }

  return (
    <div>
      <form
      className="mt-5"
        onSubmit={onSubmit}
      >
        <div className="flex flex-column mt3">
          <input
             className="block px-4 py-2 mt-2 mx-5  placeholder-gray-400  border border-gray-200 rounded-md  placeholder-gray-600   border-gray-700 focus:border-blue-400  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            value={formState.description}
            onChange={(e) =>
              setFormState({
                ...formState,
                description: e.target.value
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
                url: e.target.value
              })
            }
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <button 
        className="m-5 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
        type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateLink;