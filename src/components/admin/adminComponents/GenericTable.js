import * as React from "react"
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

import { getColumns } from "../utils"

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
  )
}

const GenericTable = ({ entity, entityData }) => {
    const [selected, setSelected] = React.useState([]);
    const [order, setOrder] = React.useState("desc");

    const ENTITY_COLUMN_NAMES = getColumns(entity);
    const ENTITY_COLUMN_KEYS = Object.keys(entityData[0]);

    return (
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
                {/*<th
                style={{ width: 48, textAlign: "center", padding: "12px 6px" }}
                >
                <Checkbox
                    size="sm"
                    indeterminate={
                    selected.length > 0 && selected.length !== entityData.length
                    }
                    checked={selected.length === entityData.length}
                    onChange={event => {
                    setSelected(
                        event.target.checked ? entityData.map(row => row.id) : []
                    )
                    }}
                    color={
                    selected.length > 0 || selected.length === entityData.length
                        ? "primary"
                        : undefined
                    }
                    sx={{ verticalAlign: "text-bottom" }}
                />
                </th>*/}
                <th style={{ width: 'auto', padding: "12px 6px", textAlign: 'center'}}>
                <Link
                    underline="none"
                    color="primary"
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
                    <th
                        key={ENTITY_COLUMN_NAMES[index].field}
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
            entityData.map((row, index) => (
                <tr key={row[ENTITY_COLUMN_KEYS[index]]}>
                {/*<td style={{ textAlign: "center", width: 120 }}>
                    <Checkbox
                    size="sm"
                    checked={selected.includes(row.id)}
                    color={selected.includes(row.id) ? "primary" : undefined}
                    onChange={event => {
                        setSelected(ids =>
                        event.target.checked
                            ? ids.concat(row.id)
                            : ids.filter(itemId => itemId !== row.id)
                        )
                    }}
                    slotProps={{ checkbox: { sx: { textAlign: "left" } } }}
                    sx={{ verticalAlign: "text-bottom" }}
                    />
                </td>*/}
                {ENTITY_COLUMN_KEYS.map(column => (
                    <td>
                        <Typography 
                            level="body-xs"
                            style={{
                                textAlign: 'center',
                                ...(column === 'DESCRIPTION' ? { whiteSpace: 'nowrap', 
                                    overflow: 'hidden', textOverflow: 'ellipsis'} : {})
                            }}
                        >
                            {row[column]}
                        </Typography>
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
                    <Link level="body-xs" component="button">
                        Editar
                    </Link>
                    <RowMenu />
                    </Box>
                </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default GenericTable;