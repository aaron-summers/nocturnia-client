import React from 'react';

import Post from '../components/Post'

const Posts = ({data}) => {
    return (
      <div className="posts-container">
        {data.map(post => <Post key={post._id} {...post}/>)}
      </div>
    );
}

export default Posts