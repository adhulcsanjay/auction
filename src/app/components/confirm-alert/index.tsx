import React, { ReactNode } from 'react';
import { DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ConfirmAlertProps {
  open: boolean;
  onClose: (status: boolean) => void;
  type: string, // 'CONFIRM' | 'ALERT',
  title: string,
  message: string,
  children?: ReactNode;
}

const ConfirmAlert: React.FC<ConfirmAlertProps> = ({ open, onClose, type, title, message, children }) => {
  return (
      <Dialog open={open} onClose={() => onClose(false)}>
        { 
        children ? children :
                  <>
                      <DialogTitle id="alert-dialog-title" sx={{ color: 'var(--primary)' }}>
                          {title}
                      </DialogTitle>
                      <IconButton
                          aria-label="close"
                          onClick={() => onClose(false)}
                          sx={{
                              position: 'absolute',
                              right: 8,
                              top: 8,
                              color: (theme) => theme.palette.grey[500],
                          }}
                      >
                          <CloseIcon />
                      </IconButton>
                      <DialogContent dangerouslySetInnerHTML={{ __html: message }}>
                      </DialogContent>
                      {type === 'CONFIRM' && <DialogActions>
                          <Button variant="outlined" onClick={() => onClose(false)}>Cancel</Button>
                          <Button variant="contained" onClick={() => onClose(true)} autoFocus>
                              Ok
                          </Button>
                      </DialogActions>}
                  </>
        }

      </Dialog>
  );
};

export default ConfirmAlert;