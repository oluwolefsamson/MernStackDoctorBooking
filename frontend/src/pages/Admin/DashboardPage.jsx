import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import DashboardIcon from "@mui/icons-material/Dashboard"; // Home
import MedicalServicesIcon from "@mui/icons-material/MedicalServices"; // Doctors
import PeopleIcon from "@mui/icons-material/People"; // Users
import EventNoteIcon from "@mui/icons-material/EventNote"; // Appointments
import RateReviewIcon from "@mui/icons-material/RateReview"; // Reviews

// Import section components
import DashboardContent from "./Dashboard/DashboardContent";
import DoctorContent from "./Dashboard/DoctorContent";
import AppointmentContent from "./Dashboard/AppointmentContent";
import ReviewContent from "./Dashboard/ReviewContent";
import UserContent from "./Dashboard/UserContent";

const NAVIGATION = [
  { segment: "Dashboard", title: "Home", icon: <DashboardIcon /> },
  { segment: "Doctors", title: "Doctors", icon: <MedicalServicesIcon /> },
  { segment: "Users", title: "Patients", icon: <PeopleIcon /> },
  { segment: "Appointments", title: "Appointments", icon: <EventNoteIcon /> },
  { segment: "Reviews", title: "Reviews", icon: <RateReviewIcon /> },
];

const demoTheme = createTheme({
  cssVariables: { colorSchemeSelector: "data-toolpad-color-scheme" },
  colorSchemes: { light: true, dark: true },
});

function DashboardPage(props) {
  const { window } = props;
  const [pathname, setPathname] = React.useState("Dashboard");

  const router = {
    pathname,
    navigate: (path) => {
      const segment = path.replace("/", ""); // Remove leading slash
      console.log("Navigating to:", segment); // Log the segment being set
      setPathname(segment);
    },
  };

  // Function to render content based on pathname
  const renderContent = () => {
    switch (pathname) {
      case "Dashboard":
        return <DashboardContent />;
      case "Doctors":
        return <DoctorContent />;
      case "Appointments":
        return <AppointmentContent />;
      case "Reviews":
        return <ReviewContent />;
      case "Users":
        return <UserContent />;
      default:
        return <Typography variant="h5">Page Not Found</Typography>;
    }
  };

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={window}
    >
      <DashboardLayout disableCollapsibleSidebar>
        {/* Content area */}
        <Box sx={{ flexGrow: 1, p: 4 }}>{renderContent()}</Box>
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardPage.propTypes = {
  window: PropTypes.func,
};

export default DashboardPage;
