
import React, { useState, useEffect } from "react";
import { Box, List, ListItemButton, ListItemIcon, ListSubheader, ListItemText, Collapse, Divider } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import StarBorder from '@mui/icons-material/StarBorder';


export default function Menu({ items, handleClick = Function.prototype }) {

    const [open, setOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        setMenuOpen([]);
        setLevel(items, 1);
    }, [items])

    const setLevel = (data, level) => {

        data.children.map(item => {

            switch (level) {
                case 1:
                    item.icon = <StarBorder color="primary" />
                    break;
                case 2:
                    item.icon = <DraftsIcon color="primary" />
                    break;
                case 3:
                    item.icon = <InboxIcon color="primary" />
                    break;
                case 4:
                    item.icon = <SendIcon color="primary" />
                    break;
                default:
                    item.icon = <InboxIcon color="primary" />
            }

            item.level = level;
            setMenuOpen(prev => [...prev, { id: item.id, expand: false }])
            const lv = level + 1;
            if (item.children) {
                setLevel(item, lv);
            }
            return item;
        })

    }

    const handleOnButtonClick = (node) => {

        setSelectedId(node.id);

        if (node.children) {
            setOpen(!open);
            var menu = getMenu(node);
            menu.expand = !menu.expand;
        } else {

            handleClick(node);
        }

    }

    const getMenu = (node) => {

        var menu = null;
        if ('id' in node) {
            menu = menuOpen.find(item => item.id === node.id);
        }

        if (!menu) {
            menu = { id: null, expand: false };
        }

        return menu;
    }
    const buildListItem = (node, styles = {}) => {

        var menu = getMenu(node);

        return (
            <div key={node.id}>

                {node.subheader &&
                    <ListSubheader
                        component="div"
                        color="primary"
                        inset
                        sx={{ fontSize: '1rem' }}
                    >
                        {node.subheader}
                    </ListSubheader>
                }

                <ListItemButton

                    sx={styles}
                    onClick={() => handleOnButtonClick(node)}
                    dense={false}
                    selected={selectedId === node.id}
                    title={node.name}
                >
                    <ListItemIcon>
                        {node.icon}
                    </ListItemIcon>

                    <ListItemText primary={node.name} />

                    {node.children && (menu.expand ? <ExpandLess /> : <ExpandMore />)}

                </ListItemButton>

                {node.children && buildSubMenu(node)}

                {node.divider && <Divider sx={{ mb: 1 }} />}
            </div>

        )
    }

    const buildSubMenu = (node) => {

        if (node) {
            node.children.sort((a, b) => a.seqnr - b.seqnr)
            var menu = getMenu(node);
            return (
                <Collapse in={menu.expand} timeout="auto" unmountOnExit>
                    <List component="div">
                        {
                            node.children.map(item => buildListItem(item, { pl: node.level * 4 }))
                        }
                    </List>
                </Collapse>
            )
        }

    }

    const DynamicNestedItems = (RootObject) => {

        RootObject.children.sort((a, b) => a.seqnr - b.seqnr);

        return (
            <List
                sx={{ width: '350px', height: '100%', maxWidth: 560, bgcolor: 'background.paper' }}
                component="nav"
            /* subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Menu
                </ListSubheader>
            } */
            >
                {
                    RootObject.children.map(node => buildListItem(node))
                }

            </List>
        );
    };

    return (
        <Box>
            {DynamicNestedItems(items)}
        </Box>
    )

}