import { Dialog, DialogTitle,DialogContentText, DialogContent, DialogActions, Button } from "@mui/material";

function DriveDetailsDialog({ open, onClose, selectedDrive }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{selectedDrive && selectedDrive.Name}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <strong>Description:</strong> {selectedDrive && selectedDrive.Description}
        </DialogContentText>
        <DialogContentText>
          <strong>Roles Offered:</strong> {selectedDrive && selectedDrive.RolesOffered}
        </DialogContentText>
        <DialogContentText>
          <strong>Branches Allowed in Drive:</strong> {selectedDrive && selectedDrive.DriveBranchMapping.join(', ')}
        </DialogContentText>
        <DialogContentText>
          <strong>Start Date:</strong> {selectedDrive && selectedDrive.StartDate}
        </DialogContentText>
        <DialogContentText>
          <strong>Slab:</strong> {selectedDrive && selectedDrive.Slab}
        </DialogContentText>
        <DialogContentText>
          <strong>Mode:</strong> {selectedDrive && selectedDrive.Mode}
        </DialogContentText>
        <DialogContentText>
          <strong>Number of Rounds in Drive:</strong> {selectedDrive && selectedDrive.RoundsInDrive.length}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DriveDetailsDialog;
