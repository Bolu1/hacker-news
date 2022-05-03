import React, { useEffect, useState } from "react";
import Link from "./Link";
import { useQuery, gql } from "@apollo/client";
import dynamic from "next/dynamic";
import client from "../apollo-client";

export const FEED_QUERY = gql`
  {
    feed {
      id
      links {
        id
        createdAt
        url
        description
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


const LinkList = () => {
//   const { data } = useQuery(FEED_QUERY);


const { data } = useQuery(FEED_QUERY);

  return (
    <div>
    {data && (
      <>
        {data.feed.links.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
      </>
    )}
  </div>
  );
};



export default dynamic(() => Promise.resolve(LinkList), {ssr: false})
