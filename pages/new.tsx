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

export default function New(props) {
  const router = useRouter()
 
  console.log(props)

  return (
    <Layout title="Home">
      <CreateLink/>
    </Layout>
  );
};
