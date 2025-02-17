import { Note } from "@/lib/definitions";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridSlotProps,
} from "@mui/x-data-grid";
import { addNewNote } from "@/services/note/addNewNote";
import { updateNote } from "@/services/note/updateNote";
import { deleteNote } from "@/services/note/deleteNote";

export interface DataTableProps {
  data: Array<Note>;
  userId: string;
}

interface Row {
  _id: string;
  id: number;
  isNew: boolean;
  title: string;
  description: string;
}

declare module "@mui/x-data-grid" {
  interface ToolbarPropsOverrides {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel
    ) => void;
  }
}

export default function DataTable({ data, userId }: DataTableProps) {
  const [rows, setRows] = React.useState<GridRowsProp>(
    data.map((el: Note, i: number) => {
      return {
        id: i,
        isNew: false,
        _id: el._id,
        title: el.title,
        description: el.description,
      };
    })
  );

  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => async () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    const rowToDelete = rows.find((element) => element.id == id);
    setRows(rows.filter((row) => row.id !== id));

    await deleteNote(rowToDelete?._id);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow: GridRowModel) => {
    const createInDB = (newRow as Row).isNew;
    const updatedRow: Row = { ...(newRow as Row), isNew: false };

    const _rows = rows.map((row) => (row.id === newRow.id ? updatedRow : row));

    setRows(_rows);

    if (createInDB) {
      await addNewNote({
        title: updatedRow.title,
        description: updatedRow.description,
        userId: userId,
      });
    } else {
      await updateNote(updatedRow._id, {
        title: updatedRow.title,
        description: updatedRow.description,
        userId: userId,
      });
    }

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: "title", headerName: "Titulo", width: 250, editable: true },
    {
      field: "description",
      headerName: "Descrição",
      width: 350,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Ações",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={id}
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={id}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={id}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  function EditToolbar(props: GridSlotProps["toolbar"]) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
      const id = rows.length;
      setRows((oldRows) => [
        ...oldRows,
        { id, title: "", description: "", isNew: true },
      ]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "title" },
      }));
    };

    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Adicionar Nota
        </Button>
      </GridToolbarContainer>
    );
  }

  return (
    <Box
      sx={{
        height: 500,
        width: "70%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        localeText={{
          filterOperatorIsEmpty: "Sem registro",
          noRowsLabel: "Nenhuma linha",
          noResultsOverlayLabel: "Nenhum resultado encontrado.",
        }}
      />
    </Box>
  );
}
