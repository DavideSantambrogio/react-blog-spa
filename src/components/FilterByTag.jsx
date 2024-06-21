import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText, Button, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

const FilterByTags = ({ onSelect }) => {
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/tags');
                if (!response.ok) {
                    throw new Error('Errore nel recupero dei tag');
                }
                const tagsData = await response.json();
                setTags(tagsData);
            } catch (error) {
                console.error('Errore nel recupero dei tag:', error);
            }
        };

        fetchTags();
    }, []);

    useEffect(() => {
        const fetchPostsByTag = async () => {
            if (selectedTag) {
                try {
                    const response = await fetch(`http://localhost:3000/api/posts/tag/${selectedTag}`);
                    if (!response.ok) {
                        throw new Error('Errore nel recupero dei post per il tag');
                    }
                    const postsData = await response.json();
                    setFilteredPosts(postsData);
                } catch (error) {
                    console.error('Errore nel recupero dei post per il tag:', error);
                }
            }
        };

        fetchPostsByTag();
    }, [selectedTag]);

    const handleTagSelect = (event) => {
        const tagId = event.target.value;
        setSelectedTag(tagId);
        onSelect(tagId); // Chiamiamo la funzione onSelect passando il tagId selezionato
    };

    return (
        <div>
            <h2>Scegli un tag:</h2>
            <FormGroup>
                <Label for="tagSelect">Seleziona un tag:</Label>
                <Input type="select" name="select" id="tagSelect" value={selectedTag} onChange={handleTagSelect}>
                    <option value="">Scegli un tag...</option>
                    {tags.map(tag => (
                        <option key={tag.id} value={tag.id}>
                            {tag.name}
                        </option>
                    ))}
                </Input>
            </FormGroup>

            {selectedTag && (
                <div>
                    <p>Stai visualizzando i post per il tag: {tags.name}</p>
                    <div className="row">
                        {filteredPosts.map(post => (
                            <div key={post.id} className="col-6 mb-4">
                                <Card>
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

                                        <Link to={`/posts/${post.slug}`}>
                                            <Button color="primary">Visualizza Post</Button>
                                        </Link>

                                    </CardBody>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterByTags;
