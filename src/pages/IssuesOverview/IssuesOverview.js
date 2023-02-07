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
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Link, useNavigate } from 'react-router-dom';
// Date
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
  const [currentIssueId, setCurrentIssueId] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchBarChange = (event) => {
    const target = event.target.value.toLowerCase();
    setRows([...rowsTemp.filter((item) => {
      if (item.title.toLowerCase().includes(target)
        || item.assignedTo.toLowerCase().includes(target)
        || item.deadline.toLowerCase().includes(target)
        || item.assignedBy.toLowerCase().includes(target)
        || item.issuedOn.toLowerCase().includes(target)
        || item.status.toLowerCase().includes(target)) {
        return true;
      }
      return false;
    })]);
  }

  // Modal 1 - Create issue
  const [openCreateIssueModal, setOpenCreateIssueModal] = React.useState(false);
  const handleOpenCreateIssueModal = (event) => {
    //setCurrentIssueId(event);
    setOpenCreateIssueModal(true);
  };
  
  const handleCloseCreateIssueModal = () => setOpenCreateIssueModal(false);
  const handleCreateIssue = () => {
    // Send request to create to database

    // Create to table
    //setRows([...rows.filter((item) => item.id !== currentIssueId)]);
    //setRowsTemp([...rows.filter((item) => item.id !== currentIssueId)]);
    setOpenCreateIssueModal(false);
  }

  // Datepicker
  const [value, setValue] = React.useState(dayjs());

  const handleDateChange = (newValue) => {
    setValue(newValue);
  };

  // Modal 2 - Delete issue
  const [openDeleteIssueModal, setOpenDeleteIssueModal] = React.useState(false);
  const handleOpenDeleteIssueModal = (id, title) => {
    setCurrentIssueId(id);
    setIssueName(title);
    setOpenDeleteIssueModal(true)
  };
  
  const handleCloseDeleteIssueModal = () => setOpenDeleteIssueModal(false);
  const handleRemoveIssue = () => {
    // Send request to delete from database

    // Remove from table
    setRows([...rows.filter((item) => item.id !== currentIssueId)]);
    setRowsTemp([...rows.filter((item) => item.id !== currentIssueId)]);
    setOpenDeleteIssueModal(false);
  }

  const columns = [
    { id: 'title', label: 'Title', minWidth: 50 },
    { id: 'assignedTo', label: 'Assigned to', minWidth: 50 },
    {
      id: 'deadline',
      label: 'Deadline',
      minWidth: 50,
      //align: 'right',
      //format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'assignedBy',
      label: 'Assigned by',
      minWidth: 50,
      //align: 'right',
      //format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'issuedOn',
      label: 'Issued on',
      minWidth: 50,
      //align: 'right',
      //format: (value) => value.toFixed(2),
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 50,
      //align: 'right',
      //format: (value) => value.toFixed(2),
    },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 50,
      //align: 'right',
      //format: (value) => value.toFixed(2),
    },
  ];
  
  function createData(id, title, assignedTo, assignedBy, deadline, issuedOn, status) {
    const actions = <>
        <Link key={'link: ' + id} color="inherit" to={"/edit-issue"}>
          <EditIcon key={'edit: ' + id} sx={{ cursor: 'pointer', color: 'grey' }}/>
        </Link>
        <DeleteForeverIcon 
          key={'delete: ' + id} 
          onClick={() => handleOpenDeleteIssueModal(id, title)} 
          sx={{ cursor: 'pointer', color: 'red' }}
        />
      </>
    return { id, title, assignedTo, deadline, assignedBy, issuedOn, status, actions };
  }
  

  const [rows, setRows] = useState([
    createData(0, 'Bug problem 0', 'Kim@mail.com', 'IE@mail.com', '01.23.2023', '01.21.2023', 'Assigned'),
    createData(1, 'Bug problem 1', 'Lee@mail.com', 'AU@mail.com', '01.23.2023', '01.21.2023', 'In progress'),
    createData(2, 'Bug problem 2', 'John@mail.com', 'AU@mail.com', '01.23.2023', '01.21.2023', 'Completed'),
    createData(3, 'Bug problem 3', 'Joseph@mail.com', 'AU@mail.com', '01.23.2023', '01.21.2023', 'Approved'),
    createData(4, 'Bug problem 4', 'lchua@mail.com', 'AU@mail.com', '01.23.2023', '01.21.2023', 'In progress'),
    createData(5, 'Bug problem 5', 'AU@mail.com', 'AU@mail.com', '01.23.2023', '01.21.2023', 'In progress'),
    createData(6, 'Bug problem 6', 'DE@mail.com', 'AU@mail.com', '01.23.2023', '01.21.2023', 'In progress'),
    createData(7, 'Bug problem 7', 'IE@mail.com', 'AU@mail.com', '01.23.2023', '01.21.2023', 'In progress'),
    createData(8, 'Bug problem 8', 'MX@mail.com', 'AU@mail.com', '01.23.2023', '01.21.2023', 'In progress'),
    createData(9, 'Bug problem 9', 'JP@mail.com', 'AU@mail.com', '01.23.2023', '01.21.2023', 'In progress'),
    createData(10, 'Bug problem 10', 'FR@mail.com', 'AU@mail.com', '01.23.2023', '01.21.2023', 'In progress'),
    createData(11, 'Bug problem 11', 'GB@mail.com', 'AU@mail.com', '01.23.2023', '01.21.2023', 'In progress'),
    createData(12, 'Bug problem 12', 'RU@mail.com', 'AU@mail.com', '01.23.2023', '01.21.2023', 'In progress'),
    createData(13, 'Bug problem 13', 'NG@mail.com', 'AU@mail.com', '01.23.2023', '01.21.2023', 'In progress'),
    createData(14, 'Bug problem 14', 'BR@mail.com', 'AU@mail.com', '01.23.2023', '01.21.2023', 'In progress'),
  ]);
  
  const [rowsTemp, setRowsTemp] = useState([
    createData(0, 'Bug problem 0', 'Kim@mail.com', 'IE@mail.com', '01.23.2023', '01.21.2023', 'Assigned'),
    createData(1, 'Bug problem 1', 'Lee@mail.com', 'AU@mail.com', '01.23.2023', '01.21.2023', 'In progress'),
    createData(2, 'Bug problem 2', 'John@mail.com', 'AU@mail.com', '01.23.2023', '01.21.2023', 'Completed'),
    createData(3, 'Bug problem 3', 'Joseph@mail.com', 'AU@mail.com', '01.23.2023', '01.21.2023', 'Approved'),
    createData(4, 'Bug problem 4', 'lchua@mail.com', 'AU@mail.com', '01.23.2023', '01.21.2023', 'In progress'),
    createData(5, 'Bug problem 5', 'AU@mail.com', 'AU@mail.com', '01.23.2023', '01.21.2023', 'In progress'),
    createData(6, 'Bug problem 6', 'DE@mail.com', 'AU@mail.com', '01.23.2023', '01.21.2023', 'In progress'),
    createData(7, 'Bug problem 7', 'IE@mail.com', 'AU@mail.com', '01.23.2023', '01.21.2023', 'In progress'),
    createData(8, 'Bug problem 8', 'MX@mail.com', 'AU@mail.com', '01.23.2023', '01.21.2023', 'In progress'),
    createData(9, 'Bug problem 9', 'JP@mail.com', 'AU@mail.com', '01.23.2023', '01.21.2023', 'In progress'),
    createData(10, 'Bug problem 10', 'FR@mail.com', 'AU@mail.com', '01.23.2023', '01.21.2023', 'In progress'),
    createData(11, 'Bug problem 11', 'GB@mail.com', 'AU@mail.com', '01.23.2023', '01.21.2023', 'In progress'),
    createData(12, 'Bug problem 12', 'RU@mail.com', 'AU@mail.com', '01.23.2023', '01.21.2023', 'In progress'),
    createData(13, 'Bug problem 13', 'NG@mail.com', 'AU@mail.com', '01.23.2023', '01.21.2023', 'In progress'),
    createData(14, 'Bug problem 14', 'BR@mail.com', 'AU@mail.com', '01.23.2023', '01.21.2023', 'In progress'),
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
        open={openCreateIssueModal}
        onClose={handleCloseCreateIssueModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New Issue
          </Typography>
          <TextField
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            helperText={"This field is required"}//{errorEmail ? "This field is required" : null}
            error={true}//{errorEmail}
            //onChange={handleOnChange}
            sx={{ marginTop: 2 }}
          />
          <TextField
            required
            id="outlined-multiline-static"
            label="Description"
            fullWidth
            multiline
            helperText={"This field is required"}//{errorEmail ? "This field is required" : null}
            error={true}//{errorEmail}
            //onChange={handleOnChange}
            rows={4}
            sx={{ marginTop: 2, marginBottom: 2 }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Deadline"
              inputFormat="MM/DD/YYYY"
              value={value}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <InputLabel id="demo-simple-select-label">Assigned to</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //value={assignedTo}
              label="Assigned to"
              //onChange={handleAssignedToDropdownChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //value={status}
              label="Status"
              //onChange={handleAssignedToDropdownChange}
            >
              <MenuItem value='assigned'>Assigned</MenuItem>
              <MenuItem value='in-progress'>In progress</MenuItem>
              <MenuItem value='completed'>Completed</MenuItem>
              <MenuItem value='approved'>Approved</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleCreateIssue} sx={{
              backgroundColor: blue[500], color: 'white',
              marginTop: 2,
              marginRight: 1,
            }}>
            Create Issue
          </Button>
          <Button variant="contained" onClick={handleCloseCreateIssueModal} 
            sx={{ 
              backgroundColor: 'red', 
              color: 'white',
              ':hover': {
                bgcolor: red[700],
                color: 'white',
              }, 
              marginTop: 2 }}>
            Cancel
          </Button>
        </Box>
      </Modal>
      <Modal
        open={openDeleteIssueModal}
        onClose={handleCloseDeleteIssueModal}
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
          <Button variant="contained" onClick={handleCloseDeleteIssueModal} sx={{ backgroundColor: blue[500], color: 'white', marginTop: 2 }}>
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
            <Button className="new-issue-btn" onClick={handleOpenCreateIssueModal} 
              variant="contained" sx={{ backgroundColor: blue[500], color: 'white', }}>
              + New Issue
            </Button>
          </Typography>
        </Toolbar>
        <Toolbar>
          <TextField id="outlined-search" label="Search" type="search" onChange={handleSearchBarChange} sx={{ flexGrow: 1, position: 'absolute', right: 0 }}/>
        </Toolbar>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead sx={{ color: 'red' }}>
                <TableRow key='table key'>
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