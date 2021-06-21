import React from 'react';

import { Modal, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    alignSelf: 'center'
  },
  modal: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

interface OwnProps {
  open: boolean;
  setClose: () => void;
  title?: string;
}

const SimpleModal: React.FC<OwnProps> = ({ open, setClose, title, children }) => {
  const classes = useStyles();
  return (
    <Modal className={classes.modal} open={open} onClose={setClose}>
      <Paper className={classes.paper}>
        <Typography style={{ marginBottom: '20px' }} variant="h5">
          {title}
        </Typography>
        {children}
      </Paper>
    </Modal>
  );
};

export default SimpleModal;
