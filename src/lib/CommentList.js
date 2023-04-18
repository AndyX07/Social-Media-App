import React from 'react'
import { GetComments } from './Comments';
import DisplayComment from './DisplayComment';

const CommentList = ({c}) => {
    const {id} = c;
    const {comment, isLoading} = GetComments(id);
    if(isLoading) return "loading...";
    return (
        <div className = "commentList">
            {comment.map((com)=>
                <DisplayComment comment = {com}/>
            )}
        </div>
    )
}

export default CommentList