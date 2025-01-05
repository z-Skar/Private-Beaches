import { useState, useEffect } from "react"
import Avatar from "@mui/joy/Avatar"
import Box from "@mui/joy/Box"
import Chip from "@mui/joy/Chip"
import Divider from "@mui/joy/Divider"
import Link from "@mui/joy/Link"
import Table from "@mui/joy/Table"
import Checkbox from "@mui/joy/Checkbox"
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton"
import Typography from "@mui/joy/Typography"
import Menu from "@mui/joy/Menu"
import MenuButton from "@mui/joy/MenuButton"
import MenuItem from "@mui/joy/MenuItem"
import Dropdown from "@mui/joy/Dropdown"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import CheckRoundedIcon from "@mui/icons-material/CheckRounded"
import BlockIcon from "@mui/icons-material/Block"
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded"
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded"
import Tooltip from '@mui/material/Tooltip';
import AllowedActions from "./AllowedActions"
import { Modal } from '@material-ui/core';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Button } from "@mui/joy"

import { getColumns } from "../utils"
import { useNavigate } from "react-router-dom"

function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Rename</MenuItem>
        <MenuItem>Move</MenuItem>
        <Divider />
        <MenuItem color="danger">Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
};

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

const GenericTable = ({ entity }) => {
    const [order, setOrder] = useState("desc");
    const [data, setData] = useState([{}]);
    const [selectedIDs, setSelectedIDs] = useState([]);

    // Control the opening of Modals.
    const [deletetionModalOpen, setDeletetionModalOpen] = useState(false);
    const [editionModalOpen, setEditionModalOpen] = useState(false)

    const navigate = useNavigate();
    
    useEffect(() => {
      const getData = async () => {
        try {
          const query_parameters = new URLSearchParams();
  
          const response = await fetch(`http://localhost:5000/${entity}/admin`); 
          const DATA = await response.json();
          setData(DATA);
        } catch (error) {
          console.error(error);
        };
      };
      getData();
      setSelectedIDs([]);
    }, [entity]);
  
    const deleteRecord = async (entity, id) => {
      try {
        const response = await fetch(`http://localhost:5000/${entity}/delete/${id}`, {
          method: 'DELETE',
        });
  
        if(!response.ok) {
          const error = await response.json();
          console.log(error);
        };
      } catch (error) {
        console.log('Fetch Error: ', error);
      };
    };
    
    const ENTITY_COLUMN_NAMES = getColumns(entity);
    const ENTITY_COLUMN_KEYS = data.length > 0 ? Object.keys(data[0]) : [];

    const handleClickForDelete = (id) => {
        !selectedIDs.includes(id) && setSelectedIDs(prevIDs => [...prevIDs, id]);
        setDeletetionModalOpen(true);
    };

    const handleDelete = () => {
        if (selectedIDs.length > 0) {
            selectedIDs.forEach(ID => {
                deleteRecord(entity, ID);
            });
            setDeletetionModalOpen(false);
            setData(prevData => prevData.filter(record => !selectedIDs.includes(record[ENTITY_COLUMN_KEYS[0]])));
            setSelectedIDs([]);
        };
    };

    const handleClickForEdit = (id) => {
        navigate(`/Profile/${entity}/${id}`);
    };

    return (
        <>
            <Table
                aria-labelledby="tableTitle"
                stickyHeader
                hoverRow
                sx={{
                "--TableCell-headBackground":
                    "var(--joy-palette-background-level1)",
                "--Table-headerUnderlineThickness": "1px",
                "--TableRow-hoverBackground":
                    "var(--joy-palette-background-level1)",
                "--TableCell-paddingY": "4px",
                "--TableCell-paddingX": "8px"
                }}
            >
                <thead>
                <tr>
                    {<th
                    style={{ width: 'auto', textAlign: "center", padding: "12px 6px" }}
                    >
                    <Checkbox
                        size="sm"
                        indeterminate={
                        selectedIDs.length > 0 && selectedIDs.length !== data.length
                        }
                        checked={selectedIDs.length === data.length}
                        onChange={event => {
                        setSelectedIDs(
                            event.target.checked ? data.map(row => row[ENTITY_COLUMN_KEYS[0]]) : []
                        )
                        }}
                        color={
                        selectedIDs.length > 0 || selectedIDs.length === data.length
                            ? "primary"
                            : undefined
                        }
                        sx={{ verticalAlign: "text-bottom" }}
                    />
                    </th>}
                    <th style={{ width: 'auto', padding: "12px 6px", textAlign: 'center'}}>
                    <Link
                        underline="none"
                        textColor="#ff5a00"
                        component="button"
                        onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                        endDecorator={<ArrowDropDownIcon />}
                        sx={[
                        {
                            fontWeight: "lg",
                            "& svg": {
                            transition: "0.2s",
                            transform:
                                order === "desc" ? "rotate(0deg)" : "rotate(180deg)"
                            }
                        },
                        order === "desc"
                            ? { "& svg": { transform: "rotate(0deg)" } }
                            : { "& svg": { transform: "rotate(180deg)" } }
                        ]}
                    >
                        {ENTITY_COLUMN_NAMES[0].title}
                    </Link>
                    </th>
                    {Object.keys(ENTITY_COLUMN_NAMES).slice(1).map(index => (
                        <th key={index + ENTITY_COLUMN_NAMES[index].field}
                            style={{ padding: "12px 6px" , textAlign: 'center', 
                                ...(ENTITY_COLUMN_NAMES[index].title === 'DESCRIÇÃO' ? {width: '140px'} : {})
                            }}
                        >
                            {ENTITY_COLUMN_NAMES[index].title}
                        </th>
                    ))}
                    <th style={{ padding: "12px 6px" , textAlign: 'center'}}>Ações</th>
                </tr>
                </thead>
                <tbody>
                {//[...rows].sort(getComparator(order, "id")).map(row => (
                [...data].sort(getComparator(order, ENTITY_COLUMN_KEYS[0])).map((row, index) => (
                    <tr key={row + index}>
                    {<td style={{ textAlign: "center", width: 120 }}>
                        <Checkbox
                        size="sm"
                        checked={selectedIDs.includes(row[ENTITY_COLUMN_KEYS[0]])}
                        color={selectedIDs.includes(row[ENTITY_COLUMN_KEYS[0]]) ? "primary" : undefined}
                        onChange={event => {
                            setSelectedIDs(ids =>
                            event.target.checked
                                ? ids.concat(row[ENTITY_COLUMN_KEYS[0]])
                                : ids.filter(itemId => itemId !== row[ENTITY_COLUMN_KEYS[0]])
                            )
                        }}
                        slotProps={{ checkbox: { sx: { textAlign: "left" } } }}
                        sx={{ verticalAlign: "text-bottom" }}
                        />
                    </td>}
                    {ENTITY_COLUMN_KEYS.map(column => (
                        <td key={column}>
                            {column === 'DESCRIPTION' ? (
                                <Typography level="body-xs"
                                    style={{
                                        textAlign: 'center', whiteSpace: 'nowrap', 
                                        overflow: 'hidden', textOverflow: 'ellipsis'
                                    }}
                                >
                                    {row[column]}
                                </Typography>
                            ) : (
                                <Typography level="body-xs" style={{ textAlign: 'center' }}>
                                    {row[column]}
                                </Typography>
                            )}
                        </td>
                    ))}
                    {/*<td>
                        <Typography level="body-xs">{row.date}</Typography>
                    </td>
                    <td>
                        <Chip
                        variant="soft"
                        size="sm"
                        startDecorator={
                            {
                            Paid: <CheckRoundedIcon />,
                            Refunded: <AutorenewRoundedIcon />,
                            Cancelled: <BlockIcon />
                            }[row.status]
                        }
                        color={
                            {
                            Paid: "success",
                            Refunded: "neutral",
                            Cancelled: "danger"
                            }[row.status]
                        }
                        >
                        {row.status}
                        </Chip>
                    </td>
                    <td>
                        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                        <Avatar size="sm">{row.customer.initial}</Avatar>
                        <div>
                            <Typography level="body-xs">
                            {row.customer.name}
                            </Typography>
                            <Typography level="body-xs">
                            {row.customer.email}
                            </Typography>
                        </div>
                        </Box>
                    </td>*/}
                    <td>
                        <Box sx={{ display: "flex", gap: 2, alignItems: "center", justifyContent: 'center'}}>
                            <AllowedActions entity={entity} 
                                deletionModalOpen={() => handleClickForDelete(row[ENTITY_COLUMN_KEYS[0]])}
                                editionModalOpen={() => handleClickForEdit(row[ENTITY_COLUMN_KEYS[0]])}
                            />
                        </Box>
                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Modal
                open={deletetionModalOpen}
                onClose={() => setDeletetionModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    backgroundColor: 'white',
                    border: '2px solid #ACACAC',
                    borderRadius: '10px',
                    boxShadow: 24,
                    p: 4,
                    width: '25%',
                    padding: '0.5rem 0.5rem 0.5rem 0.5rem'
                }}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" fontFamily={'sans-serif'} fontWeight={'bold'}>
                            Tens a certeza que desejas eliminar o registo?
                        </Typography>
                        <IconButton>
                            <CloseRoundedIcon onClick={() => setDeletetionModalOpen(false)}/>
                        </IconButton>
                    </div>
                    <Typography id="modal-modal-title" variant="h6" component="h2" fontFamily={'sans-serif'}>
                        Esta ação é <Typography textColor="#C80000">IRREVERSÍVEL</Typography> e não pode ser desfeita, além disso, tabelas relacionadas poderão ter os seus registos alterados ou excluídos.
                    </Typography>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem'}}>
                        <Button sx={{
                            backgroundColor: '#a0aec0 !important',
                            color: 'white',
                            width: '40%',
                            '&:hover': {
                                backgroundColor: '#718096 !important',
                                transition: 'background-color 300ms !important',
                            },
                        }} onClick={() => setDeletetionModalOpen(false)}
                        >
                            CANCELAR
                        </Button>
                        <Button sx={{
                            backgroundColor: '#FF0000 !important',
                            color: 'white',
                            width: '40%',
                            '&:hover': {
                                backgroundColor: '#C80000 !important',
                                transition: 'background-color 300ms !important',
                            },
                        }} onClick={handleDelete}
                        >
                            APAGAR
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default GenericTable;