import React, { useRef, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Button } from '@arco-design/web-react';
import { ColDef } from 'ag-grid-community';
import { getSpecificationByCode } from '@/pages/order/list/service';

const EditableTable = ({ rowData, setRowData }) => {
  const columnDefs: ColDef[] = [
    {
      headerName: '款号',
      field: 'styleCode',
      onCellValueChanged: async (event) => {
        const res = await getSpecificationByCode(event.newValue);
        console.log(res);
      },
    },
    // 图片只有一张，如果有相同的款号弹窗确认，已有图片和新增的图片比对二选一
    {
      headerName: '图片',
      field: 'circle',
      // valueParser: (params: any) => Number(params.newValue),
    },
    {
      headerName: '件数',
      field: 'quantity',
      valueParser: (params: any) => Number(params.newValue),
    },
    // 批量修改单价，选中的内容
    {
      headerName: '单价',
      field: 'unitPrice',
      valueParser: (params: any) => Number(params.newValue),
    },
    {
      headerName: '总价',
      field: 'totalPrice',
      valueParser: (params: any) => Number(params.newValue),
    },
    // { headerName: '备注', field: 'make', filter: true },
    // { headerName: '总重', field: 'make', filter: true },
    // { headerName: '字印', field: 'make', filter: true },
    {
      headerName: '操作',
      editable: false,
      cellRenderer: (params) => {
        return <Button onClick={() => removeRow(params)}>新增款号</Button>;
      },
    },
  ];
  const gridRef = useRef();
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

  const addRow = () => setRowData([...rowData, { totalPrice: 0 }]);
  const removeRow = (params) => {
    setRowData(rowData.filter((item, index) => index !== params.rowIndex));
  };
  return (
    <div>
      <Button onClick={addRow}>新增</Button>

      <div
        className="ag-theme-alpine"
        style={{ width: '100%', height: '80vh' }}
      >
        <AgGridReact
          singleClickEdit={true} // 单击进入编辑
          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
        />
      </div>
    </div>
  );
};

export default EditableTable;
