import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  Divider,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

// Custom theme
const theme = createTheme({
  palette: {
    primary: { main: "#00796b" },
    secondary: { main: "#4caf50" },
    background: { paper: "#ffffff", default: "#f4f6f8" },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

// Styled components
const StatCard = styled(Card)(({ theme }) => ({
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const StatBox = styled(Box)(({ theme, bgcolor }) => ({
  backgroundColor: bgcolor,
  padding: theme.spacing(1),
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  marginRight: theme.spacing(2),
}));

const DashboardContent = () => {
  // State variables for dynamic counts
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [appointments, setAppointments] = useState(0);

  // Fetch data from your API or database
  useEffect(() => {
    // Example fetch functions (replace with your actual API calls)
    const fetchCounts = async () => {
      try {
        const doctorsResponse = await fetch(
          "http://localhost:8000/api/v1/doctors/count"
        ); // Update with your endpoint
        const usersResponse = await fetch(
          "http://localhost:8000/api/v1/users/count"
        ); // Update with your endpoint
        const appointmentsResponse = await fetch(
          "http://localhost:8000/api/v1/appointments/count"
        ); // Update with your endpoint

        const doctorsData = await doctorsResponse.json();
        const usersData = await usersResponse.json();
        const appointmentsData = await appointmentsResponse.json();

        // Update state with fetched data
        setTotalDoctors(doctorsData.count);
        setTotalUsers(usersData.count);
        setAppointments(appointmentsData.count);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box p={4} bgcolor="background.default">
        <Typography variant="h4" mb={2} fontWeight="bold" color="primary.main">
          Admin Dashboard
        </Typography>
        <Typography variant="subtitle1" mb={4} color="textSecondary">
          Welcome back, Admin
        </Typography>

        {/* Statistics Cards */}
        <Grid container spacing={3} mb={4}>
          {[
            {
              title: "Total Doctors",
              count: totalDoctors,
              icon: <MedicalServicesIcon fontSize="large" />,
              color: theme.palette.primary.main,
            },
            {
              title: "Total Users",
              count: totalUsers,
              icon: <GroupIcon fontSize="large" />,
              color: theme.palette.secondary.main,
            },
            {
              title: "Appointments",
              count: appointments,
              icon: <EventNoteIcon fontSize="large" />,
              color: theme.palette.primary.light,
            },
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StatCard>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <StatBox bgcolor={stat.color}>{stat.icon}</StatBox>
                    <Box>
                      <Typography variant="h5" fontWeight="bold" gutterBottom>
                        {stat.count}
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        {stat.title}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </StatCard>
            </Grid>
          ))}
        </Grid>

        {/* Quick Actions */}
        <Box mb={4}>
          <Typography variant="h6" mb={2} fontWeight="bold">
            Quick Actions
          </Typography>
          <Divider />
          <Box display="flex" gap={2} mt={2} flexWrap="wrap">
            <IconButton
              variant="contained"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              <AddCircleOutlineIcon /> Add New Doctor
            </IconButton>
            <IconButton
              variant="contained"
              color="secondary"
              sx={{ fontWeight: "bold" }}
            >
              <EventNoteIcon /> Approve Appointment
            </IconButton>
            <IconButton
              variant="contained"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              <GroupIcon /> View All Users
            </IconButton>
          </Box>
        </Box>

        {/* Recent Activity / Notifications */}
        <Box mb={4}>
          <Typography variant="h6" mb={2} fontWeight="bold">
            Recent Activity
          </Typography>
          <Divider />
          <Box mt={2} p={2} bgcolor="background.paper" borderRadius="8px">
            <Typography variant="body1" mb={1}>
              - New user registered: Jane Doe
            </Typography>
            <Typography variant="body1" mb={1}>
              - Appointment approved for Dr. Smith
            </Typography>
            <Typography variant="body1" mb={1}>
              - New review posted for Dr. Allen
            </Typography>
          </Box>
        </Box>

        {/* Graph / Chart Section Placeholder */}
        <Box>
          <Typography variant="h6" mb={2} fontWeight="bold">
            Statistics Overview
          </Typography>
          <Divider />
          <Box
            p={4}
            mt={2}
            bgcolor="background.paper"
            borderRadius="8px"
            textAlign="center"
          >
            <Typography color="textSecondary" fontStyle="italic">
              Graph showing appointments trend over time...
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DashboardContent;
