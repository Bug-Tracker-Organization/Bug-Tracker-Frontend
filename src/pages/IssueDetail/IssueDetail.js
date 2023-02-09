import { useState } from 'react';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import { blue, red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Link, useNavigate } from 'react-router-dom';

export default function IssueDetail(props) {

  const [id, setId] = useState(null);
  const [title, setTitle] = useState('TITLE NOT FOUND');
  const [description, setDescription] = useState('DESCRIPTION NOT FOUND');
  const [assignedTo, setAssignedTo] = useState('ASSIGNED TO NOT FOUND');
  const [deadline, setDeadline] = useState('DEADLINE NOT FOUND');
  const [assignedBy, setAssignedBy] = useState('ASSIGNED BY NOT FOUND');
  const [status, setStatus] = useState('STATUS NOT FOUND');
  const [issuedOn, setIssuedOn] = useState('ISSUED ON NOT FOUND');
  const [lastChanged, setLastChanged] = useState('LAST CHANGED NOT FOUND');
  const navigate = useNavigate();

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

  // Modal - Delete issue
  const [openDeleteIssueModal, setOpenDeleteIssueModal] = useState(false);
  const handleOpenDeleteIssueModal = () => {
    setOpenDeleteIssueModal(true);
  };
  
  const handleCloseDeleteIssueModal = () => setOpenDeleteIssueModal(false);
  const handleRemoveIssue = () => {
    // Send request to delete from database

    setOpenDeleteIssueModal(false);
    navigate('/issues-overview', {state: null});
  }

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
            You are about to remove the issue <i>{title}</i>. Continue?
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
          <Typography variant="h6" component="h2">
            Issue Detail
          </Typography>
        </Toolbar>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <Container sx={{ marginTop: 2, marginBottom: 2 }}>
            <Typography>
              Assigned to: <b>{assignedTo}</b>
              <Typography display="inline" sx={{ float: 'right' }}>
                <Link color="inherit" to={"/edit-issue"}>
                  <EditIcon sx={{ cursor: 'pointer', color: 'grey' }}/>
                </Link>
                <DeleteForeverIcon 
                  onClick={() => handleOpenDeleteIssueModal()} 
                  sx={{ cursor: 'pointer', color: 'red' }}
                />
              </Typography>
            </Typography>
            <Typography sx={{ marginTop: 0.5 }}>
              Deadline: <b>{deadline}</b>
            </Typography>
            <Typography sx={{ marginTop: 0.5 }}>
              Assigned by: <b>{assignedBy}</b>
            </Typography>
            <Typography sx={{ marginTop: 0.5 }}>
              Status: <Typography display="inline" sx={{ color: getStatusColor(status) }}>{status}</Typography>
            </Typography>
            <Typography sx={{ marginTop: 0.5 }}>
              Issued on: <b>{issuedOn}</b>
            </Typography>
            <Typography sx={{ marginTop: 0.5 }}>
              Last changed: <b>{lastChanged}</b>
            </Typography>
            <Typography variant="h5" component="h2" sx={{ marginTop: 2, marginBottom: 2}}>
              <b>{title}</b>
            </Typography>
            <Typography>
              {description}
            </Typography>            
          </Container>
        </Paper>
      </Container>
    </>
  );
}