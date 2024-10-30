import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";

// Import section components
import DashboardContent from "./Dashboard/DashboardContent";
import DoctorContent from "./Dashboard/DoctorContent";
import AppointmentContent from "./Dashboard/AppointmentContent";
import ReviewContent from "./Dashboard/ReviewContent";
import UserContent from "./Dashboard/UserContent";

const NAVIGATION = [
  { segment: "Dashboard", title: "Dashboard", icon: <DashboardIcon /> },
  { segment: "Doctors", title: "Doctors", icon: <ShoppingCartIcon /> },
  { segment: "Appointments", title: "Appointments", icon: <BarChartIcon /> },
  { segment: "Reviews", title: "Reviews", icon: <BarChartIcon /> },
  { segment: "Users", title: "Users", icon: <BarChartIcon /> },
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
