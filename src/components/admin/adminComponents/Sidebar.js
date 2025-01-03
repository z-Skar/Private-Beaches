import * as React from "react"
import GlobalStyles from "@mui/joy/GlobalStyles"
import Avatar from "@mui/joy/Avatar"
import Box from "@mui/joy/Box"
import Button from "@mui/joy/Button"
import Card from "@mui/joy/Card"
import Chip from "@mui/joy/Chip"
import Divider from "@mui/joy/Divider"
import IconButton from "@mui/joy/IconButton"
import Input from "@mui/joy/Input"
import LinearProgress from "@mui/joy/LinearProgress"
import List from "@mui/joy/List"
import ListItem from "@mui/joy/ListItem"
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton"
import ListItemContent from "@mui/joy/ListItemContent"
import Typography from "@mui/joy/Typography"
import Sheet from "@mui/joy/Sheet"
import Stack from "@mui/joy/Stack"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded"
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded"
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded"
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded"
import BeachAccessRoundedIcon from '@mui/icons-material/BeachAccessRounded';
import AddCardRoundedIcon from '@mui/icons-material/AddCardRounded';
import GroupRoundedIcon from "@mui/icons-material/GroupRounded"
import ReceiptIcon from '@mui/icons-material/Receipt';
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded"
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded"
import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import logo from "../../../images/logo192.png";

import { closeSidebar } from "../utils"

function Toggler({ defaultExpanded = false, renderToggle, children }) {
  const [open, setOpen] = React.useState(defaultExpanded);


  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={[
          {
            display: "grid",
            transition: "0.2s ease",
            "& > *": {
              overflow: "hidden"
            }
          },
          open ? { gridTemplateRows: "1fr" } : { gridTemplateRows: "0fr" }
        ]}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function Sidebar({ selectedEntity, onSelectEntity }) {
  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none"
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider"
      }}
    >
      <GlobalStyles
        styles={theme => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px"
            }
          }
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs:
              "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)"
          }
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <IconButton variant="soft" color="primary" size="sm">
          <BrightnessAutoRoundedIcon />
        </IconButton>
        <Typography level="title-lg">Tropical Dreams</Typography>
      </Box>
      <Input
        size="sm"
        startDecorator={<SearchRoundedIcon />}
        placeholder="Pesquisar"
      />
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5
          }
        }}
      >
        <List size="sm" sx={{ gap: 1, "--List-nestedInsetStart": "30px", "--ListItem-radius": theme => theme.vars.radius.sm }}>
          <ListItem key='home'>
            <ListItemButton
              selected={selectedEntity === 'home' && true}
              onClick={() => onSelectEntity('home')}
            >
              <HomeRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Home</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem key='beaches'>
            <ListItemButton
              selected={selectedEntity === 'beaches' && true}
              onClick={() => onSelectEntity('beaches')}
            >
              <BeachAccessRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Praias</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem key='reservations'>
            <ListItemButton
              selected={selectedEntity === 'reservations' && true}
              onClick={() => onSelectEntity('reservations')}
            >
              <ReceiptIcon />
              <ListItemContent>
                <Typography level="title-sm">Reservas</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem nested key='lifeguards'>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton
                  selected={selectedEntity === 'lifeguards' && true}
                  onClick={() => {
                    setOpen(!open)
                    onSelectEntity('lifeguards')
                  }}
                >
                  <SupportRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Salva-vidas</Typography>
                  </ListItemContent>
                  {/*<KeyboardArrowDownIcon
                    sx={[
                      open
                        ? {
                            transform: "rotate(180deg)"
                          }
                        : {
                            transform: "none"
                          }
                    ]}
                  />*/}
                </ListItemButton>
              )}
            >
              {/*<List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton>All tasks</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Backlog</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>In progress</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Done</ListItemButton>
                </ListItem>
              </List>*/}
            </Toggler>
          </ListItem>
          <ListItem key='bills'>
            <ListItemButton
                selected={selectedEntity === 'bills' && true}
                onClick={() => onSelectEntity('bills')}
            >
              <AddCardRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Pagamentos</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem key='evaluations'>
            <ListItemButton
              role="menuitem"
              component="a"
              selected={selectedEntity === 'evaluations' && true}
              onClick={() => onSelectEntity('evaluations')}
            >
              <QuestionAnswerRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Avaliações</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem nested key='clients'>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton
                  selected={selectedEntity === 'clients' && true}
                  onClick={() => {
                    setOpen(!open)
                    onSelectEntity('clients')
                  }}
                >
                  <GroupRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Clientes</Typography>
                  </ListItemContent>
                  {/*<KeyboardArrowDownIcon
                    sx={[
                      open ? { transform: "rotate(180deg)" } : { transform: "none" }
                    ]}
                  />*/}
                </ListItemButton>
              )}
            >
              {/*<List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton
                    role="menuitem"
                    component="a"
                  >
                    My profile
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Create a new user</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Roles & permission</ListItemButton>
                </ListItem>
              </List>*/}
            </Toggler>
          </ListItem>
        </List>
        <List
          size="sm"
          sx={{
            mt: "auto",
            flexGrow: 0,
            "--ListItem-radius": theme => theme.vars.radius.sm,
            "--List-gap": "8px",
            //mb: 2
          }}
        >
          {/*<ListItem>
            <ListItemButton>
              <SupportRoundedIcon />
              Support
            </ListItemButton>
          </ListItem>*/}
          <ListItem>
            <ListItemButton>
              <SettingsRoundedIcon />
              Definições
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        {/*<Avatar
          variant="outlined"
          size="sm"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">Siriwat K.</Typography>
          <Typography level="body-xs">siriwatk@test.com</Typography>
        </Box>
        <IconButton size="sm" variant="plain" color="neutral">
          <LogoutRoundedIcon />
        </IconButton>*/}
        <Typography level="title-md">Placeholder -- versão 1.0</Typography>
      </Box>
    </Sheet>
  )
}
