import { useState } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

import Sidebar from './adminComponents/Sidebar';
import OrderTable from './adminComponents/OrderTable';
import OrderList from './adminComponents/OrderList';
import Header from './adminComponents/Header';
import AnimationRevealPage from 'helpers/AnimationRevealPage';
import Content from './adminComponents/ContentRenderer';
import { entitiesAndNames } from './utils';

export default function AdminDashbord() {
  const [selectedEntity, setSelectedEntity] = useState('home');
  const ENTITIES_NAMES = entitiesAndNames();

  return (
    <CssVarsProvider>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh'}}>
        
        <Sidebar selectedEntity={selectedEntity} onSelectEntity={setSelectedEntity}/>
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: 'calc(12px + var(--Header-height))',
              sm: 'calc(12px + var(--Header-height))',
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Breadcrumbs
              size="sm"
              aria-label="breadcrumbs"
              separator={<ChevronRightRoundedIcon fontSize="sm" />}
              sx={{ pl: 0 }}
            >
              <Link
                underline="none"
                color="neutral"
                href='http://localhost:3000/Admin.js'
                aria-label="Home"
              >
                <HomeRoundedIcon />
              </Link>
              <Typography color="primary" sx={{ fontWeight: 500, fontSize: 12 }}>
                {ENTITIES_NAMES[selectedEntity] || 'Brevemente'}
              </Typography>
            </Breadcrumbs>
          </Box>
          <Box
            sx={{
              display: 'flex',
              mb: 1,
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'start', sm: 'center' },
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <Typography level="h2" component="h1">
              {ENTITIES_NAMES[selectedEntity]}
            </Typography>
            {/*<Button
              color="primary"
              startDecorator={<DownloadRoundedIcon />}
              size="sm"
            >
              Download PDF
            </Button>*/}
          </Box>
          <Content entity={selectedEntity} setEntity={setSelectedEntity}/>
        </Box>
      </Box>
    </CssVarsProvider>
  );
};