import React from 'react'
import { Table } from 'antd';

const TableComponents = ({loading, className, columns, dataSource }) => {
  return (
        <Table
          bordered
          loading={loading}
          className={className}
          columns={columns}
          dataSource={dataSource}
          pagination={{
            pageSize: 5
          }}
        />
  )
}

export default TableComponents
