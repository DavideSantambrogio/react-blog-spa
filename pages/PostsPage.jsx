
import React from 'react';
import ArticleList from '../src/components/ArticleList';
import { Link } from 'react-router-dom'; 
import { Button } from 'reactstrap';


function PostPage() {
  return (
    <div>
      <h1>Lista di tutti i posts</h1>
      <Link to={`/create`}>
        <Button color="primary">Crea nuovo post</Button>
      </Link>

      <Link to={`/`}>
        <Button color="secondary">Torna alla Pagina iniziale</Button>
      </Link>
      <ArticleList />
    </div>
  );
}

export default PostPage;
