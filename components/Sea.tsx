import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import Link from './Link';
import Layout from './Layout';

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      id
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;


const Search = () => {
  const [searchFilter, setSearchFilter] = useState('');
  const [executeSearch, { data }] = useLazyQuery(
    FEED_SEARCH_QUERY
  );
  return (
    <>
      <div className='flex justify-center pt-10'>
        <input
          type="text"
          className=" px-4 py-2  mt-2 mx-5  placeholder-gray-400  border border-gray-200 rounded-md  placeholder-gray-600   border-gray-700 focus:border-blue-400  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
          onChange={(e) => setSearchFilter(e.target.value)}
        />
        <button
        className=" px-4 tracking-wide text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          onClick={() =>
            executeSearch({
              variables: { filter: searchFilter }
            })
          }
        >
          Search
        </button>
      </div>
      {data &&
        data.feed.links.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
    </>
  );
};

export default Search;
