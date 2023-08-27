import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Button } from '@arco-design/web-react';

export const columnDefs = [
  { field: 'make', filter: true },
  { field: 'model', filter: true },
  { field: 'price', editable: true },
  {
    headerName: '操作',
    editable: false,
    cellRenderer: (params) => {
      return <Button onClick={() => console.log(params)}>删除</Button>;
    },
  },
];
const EditableTable = ({ list }) => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const defaultColDef = useMemo(
    () => ({
      // sortable: true,
      flex: 1,
      minWidth: 200,
      editable: true,
      resizable: true,
    }),
    []
  );

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event) => {
    console.log('cellClicked', event);
  }, []);

  // Example load data from server
  useEffect(() => {
    /*fetch('https://www.ag-grid.com/example-assets/row-data.json')
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));*/
  }, []);

  // Example using Grid's API
  const buttonListener = useCallback((e) => {
    gridRef?.current?.api?.deselectAll();
  }, []);
  const addRow = () => setRowData([...rowData, { make: 1 }]);
  const removeRow = (key) => {
    setRowData(rowData.filter((item) => item.key !== key));
  };
  return (
    <div>
      <Button onClick={addRow}>新增</Button>
      <button onClick={buttonListener}>Push Me</button>

      <div
        className="ag-theme-alpine"
        style={{ width: '100%', height: '80vh' }}
      >
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
        />
      </div>
    </div>
  );
};

export default EditableTable;
