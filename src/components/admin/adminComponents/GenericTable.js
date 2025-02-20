import { useState, useEffect, useRef } from "react"
import ReactDOM from "react-dom"
import Box from "@mui/joy/Box"
import Divider from "@mui/joy/Divider"
import Link from "@mui/joy/Link"
import Table from "@mui/joy/Table"
import Checkbox from "@mui/joy/Checkbox"
import IconButton from "@mui/joy/IconButton"
import Typography from "@mui/joy/Typography"
import Menu from "@mui/joy/Menu"
import MenuButton from "@mui/joy/MenuButton"
import MenuItem from "@mui/joy/MenuItem"
import Dropdown from "@mui/joy/Dropdown"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded"
import AllowedActions from "./AllowedActions"
import { Modal } from '@material-ui/core';


import { entitiesAndNames } from "../utils"
import { BeachForm } from "./Modals/BeachForm"
import { ExcelMessageModal } from "./Modals/ExcelMessageModal"
import { DeleteConfirmation } from "./Modals/DeleteConfirmation"

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import axios from "axios"
import { useNavigate } from "react-router-dom"

import { normalizeString } from "../utils"
import { useAdminData } from "contexts/AdminDataContext"
import { EntityFilter } from "../filterComponents/EntityFilters/EntityFilter"

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

