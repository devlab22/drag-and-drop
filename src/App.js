
import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import update from 'immutability-helper';
import CardList from './components/CardList';
import MessageDialog from './components/MessageDialog';
import Menu from './components/Menu';
import ToolBar from './components/Toolbar';
import { Box, Stack } from '@mui/material';

import DB from './data/db.json';

function App() {

  const [toggleMenu, setToggleMenu] = useState(true)
  const [severity, setSeverity] = useState('info')
  const [cards, setCards] = useState([])
  const [msgOpen, setMsgOpen] = useState(false);
  const [msg, setMsg] = useState();
  const [title, setTitle] = useState('')
  const [msgTitle, setMsgTitle] = useState('')
  const [menu, setMenu] = useState(
    {
      "id": 0,
      "name": "root",
      "children": [
        {
          "id": 1,
          "name": 'Item 1',
          "subheader": "Configure",
          "seqnr": 1,
          "children": [
            {
              "id": 0,
              "name": 'Item 1.1',
              "seqnr": 1,
            },
            {
              "id": 7,
              "name": 'Item 1.2',
              "seqnr": 2,
            }
          ]
        },
        {
          "id": 2,
          "name": 'Item 2',
          "seqnr": 2,
          "divider": true,
          "children": [
            {
              "id": 5,
              "name": 'Item 2.1',
              "seqnr": 1,
              "children": [
                {
                  "id": 10,
                  "name": 'Item 2.1.1',
                  "seqnr": 1,
                  "children": [
                    {
                      "id": 11,
                      "name": 'Item 2.1.1.1',
                      "seqnr": 1,
                      "children": [
                        {
                          "id": 11,
                          "name": 'Item 2.1.1.1',
                          "seqnr": 1,
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": 3,
          "name": 'Item 3',
          "seqnr": 3,
          "subheader": "Reporting",
          "children": [
            {
              "id": 12,
              "name": 'Item 3.1',
              "seqnr": 1,
            }
          ]
        }
      ]
    })


  const showPopup = (message, title, severity='info') => {
    setMsg(message);
    setMsgTitle(title);
    setSeverity(severity)
    setMsgOpen(true);
  }
  const handleOnMenuClick = (props) => {

   // showPopup(`id: ${props.id} name: ${props.name}`, 'Menu Item')
    if(props.children){
      return;
    }
    setTitle(props.name);
  }
  const moveCard = useCallback(
    (drag, drop) => {

      const dragCard = cards[drag]

      setCards(
        update(cards, {
          $splice: [
            [drag, 1],
            [drop, 0, dragCard],
          ],
        }),
      )
    },
    [cards],

  )

  const onMoveCard = (drag, drop) => {

    const dragCard = cards[drag]
    var items = update(cards, {
      $splice: [
        [drag, 1],
        [drop, 0, dragCard],
      ],
    })

    setCards(items)

  }

  useEffect(() => {

    setCards(DB.data)


  }, [])

  const onRatingUpload = (id, rating) => {

    const card = cards.find(item => item.id === id);
    card.rating = rating;

    //setMsg([`id: ${id}`, `rating: ${rating}`])
    showPopup(`${card.title} => rating: ${rating}`, 'Rating')

  }

  const handleMenuClick = () => {
    setToggleMenu(!toggleMenu)
  }

  return (
    <Box>

      {msgOpen &&
        <MessageDialog
          toggle={msgOpen}
          title={msgTitle}
          messages={msg}
          severity={severity}
          width='500px'
          onReject={() => setMsgOpen(false)}
        />
      }

      <ToolBar handleMenuClick={handleMenuClick} title={title} />
      <Stack
        flexDirection='row'
      >

        {/* {toggleMenu && <Menu items={menu} handleClick={handleOnMenuClick} />} */}
        <Menu items={menu} handleClick={handleOnMenuClick} toggleMenu={toggleMenu}/>
        <CardList
          items={cards}
          onRatingUpload={onRatingUpload}
          moveCard={onMoveCard}
        />
      </Stack>
    </Box>
  );
}

export default App;
