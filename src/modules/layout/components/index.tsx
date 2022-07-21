import { useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DashboardNavbar } from "./Navbar";
import { DashboardSidebar } from "./Sidebar";
import { useUser } from "@auth0/nextjs-auth0";
import Welcome from "../../auth/components/Welcome";

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
  },
}));

export const Layout = (props: React.PropsWithChildren<any>) => {
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const { user, error, isLoading } = useUser();
  if (isLoading) return <>Loading...</>;
  return (
    <>
      {!user ? (
        <Welcome />
      ) : (
        <>
          <DashboardLayoutRoot>
            <Box
              sx={{
                display: "flex",
                flex: "1 1 auto",
                flexDirection: "column",
                width: "100%",
              }}
            >
              {children}
            </Box>
          </DashboardLayoutRoot>
          <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
          <DashboardSidebar
            setSidebarOpen={() => setSidebarOpen(false)}
            isSidebarOpen={isSidebarOpen}
          />
        </>
      )}
    </>
  );
};
