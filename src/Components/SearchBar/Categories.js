import React, { useContext } from 'react'
import { useQuery, gql } from "@apollo/client";
import { ButtonGroup, Button } from 'reactstrap';
import { Store } from '../App/App';

const CATEGORIES = gql`
query Categories {
    categories {
      nodes {
        categoryId
        name
      }
    }
  }
  `
export default function Categories() {
    const store = useContext(Store)
    const { loading, error, data } = useQuery(CATEGORIES)
    return (
        <div id="filterCategory" className="">               
            <ButtonGroup>
                {
                    !loading
                        ? data.categories.nodes.filter((j) => j.categoryId !== 1).map((x, i) => {
                            return (
                                <Button
                                    key={i}
                                    color="primary"
                                    onClick={() =>{
                                        store.setActiveCategory(x.name)
                                        store.setSearch("")
                                        store.setPosts(null)
                                    } }
                                    active={
                                        store.activeCategory === x.name
                                    }
                                >
                                    {
                                        x.name
                                    }
                                </Button>
                            )
                        }) : error


                }
            </ButtonGroup>
        </div>
    )
}
