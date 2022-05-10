import React, { useContext, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { makeStyles } from '@mui/styles';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

const ConfirmationModalContext = React.createContext({});
const useStyles = makeStyles((theme) => ({
  Dialogstyle: {
    '& .MuiDialogTitle-root': {
      textAlign: 'center',
    },
    '& .MuiDialogActions-root': {
      justifyContent: 'center',
    },
    '& .MuiButtonBase-root:first-child': {
      color: theme.palette.primary.dark,
      border: '1px solid ' + theme.palette.primary.dark,

      '&:hover': {
        color: '#fff',
        background: theme.palette.primary.dark,
      },
    },
    '& .MuiButtonBase-root:last-child': {
      color: theme.palette.primary.main,
      border: '1px solid ' + theme.palette.primary.main,
      color: '#fff',
      '&:hover': {
        color: '#fff',
        background: theme.palette.primary.main,
      },
    },
  },
  dialogtitle: {
    '& .MuiTypography-h6': {
      fontSize: '1.25rem',
      fontFamily: 'CircularStd',
      fontWeight: 500,
      lineHeight: 1.6,
      textTransform: 'none',
    },
  },
}));
const ConfirmationModalContextProvider = (props) => {
  const classes = useStyles();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [Title, setTitle] = useState('Are you sure you want to delete?');
  const resolver = useRef();

  const handleShow = (config = {}) => {
    if (config.Title) {
      setTitle(config.Title);
    }

    setShowConfirmationModal(true);

    return new Promise(function (resolve) {
      resolver.current = resolve;
    });
  };

  const handleOk = () => {
    resolver.current && resolver.current(true);
    setShowConfirmationModal(false);
  };

  const handleCancel = () => {
    resolver.current && resolver.current(false);
    setShowConfirmationModal(false);
  };

  return (
    <ConfirmationModalContext.Provider value={{ showConfirmation: handleShow }}>
      {props.children}

      <Dialog
        open={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        maxWidth="xs"
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ root: classes.Dialogstyle }}
      >
        <DialogTitle className={classes.dialogtitle} id="alert-dialog-title">
          {Title}
        </DialogTitle>
        <DialogActions>
          <Button variant="outlined" size="small" onClick={handleCancel}>
            No
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={handleOk}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </ConfirmationModalContext.Provider>
  );
};

export const ConfirmationModal = () => useContext(ConfirmationModalContext);

export default ConfirmationModalContextProvider;
