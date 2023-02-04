import './IssuesOverview.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { blue } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link, useNavigate } from 'react-router-dom';

const columns = [
  { id: 'name', label: 'Title', minWidth: 50 },
  { id: 'code', label: 'Assigned to', minWidth: 50 },
  {
    id: 'population',
    label: 'Deadline',
    minWidth: 50,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Assigned by',
    minWidth: 50,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Issued on',
    minWidth: 50,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'density',
    label: 'Status',
    minWidth: 50,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 50,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  const actions = <>
      <Link color="inherit" to={"/edit-issue"}>
        <EditIcon sx={{ cursor: 'pointer', }}/>
      </Link>
      <DeleteForeverIcon sx={{ cursor: 'pointer', }}/>
    </>
  return { name, code, population, size, density, actions };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

export default function IssuesOverview(props) {

  const [organizationName, setOrganizationName] = useState('Could not retrieve org name');
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.isUserLoggedIn) {
      navigate('/', {state: null});
    }
  }, [props.isUserLoggedIn]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Issues Overview - {organizationName}  
        </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, position: 'absolute', right: 0 }}>
          <Button className="new-issue-btn" variant="contained" sx={{ backgroundColor: blue[500], color: 'white', }}>
            + New Issue
          </Button>
        </Typography>
      </Toolbar>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead sx={{ color: 'red' }}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
}