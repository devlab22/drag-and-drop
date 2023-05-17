
import './App.css';
import React, { useState, useCallback } from 'react'
import { default as CardList} from './components/CardList';
import { Box } from '@mui/material';

function App() {

  const [cards, setCards] = useState([
    {
      id: 1,
      text: 'Write a cool JS library',
      title: 'Java Script',
      poster: '/img/network.png'
    },
    {
      id: 2,
      text: 'Make it generic enough',
      title: 'Java Script',
      poster: '/img/network.png'
    },
    {
      id: 3,
      text: 'Write README',
      title: 'Java Script',
      poster: '/img/network.png'
    },
    {
      id: 4,
      text: 'Create some examples',
      title: 'Java Script',
      poster: '/img/network.png'
    },
    {
      id: 5,
      text:
        'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
        title: 'Java Script',
        poster: '/img/network.png'
    },
    {
      id: 6,
      text: '???',
      title: 'Java Script',
      poster: '/img/network.png'
    },
    {
      id: 7,
      text: 'PROFIT',
      title: 'Java Script',
      poster: '/img/network.png'
    },
  ])

  return (
    <Box
      sx={{mt: '25px'}}
      >
        <CardList items={cards}/>
    </Box>
  );
}

export default App;
