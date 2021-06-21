import React from 'react';
import { Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table } from '@material-ui/core';
import { DefaultButton } from '../../components';

export interface SimpleTableProps {
  heads: string[];
  rows: string[][];
}

interface ExtrasProps {
  rowSelected?: (row: string[]) => void;
  rowDeleted?: (row: string[]) => void;
  buttonActions?: boolean;
}

type OwnProps = SimpleTableProps & ExtrasProps;

const SimpleTable: React.FC<OwnProps> = ({ heads, rows, rowSelected, buttonActions, rowDeleted }) => {
  const handleRowSelected = (row: string[]) => () => {
    if (rowSelected) rowSelected(row);
  };

  const handleRowDeleted = (row: string[]) => () => {
    if (rowDeleted) rowDeleted(row);
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {heads.map((v, i) => (
              <TableCell key={i} align="left">
                {v}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) =>
            !buttonActions ? (
              <TableRow onClick={handleRowSelected(row)} style={{ cursor: 'pointer' }} key={i.toFixed()}>
                {row.map((value) => (
                  <TableCell key={value} align="left" scope="row">
                    {value}
                  </TableCell>
                ))}
              </TableRow>
            ) : (
              <TableRow key={i}>
                {row.map((value) => (
                  <TableCell key={value} align="left" scope="row">
                    {value}
                  </TableCell>
                ))}
                <TableCell>
                  <DefaultButton color="primary" onClick={handleRowSelected(row)} title="Ver detalhes" />
                </TableCell>
                <TableCell>
                  <DefaultButton color="secondary" onClick={handleRowDeleted(row)} title="Apagar" />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SimpleTable;
