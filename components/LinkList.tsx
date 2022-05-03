import React, { useEffect, useState } from "react";
import Link from "./Link";
import { useQuery, gql } from "@apollo/client";
import dynamic from "next/dynamic";
import client from "../apollo-client";



const LinkList = () => {
//   const { data } = useQuery(FEED_QUERY);
const [data, setData] = useState([])
useEffect(async() => {
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
  `;
  const get = async() =>{
  const {data} = await client.query({
      query: gql`
        query ${FEED_QUERY}
      `,
    });
    setData(data.feed.links)
  }
  const data = await get()
}, [setData])



  return (
    <div>
      {data.map((link) => (
        <Link key={link.id} link={link} />
      ))}
    </div>
  );
};



export default dynamic(() => Promise.resolve(LinkList), {ssr: false})
