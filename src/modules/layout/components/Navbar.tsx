import PropTypes from "prop-types";
import Image from "next/image";
import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
} from "@mui/material";
import Icons, { IconSize } from "../../../shared/utils/Icons";
import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { signOut, useSession } from "next-auth/react";
import UseNotiffication from "../../../shared/hooks/UseNotiffication";

const DashboardNavbarRoot = styled(AppBar)(({ theme }: any) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export interface DashboardNavbarProps {
  onSidebarOpen: Dispatch<SetStateAction<boolean | any>>;
}

export const DashboardNavbar = (props: DashboardNavbarProps) => {
  const { onSidebarOpen, ...other } = props;
  const { data: session, status } = useSession();
  const { addNotiffication, notiffication } = UseNotiffication();

  console.log(session?.user?.image);

  const handleLogoutOpen = () => {
    addNotiffication({
      title: "Estás a punto de cerrar sesión",
      message:
        "Estás a punto de salir de AudioBook, presiona 'OK' para cerrar sessión.",
      onClose: async () => {
        await signOut();
      },
    });
  };

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <Icons name="MenuIcon" size={IconSize.lg} />
          </IconButton>
          <Tooltip title="Buscar">
            <IconButton sx={{ ml: 1 }}>
              <Icons name="SearchIcon" size={IconSize.lg} />
            </IconButton>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />

          <Tooltip title="Salir">
            <IconButton sx={{ ml: 1 }} onClick={() => handleLogoutOpen()}>
              <Icons name="LogoutIcon" size={IconSize.lg} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Cuenta">
            <Avatar
              alt={session?.user?.name || ""}
              sx={{
                height: 40,
                width: 40,
                ml: 1,
                cursor: "pointer",
              }}
              src={session?.user?.image || ""}
            />
          </Tooltip>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
