import React, { useEffect, useState } from "react";
import Link from "./Link";
import { useQuery, gql } from "@apollo/client";
import dynamic from "next/dynamic";
import client from "../apollo-client";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

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
  const router = useRouter();
  const { page } = router.query;
  if (!Cookie.get("page")) {
    Cookie.set("page", 10);
  }
  var p = Cookie.get("page");
  if (p == 0) {
    p = 10;
  }
  console.log(p);

  const { data } = useQuery(FEED_QUERY);
  // const d = data.feed.links.slice(0, 5)

  return (
    <div style={{ minHeight: "70vh" }}>
      {data && (
        <>
          {data.feed.links.slice(p - 10, p).map((link, index) => (
            <Link key={link.id} link={link} index={index} />
          ))}
        </>
      )}
      {!data && (
        <div className="flex justify-center ">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400"></div>
            <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400"></div>
            <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400"></div>
          </div>
        </div>
      )}
    </div>
  );
}

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
