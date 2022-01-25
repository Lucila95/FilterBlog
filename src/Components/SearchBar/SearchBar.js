import React, {useContext, useEffect} from 'react'
import Categories from './Categories'
import InputSearch from './InputSearch'
import './SearchBar.scss'
import { Row, Col, Container } from 'reactstrap'
import { Button } from 'antd'
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Store } from '../App/App'
import { useLazyQuery, gql } from '@apollo/client';

const GETPOSTBYSTRING = gql `
query getPostByString($stringSearch: String!) {
  posts(where: {search: $stringSearch}) {
    edges {
      node {
        title
        postId
        excerpt
        featuredImage {
          node {
            sourceUrl
            mediaItemUrl
          }
        }
        link
        date
      }
    }
  }
}
`

export default function SearchBar() {
    const store = useContext(Store)
    const [getPosts, { loading, error, data}] = useLazyQuery(GETPOSTBYSTRING)
    const searchButton = ()=> {
        getPosts({fetchPolicy:"network-only", variables: { stringSearch: store.search }})
       }
    const clearSearch = ()=>{
        store.setSearch("")
        store.setPosts(null) 
    }   
       useEffect(() => {
        if(store.posts !== data){
          store.setPosts(data)
        }
       })
    return (
        <Container fluid id="searchBar">
            <Row className="mb-5">
                <Col xs={12} md={6} lg={6}>
                    <InputSearch 
                    
                    />
                </Col>
                <Col xs={12} md={3} lg={3}>
                    <Button id="btn-search" block type="primary"
                    onClick = {()=> searchButton()}
                    ><SearchOutlined/> Search</Button>
                </Col>

                <Col xs={12} md={3} lg={3}>
                    <Button id="btn-clearSearch" block type="primary"
                    onClick = {()=> clearSearch()}
                    ><CloseCircleOutlined /> Clear </Button>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Categories />
                </Col>
            </Row>
        </Container>
    )
}
