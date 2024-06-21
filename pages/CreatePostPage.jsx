
import React from 'react';
import ArticleForm from '../src/components/ArticleForm';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

function PostPage() {
  return (
    <div>
      <h1>Crea Post</h1>
      <Link to={`/posts`}>
        <Button color="primary">Vai alla lista dei post</Button>
      </Link>
      <ArticleForm />

    </div>
  );
}

export default PostPage;
