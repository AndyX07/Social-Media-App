import React from 'react'
import Posts from './Posts'

const OnePost = ({posts}) => {
  return (
    <div>
        <h1>Posts</h1>
        {posts?.length===0?(
            <h2>No Posts</h2>
        ):(
            posts?.map((p)=>
                <Posts post = {p} key = {p.id}/>
            )
        )}
    </div>
  )
}

export default OnePost