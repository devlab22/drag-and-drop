
import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import update from 'immutability-helper';
import { default as CardList} from './components/CardList';
import { Box } from '@mui/material';

import DB from './data/db.json';

function App() {

  const [cards, setCards] = useState([])

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = cards[dragIndex]
      setCards(
        update(cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        }),
      )
    },
    [cards],
  )

  useEffect(() => {

    setCards(DB.data.sort((a,b) => a.seqnr - b.seqnr))
  }, [])

  const onRatingUpload = (id, rating) => {
    console.log(`id: ${id} rating: ${rating}`)

    cards.map(card => {
       
       if(card.id === id){
        card.rating = rating
       }

       return card;
    })

    
    
  }

  return (
    <Box
      sx={{mt: '25px'}}
      >
        <CardList items={cards} onRatingUpload={onRatingUpload}/>
    </Box>
  );
}

export default App;
