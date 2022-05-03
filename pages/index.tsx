/* eslint-disable react/no-unknown-property */
import type { NextPage } from "next";
import Image from "next/image";
import Layout from "../components/Layout";
import dynamic from "next/dynamic"
import Link from "next/link";
import Cookies from 'js-cookie'
import {useRouter} from 'next/router'
import { useEffect } from "react";
import { gql, ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import LinkList from "../components/LinkList";
import CreateLink from "../components/Createlink";

export default function Home(props) {
  const router = useRouter()
 
  console.log(props)

  return (
    <Layout title="Home">
      <LinkList/>
      <CreateLink/>
    </Layout>
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