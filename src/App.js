import React, { useEffect, useCallback, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useDispatch, useSelector } from 'react-redux';
import { retrieveChampions } from './ducks/championsSlice';
import  { setNameCriteria } from './ducks/filteringSlice';

import Container from 'react-bootstrap/Container';
import Figure from 'react-bootstrap/Figure';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import chunk from 'lodash.chunk';
import { ROOT_LOL_API } from './const';

function App() {
  const dispatch = useDispatch();
  const {
    isLoading,
    isError,
    items: champions,

  } = useSelector(state => state.champions);

  const nameCriteria = useSelector(state => state.filtering.nameCriteria);
  const [selectedChampionId, setSelectedChampionId] = useState(null);

  useEffect(() => {
    dispatch(retrieveChampions());
  }, [dispatch]);

  if(isLoading) {
    return <p>Calmai, pow! Ta carregando</p>
  }

  if(isError){
    return <p>Eita, deu ruim...</p>
  }

  const filteredChampions = champions.filter(c => c.name.toLowerCase().includes(nameCriteria.toLowerCase()));
  const championsRows = chunk(filteredChampions, 3);

  return (
    <div>
      <Container as="header">
        <h1>Escolha seu campeão...</h1>
      </Container>
      <Container>
        <ChampionFilteringForm />
      </Container>
      <Container>
        {championsRows.map((champions, index) => (
          <Row key={index}>
            {champions.map(champion => (
              <Col key={champion.id} onClick={() => setSelectedChampionId(champion.id)}>
                <Figure>
                  <Figure.Image
                    width={champion.image.w}
                    height={champion.image.h}
                    alt={`Foto de ${champion.name}`}
                    src={`${ROOT_LOL_API}/${champion.image.full}`}
                  />
                  <Figure.Caption>
                    {champion.name}
                  </Figure.Caption>
                </Figure>
              </Col>
            ))}
          </Row>
        ))}
      </Container>
      {selectedChampionId && 
        <ChampionsDetailsDialog 
          championId={selectedChampionId}
          onClose={() => setSelectedChampionId(null)}  
        />
      }
    </div>
  );
}

const ChampionFilteringForm = () => {
  const dispatch = useDispatch();

  const handleNameChange = useCallback((e) => {
    dispatch(setNameCriteria(e.target.value));
  }, [dispatch]);

  return (
    <Form>
      <Form.Group controlId="nameCriteria">
        <Form.Label>Filtro por nome</Form.Label>
        <Form.Control onChange={handleNameChange} />
      </Form.Group>
    </Form>
  );
};

const ChampionsDetailsDialog = ({championId, onClose}) => {
  const champion = useSelector(state => state.champions.items.find(c => c.id === championId));

  return(
    <Modal onHide={onClose} show>
      <Modal.Header closeButton>
        <Modal.Title>{champion.name}, {champion.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{champion.blurb}</Modal.Body>
    </Modal>
  )
};

export default App;
