import React from 'react';
import FilterByTag from '../src/components/FilterByTag';
import { Link } from 'react-router-dom'; 
import { Button } from 'reactstrap';

function FilterPage() {
  const handleTagSelect = (tagId) => {
    // Qui puoi implementare la logica per filtrare i post in base al tag selezionato
    console.log(`Hai selezionato il tag con ID: ${tagId}`);
    // Esegui altre azioni necessarie, come aggiornare lo stato dei post filtrati, ecc.
  };

  return (
    <div>
       <Link to={`/`}>
        <Button color="secondary">Torna alla Pagina iniziale</Button>
      </Link>
      <h1>Filtra post</h1>
      <FilterByTag onSelect={handleTagSelect} /> {/* Passiamo la funzione onSelect */}
    </div>
  );
}

export default FilterPage;
