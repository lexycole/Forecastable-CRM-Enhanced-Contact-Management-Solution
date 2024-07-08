import { Container, ContainerProps } from "@mui/material";
import {
  GridColumnMenu,
  GridColumnMenuContainer,
  GridColumnMenuProps,
  GridFilterMenuItem,
  SortGridMenuItems,
  useGridApiRef,
  DataGrid,
  GridColumns,
  GridToolbar,
  GridSelectionModel,
} from "@mui/x-data-grid";
import { usePeople, Person } from "../core/people";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

function DeleteIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 64 64" width="48px" height="48px">
      <path d="M 28 11 C 26.895 11 26 11.895 26 13 L 26 14 L 13 14 C 11.896 14 11 14.896 11 16 C 11 17.104 11.896 18 13 18 L 14.160156 18 L 16.701172 48.498047 C 16.957172 51.583047 19.585641 54 22.681641 54 L 41.318359 54 C 44.414359 54 47.041828 51.583047 47.298828 48.498047 L 49.839844 18 L 51 18 C 52.104 18 53 17.104 53 16 C 53 14.896 52.104 14 51 14 L 38 14 L 38 13 C 38 11.895 37.105 11 36 11 L 28 11 z" />
    </SvgIcon>
  );
}

export function PeopleGrid(props: ContainerProps): JSX.Element {
  const { sx, ...other } = props;
  const people = usePeople();

  console.log(people);

  const [rows, setRows] = React.useState(people);
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);
  const [pageSize, setPageSize] = React.useState<number>(10);

  const columns: GridColumns<Person> = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 180,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 180,
    },
    {
      field: "email",
      headerName: "Email",
      width: 180,
    },
    {
      field: "avatar",
      headerName: "Picture",
      width: 200,
    },
    {
      field: "delete",
      width: 200,
      sortable: false,
      disableColumnMenu: true,
      renderHeader: () => {
        return (
          <IconButton
            onClick={() => {
              const selectedIDs = new Set(selectionModel);
              setRows((r) => r.filter((x) => !selectedIDs.has(x.id)));
            }}
          >
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Container
      sx={{ py: 2, display: "flex", flexDirection: "column", ...sx }}
      {...other}
    >
      <DataGrid
        sx={{ flexGrow: 1 }}
        rows={rows}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        checkboxSelection
        onSelectionModelChange={(ids) => {
          setSelectionModel(ids);
        }}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
      />
    </Container>
  );
}
