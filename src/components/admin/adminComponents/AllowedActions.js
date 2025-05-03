import * as React from 'react';
import IconButton from '@mui/joy/IconButton';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

const AllowedActions = ({ entity, deletionModalOpen, editionModalOpen }) => {
  if ([ 'beaches', 'lifeguards', 'clients' ].includes(entity)) {
      return (
      <>
        <IconButton>
          <EditRoundedIcon style={{color: '#ff9b57'}}
            onClick={editionModalOpen}
          />
        </IconButton>
        <IconButton disabled={entity === 'clients'}>
          <DeleteForeverRoundedIcon 
            style={entity === 'clients' ? {color: 'gray'} : {color: 'red'}}
            onClick={deletionModalOpen}
          />
        </IconButton>
      </>
    );
  } else if ([ 'reservations', 'bills', 'evaluations' ].includes(entity)) {
    return (
      <>
        <IconButton disabled>
          <EditRoundedIcon style={{color: 'gray'}}
            onClick={editionModalOpen}
          />
        </IconButton>
        <IconButton>
          <DeleteForeverRoundedIcon style={{color: 'red'}} onClick={deletionModalOpen}/>
        </IconButton>
      </>
    );
  };
};

export default AllowedActions;