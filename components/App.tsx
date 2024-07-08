import { Suspense, useState } from "react";
import * as React from "react";
import { AppToolbar, Toolbar } from "./AppToolbar";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { PeopleGrid } from "./PeopleGrid";
import './App.css';

export function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "#root": {
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          },
        }}
      />

      <AppToolbar />
      <Toolbar />

      <Suspense fallback={
            <p className="loading">
              Loading list of contacts...</p>
            }>
        <PeopleGrid sx={{ flexGrow: 1 }} />
      </Suspense>
    </React.Fragment>
  );
}
