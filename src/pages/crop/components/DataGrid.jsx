import * as React from 'react';
import { DataGrid as MUIDataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', flex: 1, minWidth: 100 }, // Asegura un ancho mínimo
  { field: 'cropTypeId', headerName: 'Cultivo', flex: 1, minWidth: 150 },
  { field: 'soilTypeId', headerName: 'Suelo', flex: 1, minWidth: 150 },
  { field: 'saturationPoint', headerName: 'Saturación', flex: 1, minWidth: 120 },
  { field: 'tempIrrigationControl', headerName: 'Temperatura', flex: 1, minWidth: 150 },
  { field: 'irrigations', headerName: 'Riegos', flex: 1, minWidth: 150,    
  valueGetter: (params) => {      
      return params.row.irrigations.map(irrigation => irrigation.executionHour).join(', ')
    },
 },

];

function DataTable({ crops }) {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MUIDataGrid
        rows={crops}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}

export default DataTable;
