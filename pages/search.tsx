import { gql } from '@apollo/client';
import React from 'react'
import Layout from '../components/Layout';
import Sea from '../components/Sea'


function Search() {
  return (
    <Layout title="Search">
    <div>
      <Sea/>
    </div>
    </Layout>
  )
}

export default Search