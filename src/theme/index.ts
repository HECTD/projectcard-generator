"use client";
import { type UsageTheme, extendTheme } from "@yamada-ui/react";

// import components from './components'
import { semantics } from "./semantics";
import { tokens } from "./tokens";

const customTheme: UsageTheme = {
  // styles,
  // components,
  ...tokens,
  semantics,
  initialColorMode: "light",
};

export const theme = extendTheme(customTheme)();
