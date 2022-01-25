import React, { useContext, useEffect, useState } from 'react'
import { CardBody, CardTitle, Button, CardText, Card, CardImg, Col } from 'reactstrap'
import moment from 'moment'
import { Store } from '../App/App';
import { useQuery, gql } from "@apollo/client";
import { LoadingOutlined } from '@ant-design/icons';
import { Player, Controls } from "@lottiefiles/react-lottie-player";


const GETPOSTBYCATEGORY = gql`
query getPostByCategory($categoryName: String!) {
    posts(where: {categoryName: $categoryName}) {
      edges {
        node {
          title
          postId
          link
          excerpt
          date
          featuredImage {
            node {
             sourceUrl
            }
          }
        }
      }
    }
  }
  `;

export default function Perra() {
    const store = useContext(Store)
    const [data, setData] = useState(null)
    
    const { loading, error, data:categoryData } = useQuery(GETPOSTBYCATEGORY, {fetchPolicy:"network-only", variables: { categoryName: store.activeCategory } })

    useEffect(() => {
        if(store.posts){
            setData(store.posts)
        }else{
            setData(categoryData)
        }
    })
    return (
        <>
            {
                loading
                    ? <div className="d-flex mx-auto my-auto"><LoadingOutlined style={{ fontSize: '50px', color: '#C14953' }} /></div>
                    : data
                        ? data.posts.edges.length === 0 
                          ? 
                          <Col className="d-flex justify-content-center flex-column text-center">
                           <Player 
                          autoplay
                          loop
                          src="https://rossainc.com/wp-content/uploads/2021/11/70780-no-result-found.json"
                          style={{ height: "300px", width: "300px" }}
                        >
                          <Controls
                            visible={false}
                            buttons={["play", "repeat", "frame", "debug"]}
                          />
                        </Player>
                        <b><h2 style={{color: "#125E8A"}}>No Results</h2></b>
                          </Col>
                         
                        : data.posts.edges.map((x, i) => {
                            return (
                                < Col xs={12} sm={12} md={12} lg={4} key={i}>
                                    <Card className="md-ml-4 mb-5">
                                        <CardImg
                                            alt="Card image cap"
                                            src={x.node.featuredImage.node.sourceUrl}
                                            top
                                            width="100%"
                                        />
                                        <CardBody>
                                            <div className="d-flex flex-row align-items-center justify-content-between">
                                                <div>
                                                    <CardTitle tag="h5" className="titleCard">
                                                        <b>{x.node.title}</b>
                                                    </CardTitle>
                                                </div>
                                                <div>
                                                    <p className="fecha">{moment(x.node.date).format('MM/DD/YYYY')}</p>
                                                </div>
                                            </div>
                                            <CardText className="excerptBlog" dangerouslySetInnerHTML={{ __html: x.node.excerpt }} />

                                            <div className="d-flex md-flex-row align-items-center justify-content-between">
                                                <div className="icSM">
                                                    <a href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Frossainc.com%2Fsite-6%2F&t=${encodeURIComponent(x.node.link)}`} target="_blank">
                                                    <i className="fab fa-facebook"></i>
                                                    </a>
                                                    
                                                     <a>
                                                         <i className="fab fa-instagram"></i>
                                                     </a>
                                                     <a href={`https://twitter.com/intent/tweet?text=%20Sit%206%20%7C%20Rossa%20Site:%20%20${encodeURIComponent(x.node.link)}`} target="_blank">
                                                     <i className="fab fa-twitter"></i>
                                                     </a>
                                                     <a href={`http://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(x.node.link)}&title=Sit%206%20%7C%20Rossa%20Site`} target="_blank">
                                                         <i className="fab fa-linkedin"></i>
                                                     </a> 
                                                     
                                                </div>
                                                <div>
                                                    <Button onClick={()=>window.location.href = x.node.link} className="btn-rm">
                                                        Read More <i className="fas fa-chevron-right"></i>
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col >
                            )
                        })

                        : null
            }
        </>

    )
}
