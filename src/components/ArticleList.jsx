import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importa Link da react-router-dom

function ArticleList() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/posts');
                const fetchedArticles = response.data.data;
                fetchedArticles.sort((a, b) => b.id - a.id);
                setArticles(fetchedArticles);
            } catch (error) {
                console.error('Errore durante il recupero dei post:', error);
            }
        };

        fetchArticles();
    }, []);

    const handleConfirmDelete = async (articleId, indexToDelete) => {
        try {
            await axios.delete(`http://localhost:3000/api/posts/${articleId}`);
            setArticles((prevArticles) => {
                const updatedArticles = [...prevArticles];
                updatedArticles.splice(indexToDelete, 1);
                return updatedArticles;
            });
            console.log(`Articolo con ID ${articleId} eliminato con successo.`);
        } catch (error) {
            console.error(`Errore durante l'eliminazione dell'articolo con ID ${articleId}:`, error);
        }
    };

    return (
        <div className='py-4'>
            <Link to={`/create`}>
                <Button color="primary">Crea nuovo post</Button>
            </Link>

            <Link to={`/`}>
                <Button color="secondary">Torna alla Pagina iniziale</Button>
            </Link>

            {articles.map((article, index) => (
                <Card key={`article-${index}`} className="m-3 col-6">
                    <CardBody>
                        <CardTitle tag="h5">{article.title}</CardTitle>
                        <div className='ratio ratio-16x9 mb-3'>
                            <img src={article.image} alt="article" className='object-fit-cover' />
                        </div>

                        <CardText>
                            <strong>Contenuto:</strong> {article.content}<br />
                            <strong>Categoria:</strong> {article.category.name}<br />
                            <strong>Tag:</strong> {article.tags.map(tag => tag.name).join(', ')}<br />
                            <strong>Pubblicato:</strong> {article.published ? 'Sì' : 'No'}
                        </CardText>


                        <Link to={`/posts/${article.slug}`}>
                            <Button color="primary">Visualizza Post</Button>
                        </Link>


                        <Button color="danger" onClick={() => handleConfirmDelete(article.id, index)}>Rimuovi</Button>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
}

export default ArticleList;
