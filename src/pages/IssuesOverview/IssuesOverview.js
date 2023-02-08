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
  const [currentUserName, setCurrentUserName] = useState('CURRENT USER NAME NOT FOUND');
  
  // For Modal 1 - Create Issue
  const [submitClicked, setSubmitClicked] = useState(false);
  const [title, setTitle] = useState('');
  const errorTitle = submitClicked && title === '';
  const [description, setDescription] = useState('');
  const errorDescription = submitClicked && description === '';
  // Datepicker
  const [deadline, setDeadline] = React.useState(dayjs());
  const handleDateChange = (newDeadline) => {
    setDeadline(newDeadline);
  };
  const errorDeadline = submitClicked && dayjs(deadline).isValid();  
  const [assignedTo, setAssignedTo] = useState('');
  const errorAssignedTo = submitClicked && assignedTo === '';
  const [status, setStatus] = useState('Assigned');

  const navigate = useNavigate();

  // Modal 1 - Create Issue
  function handleOnChange(event) {

    const eventName = event.target.name;
    const eventValue = event.target.value;

    switch(eventName) {
      case 'title':
        setTitle(eventValue);
        break;
      case 'description':
        setDescription(eventValue);
        break;
      case 'assignedTo':
        setAssignedTo(eventValue);
        break;
      case 'status':
        setStatus(eventValue);
        break;
      default:
        console.log('Could not read eventName: ' + eventName);
    }
  }

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
    // Reset the page or else user will not show anything if on another page
    setPage(0);
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
  
  const handleCloseCreateIssueModal = () => {
    setDeadline(dayjs());
    setAssignedTo('');
    setStatus('Assigned');
    setSubmitClicked(false);
    setOpenCreateIssueModal(false);
  };
  const handleCreateIssue = () => {

    if (title !== '' 
      && description !== '' 
      && assignedTo !== '' 
      && dayjs(deadline).isValid()) {
        // Send request to create to database

        // Add new data to table (create a new row)
        const deadlineFormatted = deadline.format('MM.DD.YYYY').toString();
        const currentDateFormatted = dayjs().format('MM.DD.YYYY').toString();
        const assignedToUser = users[assignedTo] ? users[assignedTo].name : 'COULD NOT FIND USER NAME';

        setRows([...rows, 
          createData(
            rows.length,
            title, 
            assignedToUser, 
            currentUserName, 
            deadlineFormatted,
            currentDateFormatted,
            status)]);
        setRowsTemp([...rowsTemp,
          createData(
            rowsTemp.length,
            title, 
            assignedToUser,
            currentUserName, 
            deadlineFormatted,
            currentDateFormatted,
            status)]);
        // Reset the Modal
        setAssignedTo('');
        setSubmitClicked(false);
        setOpenCreateIssueModal(false);
    } else {
      setSubmitClicked(true);
    }
  }

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
    setRowsTemp([...rowsTemp.filter((item) => item.id !== currentIssueId)]);
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
  
  function createData(
      id, 
      titleUnformatted, 
      assignedToUnformatted, 
      assignedByUnformatted, 
      deadline, 
      issuedOn, 
      statusUnformatted) {
    const title = <>
        <Link key={'title-link: ' + id} color="inherit" to={"/issue-detail"}>
          <b>{titleUnformatted}</b>
        </Link>
      </>
    const assignedTo = <>
        <Link key={'assigned-to-link: ' + id} color="inherit" to={"/user-profile"}>
          {assignedToUnformatted}
        </Link>
      </>
    const assignedBy = <>
        <Link key={'assigned-by-link: ' + id} color="inherit" to={"/user-profile"}>
          {assignedByUnformatted}
        </Link>
      </>
    const statusColor = getStatusColor(statusUnformatted);
    const status = <><Typography sx={{ color: statusColor }}>
        {statusUnformatted}
      </Typography></>
    const actions = <>
        <Link key={'actions-link: ' + id} color="inherit" to={"/edit-issue"}>
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
  
  function getStatusColor(status) {
    if (status === 'Assigned') {
      return 'orange';
    } else if (status === 'In progress') {
      return blue[500];
    } else if (status === 'Completed') {
      return 'blue';
    }
    return 'green';
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

  const users = [{ id: 0, name: 'BR@mail.com' }, 
    { id: 1, name: 'AU@mail.com' },
    { id: 2, name: 'DE@mail.com' },
    { id: 3, name: 'Lee@mail.com' }];

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
            helperText={errorTitle ? "This field is required" : null}
            error={errorTitle}
            onChange={handleOnChange}
            sx={{ marginTop: 2 }}
          />
          <TextField
            required
            id="outlined-multiline-static"
            label="Description"
            name="description"
            fullWidth
            multiline
            helperText={errorDescription ? "This field is required" : null}
            error={errorDescription}
            onChange={handleOnChange}
            rows={4}
            sx={{ marginTop: 2, marginBottom: 2 }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Deadline"
              inputFormat="MM/DD/YYYY"
              value={deadline}
              name="deadline"
              error={errorDeadline}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <InputLabel id="assignedTo">Assigned to</InputLabel>
            <Select
              required
              labelId="assignedTo"
              id="assignedTo"
              name="assignedTo"
              value={assignedTo}
              label="Assigned to"
              error={errorAssignedTo}
              onChange={handleOnChange}
            >
              {users.map((item) => (
                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <InputLabel id="status">Status</InputLabel>
            <Select
              labelId="status"
              id="status"
              name="status"
              value={status}
              label="Status"
              onChange={handleOnChange}
            >
              <MenuItem value='Assigned'>Assigned</MenuItem>
              <MenuItem value='In progress'>In progress</MenuItem>
              <MenuItem value='Completed'>Completed</MenuItem>
              <MenuItem value='Approved'>Approved</MenuItem>
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
                      <TableRow key={'row: ' + row.id} hover role="checkbox" tabIndex={-1}>
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