
import React, { useState, useEffect } from "react";
import { Box, List, ListItemButton, ListItemIcon, ListSubheader, ListItemText, Collapse, Divider } from '@mui/material';
//import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import StarBorder from '@mui/icons-material/StarBorder';
import ChevronRight from '@mui/icons-material/ChevronRight';

import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


export default function Menu({ items, handleClick = Function.prototype, toggleMenu = true }) {

    const [open, setOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    var id = 0;

    useEffect(() => {
        setMenuOpen([]);
        setLevel(items, 1);
    }, [items])

    const setLevel = (data, level) => {

        (level === 1) && (id = 0)

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

            id++;
            item.id = id;
            item.level = level;
            setMenuOpen(prev => [...prev, { id: item.id, expand: false }])
            const lv = level + 1;
            if (item.children) {
                setLevel(item, lv);
            }


            return item;
        });

    }

    const handleOnButtonClick = (node) => {

        setSelectedId(node.id);

        if (node.children) {
            setOpen(!open);
            var menu = getMenu(node);
            menu.expand = !menu.expand;

            if (!menu.expand) {
                setExpand(node, false);
            }

        }

        handleClick(node);

    }

    const setExpand = (node, expand = false) => {

        node.children.map(child => {

            const menu = getMenu(child)
            menu.expand = expand;
            if (child.children) {
                setExpand(child, expand);
            }
            return child;
        })
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
                        inset={toggleMenu}
                        sx={{ 
                            fontSize: '1.2rem', 
                            fontWeight: "bold" 
                        }}
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

                    {toggleMenu && <ListItemText primary={node.name} />}
                    {node.children && (menu.expand ? <ExpandMore /> : <ChevronRight />)}

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
                sx={{
                    width: '400px',
                    minWidth: '250px',
                    position: 'sticky',
                    top: 0,
                    maxWidth: '500px',
                    display: `${!toggleMenu ? 'none' : ''}`,
                    bgcolor: 'background.paper'
                }}
                component="nav"
            >
                {
                    RootObject.children.map(node => buildListItem(node))
                }

            </List>
        );
    };

    const renderListMenu = () => {

        return (
            <Box>
                {DynamicNestedItems(items)}
            </Box>
        )

    }

    const renderTree = (nodes) => (
        <TreeItem 
            key={nodes.id} 
            nodeId={nodes.id} 
            label={nodes.name}
            disabled={false}
            
            >
          {Array.isArray(nodes.children)
            ? nodes.children.map((node) => renderTree(node))
            : null}
        </TreeItem>
      );

    const renderTreeMenu = (items) => {
        
        items.children.sort((a, b) => a.seqnr - b.seqnr);

        return (
            <Box sx={{ 
                position:'sticky',
                width: '400px',
                minWidth: '250px',
                top: 0,
                bgcolor: 'background.paper'
                 }}>
              <TreeView
                aria-label="rich object"
                defaultCollapseIcon={<ExpandMoreIcon />}              
                defaultExpandIcon={<ChevronRightIcon />}
              >
                {renderTree(items)}
              </TreeView>
            </Box>
          );
    }
    return (
        <React.Fragment>
            {renderListMenu(items)}
        </React.Fragment>
    )

}