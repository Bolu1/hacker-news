import React, { useEffect, useState } from "react";
import Link from "./Link";
import { useQuery, gql } from "@apollo/client";
import dynamic from "next/dynamic";
import client from "../apollo-client";

const LinkList = () => {
//   const { data } = useQuery(FEED_QUERY);

const FEED_QUERY = gql`
  {
    feed {
      id
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`

const { data } = useQuery(FEED_QUERY);

  return (
    <div>
    {data && (
      <>
        {data.feed.links.map((link) => (
          <Link key={link.id} link={link} />
        ))}
      </>
    )}
  </div>
  );
};



export default dynamic(() => Promise.resolve(LinkList), {ssr: false})
