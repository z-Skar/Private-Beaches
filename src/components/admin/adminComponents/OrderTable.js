/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Box from "@mui/joy/Box"
import Button from "@mui/joy/Button"
import Divider from "@mui/joy/Divider"
import FormControl from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import Input from "@mui/joy/Input"
import Modal from "@mui/joy/Modal"
import ModalDialog from "@mui/joy/ModalDialog"
import ModalClose from "@mui/joy/ModalClose"
import Select from "@mui/joy/Select"
import Option from "@mui/joy/Option"
import Sheet from "@mui/joy/Sheet"
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton"
import Typography from "@mui/joy/Typography"
import { CityFilter } from "../filterComponents/City"

import FilterAltIcon from "@mui/icons-material/FilterAlt"
import SearchIcon from "@mui/icons-material/Search"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import GenericTable from "./GenericTable"
import { searchText } from "../utils";
import { EntityFilter } from "../filterComponents/EntityFilters/EntityFilter"

const rows = [
  {
    id: "INV-1234",
    date: "Feb 3, 2023",
    status: "Refunded",
    customer: {
      initial: "O",
      name: "Olivia Ryhe",
      email: "olivia@email.com"
    }
  },
  {
    id: "INV-1233",
    date: "Feb 3, 2023",
    status: "Paid",
    customer: {
      initial: "S",
      name: "Steve Hampton",
      email: "steve.hamp@email.com"
    }
  },
  {
    id: "INV-1232",
    date: "Feb 3, 2023",
    status: "Refunded",
    customer: {
      initial: "C",
      name: "Ciaran Murray",
      email: "ciaran.murray@email.com"
    }
  },
  {
    id: "INV-1231",
    date: "Feb 3, 2023",
    status: "Refunded",
    customer: {
      initial: "M",
      name: "Maria Macdonald",
      email: "maria.mc@email.com"
    }
  },
  {
    id: "INV-1230",
    date: "Feb 3, 2023",
    status: "Cancelled",
    customer: {
      initial: "C",
      name: "Charles Fulton",
      email: "fulton@email.com"
    }
  },
  {
    id: "INV-1229",
    date: "Feb 3, 2023",
    status: "Cancelled",
    customer: {
      initial: "J",
      name: "Jay Hooper",
      email: "hooper@email.com"
    }
  },
  {
    id: "INV-1228",
    date: "Feb 3, 2023",
    status: "Refunded",
    customer: {
      initial: "K",
      name: "Krystal Stevens",
      email: "k.stevens@email.com"
    }
  },
  {
    id: "INV-1227",
    date: "Feb 3, 2023",
    status: "Paid",
    customer: {
      initial: "S",
      name: "Sachin Flynn",
      email: "s.flyn@email.com"
    }
  },
  {
    id: "INV-1226",
    date: "Feb 3, 2023",
    status: "Cancelled",
    customer: {
      initial: "B",
      name: "Bradley Rosales",
      email: "brad123@email.com"
    }
  },
  {
    id: "INV-1225",
    date: "Feb 3, 2023",
    status: "Paid",
    customer: {
      initial: "O",
      name: "Olivia Ryhe",
      email: "olivia@email.com"
    }
  },
  {
    id: "INV-1224",
    date: "Feb 3, 2023",
    status: "Cancelled",
    customer: {
      initial: "S",
      name: "Steve Hampton",
      email: "steve.hamp@email.com"
    }
  },
  {
    id: "INV-1223",
    date: "Feb 3, 2023",
    status: "Paid",
    customer: {
      initial: "C",
      name: "Ciaran Murray",
      email: "ciaran.murray@email.com"
    }
  },
  {
    id: "INV-1221",
    date: "Feb 3, 2023",
    status: "Refunded",
    customer: {
      initial: "M",
      name: "Maria Macdonald",
      email: "maria.mc@email.com"
    }
  },
  {
    id: "INV-1220",
    date: "Feb 3, 2023",
    status: "Paid",
    customer: {
      initial: "C",
      name: "Charles Fulton",
      email: "fulton@email.com"
    }
  },
  {
    id: "INV-1219",
    date: "Feb 3, 2023",
    status: "Cancelled",
    customer: {
      initial: "J",
      name: "Jay Hooper",
      email: "hooper@email.com"
    }
  },
  {
    id: "INV-1218",
    date: "Feb 3, 2023",
    status: "Cancelled",
    customer: {
      initial: "K",
      name: "Krystal Stevens",
      email: "k.stevens@email.com"
    }
  },
  {
    id: "INV-1217",
    date: "Feb 3, 2023",
    status: "Paid",
    customer: {
      initial: "S",
      name: "Sachin Flynn",
      email: "s.flyn@email.com"
    }
  },
  {
    id: "INV-1216",
    date: "Feb 3, 2023",
    status: "Cancelled",
    customer: {
      initial: "B",
      name: "Bradley Rosales",
      email: "brad123@email.com"
    }
  }
]

export default function OrderTable({ entity, entityName }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  return (
    <>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{ display: { xs: "flex", sm: "none" }, my: 1, gap: 1 }}
      >
        <Input
          size="sm"
          placeholder="Pesquisar"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <FilterAltIcon />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <EntityFilter entity={entity} />
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          justifyContent: 'space-between',
          flexWrap: "wrap",
          "& > *": {
            minWidth: { xs: "120px", md: "160px" }
          },
          width: '100%',
        }}
      >
        {entity !== 'bills' && (
          <FormControl sx={{ display: 'flex' }} size="sm">
            <FormLabel>Pesquisa por {entityName}</FormLabel>
            <Input
              id="GeneralInputFilter"
              size="sm"
              placeholder={searchText(entity)}
              onChange={(e) => {
                setSearch((e.target.value).trim());
              }}
              startDecorator={<SearchIcon />}
              sx={entity !== 'evaluations' ? { minWidth: '25rem', marginBottom: '1rem' } : { minWidth: '25rem' }}
            />
          </FormControl>
        )}
        <EntityFilter entity={entity} />
      </Box>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: "block",
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0
        }}
      >
        <GenericTable entity={entity} search={search} />
      </Sheet>
      {/*
      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
          display: {
            xs: "none",
            md: "flex"
          }
        }}
      >
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          startDecorator={<KeyboardArrowLeftIcon />}
        >
          Anterior
        </Button>

        <Box sx={{ flex: 1 }} />
        {["1"].map(page => (
          <IconButton
            key={page}
            size="sm"
            variant={Number(page) ? "outlined" : "plain"}
            color="neutral"
          >
            {page}
          </IconButton>
        ))}
        <Box sx={{ flex: 1 }} />
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          endDecorator={<KeyboardArrowRightIcon />}
        >
          Próximo
        </Button>
      </Box>
      */}
    </>
  )
};