"use client";

import { useEffect, useState } from "react";
import useAPIData from "../../../../apiConfig/useAPIData";
import useAPIAuth from "../../../../apiConfig/useAPIAuth";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import CurrDriveDetail from "../../../components/admin_components/CurrDriveDetail"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  Link,
  ButtonGroup,
} from "@mui/material";

export default function CurrentDrives() {
  const { getItems, updateItem } = useAPIData();
  const { getAccessToken } = useAPIAuth();
  const [upcomingDrives, setUpcomingDrives] = useState([]);
  const [openDriveDialog, setOpenDriveDialog] = useState(false);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [formClose, setFormClose] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await getItems(
        "TPO_Drive",
        null,
        null,
        null,
        null,
        null,
        null,
        true
      );
      const upcomingDrives = response.data;
      setUpcomingDrives(upcomingDrives);
    }
    fetchData();
  }, []);

  const handleViewDrive = (drive) => {
    setSelectedDrive(drive);
    setOpenDriveDialog(true);
  };

  const handleOpenDetailsDialog = () => {
    setOpenDetailsDialog(true);
  };

  const handleCloseDeatailsDialog = () => {
    setOpenDetailsDialog(false);
  };

  const handleUpdateDriveStatus = async (status) => {
    try {
      const accessToken = await getAccessToken();
      await updateItem(
        "TPO_Drive",
        selectedDrive.id,
        { DriveStatus: status },
        true,
        accessToken
      );
      setSelectedDrive((prevState) => ({
        ...prevState,
        DriveStatus: status,
      }));
    } catch (error) {
      console.error("Error updating drive status:", error);
    }
  };
  console.log(upcomingDrives);

  return (
    <>
      <TableContainer sx={{ padding: "46px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontWeight: "bold", backgroundColor: "#CFD3D3" }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", backgroundColor: "#CFD3D3" }}
              >
                Drive Status
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", backgroundColor: "#CFD3D3" }}
              >
                Start Date
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", backgroundColor: "#CFD3D3" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {upcomingDrives.map((drive) => (
              <TableRow key={drive.id}>
                <TableCell>{drive.Name}</TableCell>
                <TableCell>{drive.DriveStatus}</TableCell>
                <TableCell>{drive.StartDate}</TableCell>
                <TableCell>
                  <Button onClick={() => handleViewDrive(drive)}>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDriveDialog}
        onClose={() => setOpenDriveDialog(false)}
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            width: "50%",
            margin: "auto",
          },
        }}
      >
        <DialogTitle>{selectedDrive && selectedDrive.Name}</DialogTitle>
        <DialogContent>
          Form Close
          <Checkbox
            checked={!formClose}
            onChange={() => setFormClose(!formClose)}
            color="primary"
            inputProps={{ "aria-label": "form-close-checkbox" }}
          />
          {console.log(formClose)}
          </DialogContent>
          <DialogContent>
          <Link
            component="button"
            variant="body2"
            onClick={handleOpenDetailsDialog}
          >
            Details of drive
          </Link>
          <CurrDriveDetail
            open={openDetailsDialog}
            onClose={handleCloseDeatailsDialog}
            selectedDrive={selectedDrive}
          />
          </DialogContent>
          <DialogContent>
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
          >
            <Button
              onClick={() => handleUpdateDriveStatus("Upcoming")}
              variant={
                selectedDrive && selectedDrive.DriveStatus === "Upcoming"
                  ? "contained"
                  : "outlined"
              }
            >
              Upcoming
            </Button>
            <Button
              onClick={() => handleUpdateDriveStatus("Ongoing")}
              variant={
                selectedDrive && selectedDrive.DriveStatus === "Ongoing"
                  ? "contained"
                  : "outlined"
              }
            >
              Ongoing
            </Button>
            <Button
              onClick={() => handleUpdateDriveStatus("Completed")}
              variant={
                selectedDrive && selectedDrive.DriveStatus === "Completed"
                  ? "contained"
                  : "outlined"
              }
            >
              Completed
            </Button>
          </ButtonGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDriveDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
