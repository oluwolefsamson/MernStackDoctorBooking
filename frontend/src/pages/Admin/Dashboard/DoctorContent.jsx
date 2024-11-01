import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Avatar,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useMediaQuery } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${theme.palette.text.primary}`]: {
    fontWeight: "bold",
    fontSize: "1rem",
  },
}));

const DoctorContent = () => {
  const [doctors, setDoctors] = useState([]);
  const [open, setOpen] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [actionType, setActionType] = useState(null);

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(
        `https://mernstackdoctorbooking.onrender.com/api/v1/doctors`
      );
      const sortedDoctors = response.data.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setDoctors(sortedDoctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleOpen = (doctor) => {
    setSelectedDoctor(doctor);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDoctor(null);
  };

  const handleActionOpen = (doctor, type) => {
    setSelectedDoctor(doctor);
    setActionType(type);
    setOpenConfirmation(true);
  };

  const handleConfirmationClose = () => {
    setOpenConfirmation(false);
    setSelectedDoctor(null);
    setActionType(null);
  };

  const handleAction = async () => {
    try {
      const url = `http://localhost:8000/api/v1/doctors/${selectedDoctor._id}/approval`; // Updated URL to your production API
      const response = await axios.patch(url, {
        status: actionType === "approve" ? "approved" : "declined",
      });
      console.log(response.data); // Handle success response
      fetchDoctors(); // Refresh the doctors list
      handleConfirmationClose(); // Close the confirmation dialog
    } catch (error) {
      console.error(`Error updating doctor status:`, error);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight="bold" mb={3} color="primary">
        Registered Doctors
      </Typography>

      <TableContainer component={Paper} elevation={3}>
        <Table aria-label="doctors table" sx={{ tableLayout: "auto" }}>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Photo</StyledTableCell>
              <StyledTableCell>Doctor Name</StyledTableCell>
              <StyledTableCell>Specialization</StyledTableCell>
              {!isSmallScreen && <StyledTableCell>Rating</StyledTableCell>}
              {!isSmallScreen && <StyledTableCell>Patients</StyledTableCell>}
              <StyledTableCell>Approval Status</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor._id}>
                <TableCell align="center">
                  <Avatar src={doctor.photo} alt={doctor.name} />
                </TableCell>
                <TableCell>{doctor.name}</TableCell>
                <TableCell>{doctor.specialization}</TableCell>
                {!isSmallScreen && (
                  <TableCell>{doctor.averageRating}</TableCell>
                )}
                {!isSmallScreen && (
                  <TableCell>{doctor.appointments.length}</TableCell>
                )}
                <TableCell>
                  {doctor.isApproved === "approved" ? (
                    <Typography color="green">Approved</Typography>
                  ) : (
                    <Typography color="orange">Pending</Typography>
                  )}
                </TableCell>
                <TableCell align="center">
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => handleOpen(doctor)}
                      sx={{ padding: "4px 8px" }}
                    >
                      Details
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      sx={{ padding: "4px 8px" }}
                      onClick={() => handleActionOpen(doctor, "approve")}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      sx={{ padding: "4px 8px" }}
                      onClick={() => handleActionOpen(doctor, "decline")}
                    >
                      Decline
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Doctor Details Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Doctor Details</DialogTitle>
        <DialogContent>
          {selectedDoctor && (
            <Box>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar
                    src={selectedDoctor.photo}
                    alt={selectedDoctor.name}
                    sx={{ width: 80, height: 80 }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h6">{selectedDoctor.name}</Typography>
                  <Typography color="textSecondary">
                    {selectedDoctor.specialization}
                  </Typography>
                  {!isSmallScreen && (
                    <Typography color="textSecondary">
                      Rating: {selectedDoctor.averageRating}
                    </Typography>
                  )}
                  {!isSmallScreen && (
                    <Typography color="textSecondary">
                      Patients: {selectedDoctor.appointments.length}
                    </Typography>
                  )}
                  <Typography color="textSecondary">
                    Status:{" "}
                    {selectedDoctor.isApproved === "approved"
                      ? "Approved"
                      : "Pending"}
                  </Typography>
                </Grid>
              </Grid>
              <Box mt={2}>
                <Typography variant="subtitle1">
                  Ticket Price: ₦{selectedDoctor.ticketPrice}
                </Typography>
                <Typography variant="subtitle1">Bio:</Typography>
                <Typography>
                  Dr. {selectedDoctor.name} is a distinguished{" "}
                  {selectedDoctor.specialization}, celebrated for their
                  precision and expertise in performing complex medical
                  procedures. Their commitment to delivering exceptional patient
                  care, combined with their deep knowledge and experience, has
                  earned them widespread recognition in the medical community.
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={openConfirmation} onClose={handleConfirmationClose}>
        <DialogTitle>
          {actionType === "approve" ? "Approve Doctor" : "Decline Doctor"}
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to{" "}
            {actionType === "approve" ? "approve" : "decline"} Dr.{" "}
            {selectedDoctor?.name}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleAction}
            color={actionType === "approve" ? "success" : "error"}
          >
            {actionType === "approve" ? "Approve" : "Decline"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DoctorContent;
