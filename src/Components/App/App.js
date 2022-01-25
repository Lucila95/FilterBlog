import List from "../List/List";
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import SearchBar from "../SearchBar/SearchBar";
import { Col } from 'reactstrap'
import React,  {createContext, useState, useEffect} from "react"


const client = new ApolloClient({
  uri: 'https://rossainc.com/graphql',
  cache: new InMemoryCache()
})

export const Store = createContext()


function App () {
 const [search, setSearch] = useState("")
 const [activeCategory, setActiveCategory] = useState("All")
 const [posts, setPosts] = useState(null)
 useEffect(() => {
 if(search === ""){

  if(!posts ){
    setPosts(null)
  }
 }
 })


console.log(search, activeCategory, posts);
  return (
    <ApolloProvider client={client}>
      <Store.Provider value={{
        search,
        setSearch,
        activeCategory,
        setActiveCategory,
        posts,
        setPosts,
      }}>
      
      <SearchBar />
      <Col className="title-allBlog mb-2">
      <h3>All Blogs</h3>
      </Col>
      <List />
      </Store.Provider>
    </ApolloProvider>

  )
}

export default App
