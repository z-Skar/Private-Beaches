import * as React from 'react';
import IconButton from '@mui/joy/IconButton';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

const AllowedActions = ({ entity, openDeletionModal }) => {
  if ([ 'beaches', 'lifeguards', 'clients' ].includes(entity)) {
      return (
      <>
        <IconButton>
          <EditRoundedIcon style={{color: '#ff9b57'}}/>
        </IconButton>
        <IconButton disabled={entity === 'clients'}>
          <DeleteForeverRoundedIcon 
            style={entity === 'clients' ? {color: 'gray'} : {color: 'red'}}
            onClick={openDeletionModal}
          />
        </IconButton>
      </>
    );
  } else if (['reservations', 'bills', 'evaluations']) {
    return (
      <>
        <IconButton disabled>
          <EditRoundedIcon style={{color: 'gray'}}/>
        </IconButton>
        <IconButton>
          <DeleteForeverRoundedIcon style={{color: 'red'}} onClick={openDeletionModal}/>
        </IconButton>
      </>
    );
  };
};

export default AllowedActions;