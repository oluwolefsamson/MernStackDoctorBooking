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
} from "@mui/material";
import { styled } from "@mui/material/styles"; // Import styled
import axios from "axios"; // Import axios

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${theme.palette.text.primary}`]: {
    fontWeight: "bold",
    fontSize: "1rem",
  },
}));

const DoctorContent = () => {
  const [doctors, setDoctors] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Fetch doctors data from the backend
  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/doctors");
      setDoctors(response.data.data); // Assuming your API response structure
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors(); // Call fetchDoctors when the component mounts
  }, []);

  const handleOpen = (doctor) => {
    setSelectedDoctor(doctor);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight="bold" mb={3} color="primary">
        Registered Doctors
      </Typography>

      <TableContainer component={Paper} elevation={3}>
        <Table aria-label="doctors table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Photo</StyledTableCell>
              <StyledTableCell>Doctor Name</StyledTableCell>
              <StyledTableCell>Specialization</StyledTableCell>
              <StyledTableCell>Rating</StyledTableCell>
              <StyledTableCell>Patients</StyledTableCell>
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
                <TableCell>{doctor.averageRating}</TableCell>
                <TableCell>{doctor.appointments.length}</TableCell>
                <TableCell>
                  {doctor.isApproved === "approved" ? (
                    <Typography color="green">Approved</Typography>
                  ) : (
                    <Typography color="orange">Pending</Typography>
                  )}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small" // Set button size to small
                    onClick={() => handleOpen(doctor)}
                    sx={{ mr: 1, padding: "4px 8px" }} // Adjust padding
                  >
                    Details
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    size="small" // Set button size to small
                    sx={{ mx: 0.5, padding: "4px 8px" }} // Adjust padding
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small" // Set button size to small
                    sx={{ mx: 0.5, padding: "4px 8px" }} // Adjust padding
                  >
                    Decline
                  </Button>
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
                  <Typography color="textSecondary">
                    Rating: {selectedDoctor.averageRating}
                  </Typography>
                  <Typography color="textSecondary">
                    Patients: {selectedDoctor.appointments.length}
                  </Typography>
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
    </Box>
  );
};

export default DoctorContent;
