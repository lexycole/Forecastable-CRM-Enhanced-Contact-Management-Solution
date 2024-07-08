import { Toolbar, AppBar, AppBarProps, Typography } from "@mui/material";

export function AppToolbar(props: AppToolbarProps): JSX.Element {
  const { ...other } = props;

  return (
    <AppBar {...other}>
      <Toolbar>
        <Typography>Material UI Playground</Typography>
      </Toolbar>
    </AppBar>
  );
}

export { Toolbar };

type AppToolbarProps = Omit<AppBarProps, "children">;
