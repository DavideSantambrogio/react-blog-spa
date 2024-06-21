
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "reactstrap";


function HomePage() {
  return (
    <div>
      <h1>Benvenuti nel mio blog</h1>
      <Link to={`/posts`}>
        <Button color="primary">Vai alla lista dei post</Button>
      </Link>
    </div>
  );
}

export default HomePage;
