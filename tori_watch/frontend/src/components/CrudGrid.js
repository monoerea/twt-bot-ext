import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import randomId from './utils';

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    const session_id = randomId();
    const newRecord = { id, session_id, username: '', isNew: true };

    setRows((oldRows) => [...oldRows, newRecord]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'username' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add records
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid({ initialRows = [], onSaveChanges }) {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [unsavedChanges, setUnsavedChanges] = React.useState([]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      // Row has been unfocused
      handleSaveChanges();
      setRowModesModel((prevModesModel) => ({
        ...prevModesModel,
        [params.id]: { mode: GridRowModes.View, isEdited: false },
      }));
    }
  };

  const handleEditClick = (id) => () => {
    console.log('Edit clicked for row with id:', id);

    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    console.log('setted rows?',rows)
    setRowModesModel((prevModesModel) => ({
      ...prevModesModel,
      [id]: { mode: GridRowModes.View },
    }));
    
    handleSaveChanges();
  };

  const handleSaveChanges = () => {
    console.log('Attempting to save changes...');
    const updatedRows = unsavedChanges.map((change) => {
      const { id, field, value } = change;
      const row = rows.find((r) => r.id === id);
      if (row) {
        console.log('HSG', change, row);
        return { ...row, [field]: value, isEdited: true };
      }
      return null;
    });

    const filteredRows = rows.filter((row) => !row.isEdited);
    const mergedRows = [...filteredRows, ...updatedRows];

    console.log('Merged Rows:', mergedRows);

    if (updatedRows.length > 0) {
      onSaveChanges(mergedRows);
      setUnsavedChanges([]);
    }
  };


  const handleDeleteClick = (id) => () => {
    const updatedRows = rows.map((row) =>
        row.id === id ? { ...row,  isDeleted: true } : row
      );
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    console.log('Deleted Rows:',updatedRows)
    onSaveChanges(updatedRows)
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (params) => {
    const { id, field, value } = params;
  
    console.log('Processing row update:', params);
    const updatedRows = rows.map((row) =>
        row.id === id ? { ...params,  isEdited: true } : row
      );
  
    console.log('Updated rows:', updatedRows);
    setRows(updatedRows);
  
    setUnsavedChanges((prevChanges) => {
      const existingChangeIndex = prevChanges.findIndex(
        (change) => change.id === id && change.field === field
      );
  
      if (existingChangeIndex !== -1) {
        // Update existing change
        const updatedChanges = [...prevChanges];
        updatedChanges[existingChangeIndex] = { id, field, value };
        return updatedChanges;
      }
  
      // Add new change
      return [...prevChanges, { id, field, value }];
    });
  
    console.log('Unsaved changes:', unsavedChanges);
    console.log('Updated rows:', updatedRows);
    onSaveChanges(updatedRows);
    return params;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 180, editable: false },
    {
      field: 'session_id',
      headerName: 'Session ID',
      width: 180,
      align: 'left',
      headerAlign: 'left',
      editable: false,
    },
    {
      field: 'username',
      headerName: 'Username',
      width: 100,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 100,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'password',
      headerName: 'Password',
      width: 100,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'created_at',
      headerName: 'Join date',
      type: 'date',
      width: 180,
      editable: true,
      valueGetter: (params) => {
        const dateString = params.row.created_at;
        return new Date(dateString);
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
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
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
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
        onProcessRowUpdateError={(error) => {
    // Handle the error appropriately, e.g., log it
    console.error('Error updating row:', error);
  }}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
