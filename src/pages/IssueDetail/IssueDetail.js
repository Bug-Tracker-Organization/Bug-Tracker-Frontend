import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';

export default function IssueDetail(props) {
  return (
    <>
    <Container>
      <Toolbar>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Issue Detail
        </Typography>
      </Toolbar>
    </Container>
    </>
  );
}