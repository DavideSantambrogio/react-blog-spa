import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';

const SinglePostPage = () => {
    const { slug } = useParams();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/posts/${slug}`);
                const postData = await response.json();
                setPost(postData);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    if (loading) {
        return <p>Caricamento...</p>;
    }


    return (
        <div>
            <Link to={`/posts`}>
                <Button color="primary">Torna alla lista dei post</Button>
            </Link>
            <Card key={`${post.id}`} className="mb-3 col-6">
                <CardBody>
                    <CardTitle tag="h5">{post.title}</CardTitle>
                    <div className='ratio ratio-16x9 mb-3'>
                        <img src={post.image} alt="post" className='object-fit-cover' />
                    </div>

                    <CardText>
                        <strong>Contenuto:</strong> {post.content}<br />
                        <strong>Categoria:</strong> {post.category.name}<br />
                        <strong>Tag:</strong> {post.tags.map(tag => tag.name).join(', ')}<br />
                        <strong>Pubblicato:</strong> {post.published ? 'Sì' : 'No'}
                    </CardText>


                </CardBody>
            </Card>

        </div>
    );
};

export default SinglePostPage;
