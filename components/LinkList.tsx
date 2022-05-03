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


export default function LinkedList(props) {


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


// export async function getStaticProps() {
//   const { data } = await client.query({
//     query: gql`
//       query feed(skip: 0, take: 10) {
//         links {
//           description
//           url
//           postedBy {
//             name
//           }
//         }
//       }
//     `,
//   });

//   console.log(data.countries)

//   return {
//     props: {
//       countries: data.countries.slice(0, 4),
//     },
//  };
// }
