import React, { ReactElement } from "react";
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
  AdjustmentsIcon,
  BellIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  HomeIcon,
  EmojiHappyIcon,
  TruckIcon,
  LogoutIcon,
  UserCircleIcon,
  MoonIcon,
  SunIcon,
  SwitchHorizontalIcon,
  IdentificationIcon,
  FingerPrintIcon,
  PlusIcon,
  PlusCircleIcon,
  UsersIcon,
  UserIcon,
  UserGroupIcon,
  CheckIcon,
  PhotographIcon,
  TrashIcon,
  UserAddIcon,
  SpeakerphoneIcon,
  MenuIcon,
  SearchIcon,
  BookOpenIcon,
  GiftIcon,
} from "@heroicons/react/outline";

import { useTheme } from "@mui/material/styles";

interface IconProps extends React.ComponentProps<any> {
  name: string;
  size?: IconSize;
  className?: string;
}

export enum IconSize {
  sm,
  md,
  lg,
  xlg,
}

const icons = new Map<string, any>();
icons.set("ArrowCircleLeftIcon", ArrowCircleLeftIcon);
icons.set("ArrowCircleRightIcon", ArrowCircleRightIcon);
icons.set("HomeIcon", HomeIcon);
icons.set("AdjustmentsIcon", AdjustmentsIcon);
icons.set("TruckIcon", TruckIcon);
icons.set("LogoutIcon", LogoutIcon);
icons.set("EmojiHappyIcon", EmojiHappyIcon);
icons.set("BellIcon", BellIcon);
icons.set("UserCircleIcon", UserCircleIcon);
icons.set("MoonIcon", MoonIcon);
icons.set("SunIcon", SunIcon);
icons.set("SwitchHorizontalIcon", SwitchHorizontalIcon);
icons.set("IdentificationIcon", IdentificationIcon);
icons.set("FingerPrintIcon", FingerPrintIcon);
icons.set("ChevronRightIcon", ChevronRightIcon);
icons.set("ChevronLeftIcon", ChevronLeftIcon);
icons.set("PlusIcon", PlusIcon);
icons.set("UsersIcon", UsersIcon);
icons.set("UserIcon", UserIcon);
icons.set("PlusCircleIcon", PlusCircleIcon);
icons.set("UserGroupIcon", UserGroupIcon);
icons.set("CheckIcon", CheckIcon);
icons.set("PhotographIcon", PhotographIcon);
icons.set("TrashIcon", TrashIcon);
icons.set("UserAddIcon", UserAddIcon);
icons.set("SpeakerphoneIcon", SpeakerphoneIcon);
icons.set("MenuIcon", MenuIcon);
icons.set("SearchIcon", SearchIcon);
icons.set("BookOpenIcon", BookOpenIcon);
icons.set("GiftIcon", GiftIcon);

const Icon = (props: IconProps) => {
  const { name, size, className } = props;
  const iconInstance = icons.get(name || "HomeIcon");
  let iconSize = 12;
  switch (size) {
    case IconSize.sm:
      iconSize = 14;
      break;

    case IconSize.md:
      iconSize = 20;
      break;
    case IconSize.lg:
      iconSize = 30;
      break;
    case IconSize.xlg:
      iconSize = 100;
      break;
  }

  const theme = useTheme();
  const color =
    theme?.palette?.mode === "dark"
      ? theme.palette.text.primary
      : theme.palette.text.secondary;
  const style = {
    color,
  };
  return React.createElement(iconInstance, {
    width: iconSize,
    height: iconSize,
    className,
    style,
  });
};

export default Icon;
