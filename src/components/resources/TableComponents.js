import React from 'react'
import { Table } from 'antd';
import "../../styles/Styles.css";

const TableComponents = ({loading, className, columns, dataSource }) => {


  return (
        <Table
          loading={loading}
          className={className}
          columns={columns}
          dataSource={dataSource}
          pagination={{
            pageSize: 5,
            itemRender: (page, type, originalElement) => {
              if (type === 'page') {
                const isActive = originalElement.props.active;
                const itemStyle = isActive ? { color: '#00B3B4' } : { color: '#00B3B4' };
                return <div style={itemStyle}>{originalElement.props.children}</div>;
              }
              return originalElement;
            },
          }}
        />
  )
}

export default TableComponents