const GenericTable = ({ entity, search }) => {
    const { getAdminData } = useAdminData();

    const [order, setOrder] = useState("desc");
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);

    // Estados para facilmente acessar os registos pelo ID selecionado.
    const [selectedIDsToDelete, setSelectedIDsToDelete] = useState([]);
    const [selectedIDToEdit, setSelectedIDToEdit] = useState(null);

    // Estados que controlagem a abertura dos Modals.
    const [deletetionModalOpen, setDeletetionModalOpen] = useState(false);
    const [editionModalOpen, setEditionModalOpen] = useState(false);
    const [excelMessageModal, setExcelMessageModal] = useState(false);

    const dataToExcelRef = useRef(null);
    let COLUMNS;
    
    useEffect(() => {
        const getData = async () => {
            const DATA = getAdminData(entity);
            console.log(DATA);
            if (search === '') {
                dataToExcelRef.current = DATA;
                setData(DATA);
            } else {
                const FILTERED_DATA = DATA.filter(record => {
                    return Object.values(record).some(value => {
                        return normalizeString(String(value).toLowerCase()).includes(normalizeString(search.toLowerCase()));
                    });
                });
                dataToExcelRef.current = FILTERED_DATA;
                setData(FILTERED_DATA);
            };
            COLUMNS = Object.keys(DATA[0]);
            setColumns(COLUMNS);
      };
      getData();
      setSelectedIDsToDelete([]);

      const newBeach = document.getElementsByClassName('MuiList-root MuiList-vertical MuiList-variantPlain MuiList-colorNeutral MuiList-nesting css-1jdlr5h-JoyList-root')[0] || null;
      const exportToExcelButton = document.getElementsByClassName('MuiButton-root MuiButton-variantSolid MuiButton-colorPrimary MuiButton-sizeSm css-ful1vf-JoyButton-root')[0] || null;

      if (newBeach) {
          newBeach.addEventListener('click', () => handleClickForEdit(null));
      };
    
      if (exportToExcelButton) {
          exportToExcelButton.addEventListener('click', exportToExcel);
      };

      return () => {
        if(newBeach) {
            newBeach.removeEventListener('click', () => handleClickForEdit(null));
        };
        if (exportToExcelButton) {
            exportToExcelButton.removeEventListener('click', exportToExcel);
        };
      };
    }, [entity, search]);
  
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
    
    const handleClickForDelete = (id) => {
        !selectedIDsToDelete.includes(id) && setSelectedIDsToDelete(prevIDs => [...prevIDs, id]);
        setDeletetionModalOpen(true);
    };

    const handleDelete = () => {
        if (selectedIDsToDelete.length > 0) {
            selectedIDsToDelete.forEach(ID => {
                deleteRecord(entity, ID);
            });
            setDeletetionModalOpen(false);
            setSelectedIDsToDelete([]);
            NAVIGATE(0);
        };
    };

    const handleClickForEdit = (id) => {
        setSelectedIDToEdit(id);
        setEditionModalOpen(true);
    };

    const handleEdition = () => {
        setEditionModalOpen(false);
        setSelectedIDToEdit(null);
    };

    const exportToExcel = () => {
        if (!Array.isArray(dataToExcelRef.current) || dataToExcelRef.current.length === 0) {
            setExcelMessageModal(true);
            return;
        };

        const worksheetData = XLSX.utils.json_to_sheet(dataToExcelRef.current); // Converte os dados JSON para dados em planilha.
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheetData, entitiesAndNames()[entity] /* Nome da entidade em Português */);
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { 
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' 
        });
        
        saveAs(blob, `${entitiesAndNames()[entity].toLowerCase()}.xlsx`);
    };

    const NAVIGATE = useNavigate();
    
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
                            selectedIDsToDelete.length > 0 && selectedIDsToDelete.length !== data.length
                        }
                        checked={selectedIDsToDelete.length === data.length}
                        onChange={event => {
                            setSelectedIDsToDelete (
                                event.target.checked ? data.map(row => row[columns[0]]) : []
                            );
                        }}
                        color={
                            selectedIDsToDelete.length > 0 || selectedIDsToDelete.length === data.length
                            ? "primary" : undefined
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
                        title={columns[0]}
                    >
                        {columns[0]}
                    </Link>
                    </th>
                    {Object.keys(columns).slice(1).map(index => (
                        <th key={index + columns[index]}
                            style={{ padding: "12px 6px" , textAlign: 'center', 
                                ...(columns[index] === 'Descrição' ? {width: '140px'} : {})
                            }}
                            title={columns[index]}
                        >
                            {columns[index]}
                        </th>
                    ))}
                    <th style={{ padding: "12px 6px" , textAlign: 'center'}} title="Ações">Ações</th>
                </tr>
                </thead>
                <tbody>
                {//[...rows].sort(getComparator(order, "id")).map(row => (
                [...data].sort(getComparator(order, columns[0])).map((row, index) => (
                    <tr key={row + index}>
                    {<td style={{ textAlign: "center", width: 120 }}>
                        <Checkbox
                            size="sm"
                            checked={selectedIDsToDelete.includes(row[columns[0]])}
                            color={selectedIDsToDelete.includes(row[columns[0]]) ? "primary" : undefined}
                            onChange={event => {
                                setSelectedIDsToDelete(ids =>
                                event.target.checked
                                    ? ids.concat(row[columns[0]])
                                    : ids.filter(itemId => itemId !== row[columns[0]])
                                )
                            }}
                            slotProps={{ checkbox: { sx: { textAlign: "left" } } }}
                            sx={{ verticalAlign: "text-bottom" }}
                        />
                    </td>}
                    {columns.map(column => (
                        <td key={column}>
                            {column === 'Descrição' || column === 'Email' ? (
                                <Typography level="body-xs"
                                    style={{
                                        textAlign: 'center', whiteSpace: 'nowrap', 
                                        overflow: 'hidden', textOverflow: 'ellipsis'
                                    }}
                                    title={row[column]}
                                >
                                    {row[column]}
                                </Typography>
                            ) : (
                                <Typography level="body-xs"
                                            style={{ textAlign: 'center' }}
                                            title={row[column]}>
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
                                deletionModalOpen={() => handleClickForDelete(row[columns[0]])}
                                editionModalOpen={() => handleClickForEdit(row[columns[0]])}
                            />
                        </Box>
                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Modal
                open={deletetionModalOpen}
                onClose={() => {
                    setDeletetionModalOpen(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >   
                <div>
                    <DeleteConfirmation 
                        entity={entity}
                        setSelectedIDsToDelete={setSelectedIDsToDelete}
                        selectedIDsToDelete={selectedIDsToDelete}
                        setDeletetionModalOpen={setDeletetionModalOpen}
                        handleDelete={handleDelete}
                    />
                </div>
            </Modal>
            <Modal
                open={editionModalOpen}
                onClose={() => setEditionModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div>
                    <BeachForm
                        entity={entity}
                        id={selectedIDToEdit}
                        setEditionModalOpen={setEditionModalOpen}
                        handleEdition={handleEdition}
                    />
                </div>
            </Modal>
            <Modal
                open={excelMessageModal}
                onClose={() => setExcelMessageModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div>
                    <ExcelMessageModal setExcelMessageModal={setExcelMessageModal} />,
                </div>
            </Modal>
        </>
    );
};

export default GenericTable;