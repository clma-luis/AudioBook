import PropTypes from "prop-types";

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
            <IconButton sx={{ ml: 1 }} onClick={() => signOut()}>
              <Icons name="LogoutIcon" size={IconSize.lg} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Cuenta">
            <Avatar
              sx={{
                height: 40,
                width: 40,
                ml: 1,
                cursor: "pointer",
              }}
              src="/static/images/avatars/avatar_1.png"
            >
              <Icons name="UserIcon" size={IconSize.lg} />
            </Avatar>
          </Tooltip>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
