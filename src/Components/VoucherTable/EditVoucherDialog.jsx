import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Paper, Snackbar, Alert } from '@mui/material';

const EditVoucherDialog = ({ openDialog, handleCloseDialog, onEditVoucher, formData, setFormData }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    const [mainKey, subKey] = name.split('.');

    const isNumericField = ['cost'].includes(name);

    if (isNumericField && value !== '' && isNaN(value)) {
      return;
    }

    const parsedValue = isNumericField ? parseInt(value, 10) : value;

    if (subKey) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [mainKey]: {
          ...prevFormData[mainKey],
          [subKey]: parsedValue
        }
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: parsedValue
      }));
    }
  };

  const handleEditVoucher = () => {
    const requiredFields = ['createdBy', 'expiredDay.year', 'expiredDay.month', 'expiredDay.day', 'publishedDay.year', 'publishedDay.month', 'publishedDay.day', 'cost', 'customerCustomerId'];
    const isFormValid = requiredFields.every(field => {
      const [mainKey, subKey] = field.split('.');
      return subKey ? formData[mainKey] && formData[mainKey][subKey] : formData[mainKey];
    });

    if (!isFormValid) {
      setSnackbarMessage('Please fill in all required fields.');
      setSnackbarOpen(true);
      return;
    }

    onEditVoucher(formData);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Voucher</DialogTitle>
        <DialogContent>
          <Paper variant="outlined" component="form" sx={{ margin: 2, padding: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="createdBy"
              label="Created By"
              value={formData.createdBy}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              label="Expired Day"
              value={formData.expiredDay}
              disabled
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="expiredDay.year"
              label="Expired Year"
              type="number"
              value={formData.expiredDay.year}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="expiredDay.month"
              label="Expired Month"
              type="number"
              value={formData.expiredDay.month}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="expiredDay.day"
              label="Expired Day"
              type="number"
              value={formData.expiredDay.day}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              label="Published Day"
              value={formData.publishedDay}
              disabled
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="publishedDay.year"
              label="Published Year"
              type="number"
              value={formData.publishedDay.year}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="publishedDay.month"
              label="Published Month"
              type="number"
              value={formData.publishedDay.month}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="publishedDay.day"
              label="Published Day"
              type="number"
              value={formData.publishedDay.day}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="cost"
              label="Cost"
              type="number"
              value={formData.cost}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="customerCustomerId"
              label="Customer ID"
              value={formData.customerCustomerId}
              onChange={handleChange}
            />
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleEditVoucher} variant="contained" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditVoucherDialog;
