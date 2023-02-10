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
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

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
  const [comments, setComments] = useState([
    createData(0, 'John', 'I\'ll need another day to work on this', '18.11.2022 22:44', '18.11.2022 22:44'),
    createData(1, 'Martha', 'Could you add something like a pause button?', '18.11.2022 22:44', null),
    createData(2, 'Jake', 'Looks good!', '18.11.2022 22:44', null),
    createData(3, 'John', 'Thank you for the feedback.', '18.11.2022 22:44', '18.11.2022 22:44'),
  ]);
  // Modal 2 - Delete comment
  const [currentCommentId, setCurrentCommentId] = useState('');
  const [currentCommentCommenterName, setCurrentCommentCommenterName] = useState('');
  const [currentCommentCreatedDateAndTime, setCurrentCommentCreatedDateAndTime] = useState('');

  // Modal 3 - Edit comment
  const [submitClicked, setSubmitClicked] = useState(false);
  const [editCurrentCommentMessage, setCurrentEditCommentMessage] = useState('');
  const errorCurrentEditCommentMessage = submitClicked && editCurrentCommentMessage === '';
  const [editCurrentCommentId, setCurrentEditCommentId] = useState('');
  const [editCurrentCommentName, setCurrentEditCommentName] = useState('');
  const [editCurrentCommentCreatedDateAndTime, setCurrentEditCommentCreatedDateAndTime] = useState('');
  const [editCurrentCommentEditedDateAndTime, setCurrentEditCommentEditedDateAndTime] = useState('');

  // New comment
  const [newCommentMessageSubmitClicked, setNewCommentMessageSubmitClicked] = useState(false);
  const [newCommentMessage, setNewCommentMessage] = useState('');
  const errorNewCommentMessage = newCommentMessageSubmitClicked && newCommentMessage === '';
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

  function createData(id, name, message, createdDateAndTime, editedDateAndTime) {
    return <>
      <Paper key={'paper: ' + id} sx={{ width: '100%', overflow: 'hidden', marginBottom: 2 }}>
        <Container key={'container: ' + id} sx={{ marginTop: 2, marginBottom: 2 }}>
          <Typography key={'type0: ' + id}>
            <Link key={'link1: ' + id} to={"/user-profile"}><b key={'b: ' + id}>{name}</b></Link> says:
              <span key={'span: ' + id} style={{ float: 'right' }}>
                <EditIcon 
                  key={'icon1: ' + id} 
                  sx={{ cursor: 'pointer', color: 'grey' }}
                  onClick={() => handleOpenEditCommentModal(
                    id, name, message, createdDateAndTime, editedDateAndTime)}
                  />
                <DeleteForeverIcon
                  key={'icon2: ' + id}
                  onClick={() => handleOpenDeleteCommentModal(id, name, createdDateAndTime)} 
                  sx={{ cursor: 'pointer', color: 'red' }}
                />
              </span>
          </Typography>
          <Typography key={'type1: ' + id} sx={{ marginTop: 2 }}>
            {message}
          </Typography>
          <Typography key={'type2: ' + id} sx={{ marginTop: 2 }}>
            <i key={'i: ' + id}>{createdDateAndTime} {editedDateAndTime ? '(edited on ' + editedDateAndTime + ')' : null}</i>
          </Typography>
        </Container>
      </Paper> 
    </>
  }

  // Modal 1 - Delete issue
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

  // Modal 2 - Delete comment
  const [openDeleteCommentModal, setOpenDeleteCommentModal] = useState(false);
  const handleOpenDeleteCommentModal = (id, commenterName, createdDateAndTime) => {
    setCurrentCommentId(id);
    setCurrentCommentCommenterName(commenterName);
    setCurrentCommentCreatedDateAndTime(createdDateAndTime);
    setOpenDeleteCommentModal(true);
  };
  
  const handleCloseDeleteCommentModal = () => setOpenDeleteCommentModal(false);
  const handleRemoveComment = () => {
    // Send request to delete from database

    // Remove comment from the UI
    setComments([...comments.filter((comment) => comment.props.children.key !== "paper: " + currentCommentId)]);
    setOpenDeleteCommentModal(false);
  }

  // Modal 3 - Edit comment
  const [openEditCommentModal, setOpenEditCommentModal] = useState(false);
  const handleOpenEditCommentModal = (id, name, message, createdDateAndTime, editedDateAndTime) => {
    setCurrentEditCommentId(id);
    setCurrentEditCommentName(name);
    setCurrentEditCommentMessage(message);
    setCurrentEditCommentCreatedDateAndTime(createdDateAndTime);
    setCurrentEditCommentEditedDateAndTime(editedDateAndTime);
    setOpenEditCommentModal(true);
  };
  
  const handleCloseEditCommentModal = () => {
    setSubmitClicked(false);
    setOpenEditCommentModal(false);
  };

  const handleEditCommentSubmission = () => {
    if (editCurrentCommentMessage !== '') {
        // Send request to edit comment
        // To edit the page, you might just want to fetch the data again
        // Or add a new data to createData(): index to modify the array

        const currentDateAndTime = dayjs().format('MM.DD.YYYY HH:mm').toString();

        // Edit comment on page

        const editArr = [...comments];
        editArr[editCurrentCommentId] = 
          createData(
            editCurrentCommentId,
            editCurrentCommentName,
            editCurrentCommentMessage,
            editCurrentCommentCreatedDateAndTime,
            currentDateAndTime); // Id change to index in the future
        setComments(editArr);

        // Reset the Modal
        setSubmitClicked(false);
        setOpenEditCommentModal(false);
    } else {
      setSubmitClicked(true);
    }
  }

  function handleOnNewCommentMessageChange(event) {
    const eventName = event.target.name;
    const eventValue = event.target.value;

    switch(eventName) {
      case 'newCommentMessage':
        setNewCommentMessage(eventValue);
        break;
      default:
        console.log('Could not read eventName: ' + eventName);
    }    
  }

  function handleOnEditCommentMessageChange(event) {
    const eventName = event.target.name;
    const eventValue = event.target.value;

    switch(eventName) {
      case 'editCurrentCommentMessage':
        setCurrentEditCommentMessage(eventValue);
        break;
      default:
        console.log('Could not read eventName: ' + eventName);
    }
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
        open={openEditCommentModal}
        onClose={handleCloseEditCommentModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Comment from <i>{editCurrentCommentName}</i> on <i>{editCurrentCommentCreatedDateAndTime}</i> 
            {editCurrentCommentEditedDateAndTime ? ' edited on ' : null}
            <i>{editCurrentCommentEditedDateAndTime ? editCurrentCommentEditedDateAndTime : null}</i>
          </Typography>
          <TextField
            required
            id="outlined-multiline-static"
            label="Edit Comment Message"
            name="editCurrentCommentMessage"
            fullWidth
            multiline
            defaultValue={editCurrentCommentMessage}
            helperText={errorCurrentEditCommentMessage ? "This field is required" : null}
            error={errorCurrentEditCommentMessage}
            onChange={handleOnEditCommentMessageChange}
            rows={4}
            sx={{ marginTop: 2, marginBottom: 2 }}
          />
          <Button variant="contained" onClick={handleEditCommentSubmission} sx={{
              backgroundColor: blue[500], color: 'white',
              marginTop: 2,
              marginRight: 1,
            }}>
            Create Issue
          </Button>
          <Button variant="contained" onClick={handleCloseEditCommentModal} 
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
      <Modal
        open={openDeleteCommentModal}
        onClose={handleCloseDeleteCommentModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Remove Comment
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You are about to remove the comment from the user <i>{currentCommentCommenterName}</i> from <i>{currentCommentCreatedDateAndTime}</i>. Continue?
          </Typography>
          <Button variant="contained" onClick={handleRemoveComment} sx={{
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
          <Button variant="contained" onClick={handleCloseDeleteCommentModal} sx={{ backgroundColor: blue[500], color: 'white', marginTop: 2 }}>
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
              Assigned to: <Link to={"/user-profile"}><b>{assignedTo}</b></Link>
              <span style={{ float: 'right' }}>
                <Link color="inherit" to={"/edit-issue"}>
                  <EditIcon sx={{ cursor: 'pointer', color: 'grey' }}/>
                </Link>
                <DeleteForeverIcon 
                  onClick={() => handleOpenDeleteIssueModal()} 
                  sx={{ cursor: 'pointer', color: 'red' }}
                />
              </span>
            </Typography>
            <Typography sx={{ marginTop: 0.5 }}>
              Deadline: <b>{deadline}</b>
            </Typography>
            <Typography sx={{ marginTop: 0.5 }}>
              Assigned by: <Link to={"/user-profile"}><b>{assignedBy}</b></Link>
            </Typography>
            <Typography sx={{ marginTop: 0.5 }}>
              Status: <span style={{ color: getStatusColor(status) }}>{status}</span>
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
      <Container>
        <Toolbar>
          <Typography variant="h6" component="h2">
            Comments ({comments.length})
          </Typography>
        </Toolbar>
        {comments}
        <TextField
            required
            id="outlined-multiline-static"
            label="Write a new comment..."
            name="newCommentMessage"
            fullWidth
            multiline
            helperText={errorNewCommentMessage ? "This field is required" : null}
            error={errorNewCommentMessage}
            onChange={handleOnNewCommentMessageChange}
            rows={4}
            sx={{ marginTop: 2, marginBottom: 2 }}
          />
      </Container>
    </>
  );
}