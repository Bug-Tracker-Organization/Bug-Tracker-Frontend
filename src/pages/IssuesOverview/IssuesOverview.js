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
import { blue, red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Link, useNavigate } from 'react-router-dom';

export default function IssuesOverview(props) {

  const [organizationName, setOrganizationName] = useState('ORGANIZATION NAME NOT FOUND');
  const [issueName, setIssueName] = useState('ISSUE NAME NOT FOUND');
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.isUserLoggedIn) {
      navigate('/', {state: null});
    }
  }, [props.isUserLoggedIn]);

  // Table
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [currentTaskId, setCurrentTaskId] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = (event) => {
    setCurrentTaskId(event);
    setOpen(true)
  };
  
  const handleClose = () => setOpen(false);
  const handleRemoveIssue = () => {
    // Send request to delete from database

    // Remove from table
    setRows([...rows.filter((item) => item.id !== currentTaskId)]);
    setOpen(false);
  }

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
      id: 'status',
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
  
  function createData(id, name, code, population, size, status) {
    const density = population / size;
    const actions = <>
        <Link key={'link: ' + id} color="inherit" to={"/edit-issue"}>
          <EditIcon key={'edit: ' + id} sx={{ cursor: 'pointer', color: 'grey' }}/>
        </Link>
        <DeleteForeverIcon key={'delete: ' + id} onClick={() => handleOpen(id)} sx={{ cursor: 'pointer', color: 'red' }}/>
      </>
    return { id, name, code, population, size, density, status, actions };
  }
  

  const [rows, setRows] = useState([
    createData(0, 'India', 'IN', 1324171354, 3287263, 'Assigned'),
    createData(1, 'China', 'CN', 1403500365, 9596961, 'In progress'),
    createData(2, 'Italy', 'IT', 60483973, 301340, 'Completed'),
    createData(3, 'United States', 'US', 327167434, 9833520, 'Approved'),
    createData(4, 'Canada', 'CA', 37602103, 9984670, 'In progress'),
    createData(5, 'Australia', 'AU', 25475400, 7692024, 'In progress'),
    createData(6, 'Germany', 'DE', 83019200, 357578, 'In progress'),
    createData(7, 'Ireland', 'IE', 4857000, 70273, 'In progress'),
    createData(8, 'Mexico', 'MX', 126577691, 1972550, 'In progress'),
    createData(9, 'Japan', 'JP', 126317000, 377973, 'In progress'),
    createData(10, 'France', 'FR', 67022000, 640679, 'In progress'),
    createData(11, 'United Kingdom', 'GB', 67545757, 242495, 'In progress'),
    createData(12, 'Russia', 'RU', 146793744, 17098246, 'In progress'),
    createData(13, 'Nigeria', 'NG', 200962417, 923768, 'In progress'),
    createData(14, 'Brazil', 'BR', 210147125, 8515767, 'In progress'),
  ]);
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Remove Issue
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              You are about to remove the issue <i>{issueName}</i>. Continue?
            </Typography>
            <Button variant="contained" onClick={handleRemoveIssue} sx={{
                backgroundColor: 'red', 
                color: 'white',
                ':hover': {
                  bgcolor: red[700],
                  color: 'white',
                },
                marginTop: 2,
                marginRight: 1,
              }}>
              Remove
            </Button>
            <Button variant="contained" onClick={handleClose} sx={{ backgroundColor: blue[500], color: 'white', marginTop: 2 }}>
              Cancel
            </Button>
          </Box>
        </Modal>
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
                      <TableRow key={'row: ' + row.id} hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={'col: ' + column.id} align={column.align}>
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
    </>
  );
}