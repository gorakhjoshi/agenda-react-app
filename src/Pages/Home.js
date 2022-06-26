import { Alert, Button, Stack } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../screens/Container";

export default function Home() {
  Moment.suppressDeprecationWarnings = true;
  const [agendas, setAgendas] = useState([]);

  useEffect(() => {
    loadAgendas();
  }, []);

  const loadAgendas = async () => {
    const response = await fetch("http://localhost:3002/agendas");
    const result = await response.json();
    setAgendas(result);
  };

  const deleteAgenda = async (id) => {
    await fetch(`http://localhost:3002/agendas/${id}`, {
      method: "DELETE",
    });
    loadAgendas();
  };

  return (
    <Container>
      {agendas.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Time</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {agendas.map((agenda) => (
                <TableRow key={agenda.id}>
                  <TableCell>{agenda.title}</TableCell>
                  <TableCell component="th" scope="row">
                    {agenda.description}
                  </TableCell>
                  <TableCell align="center">
                    {agenda.status === true ? (
                      <Button variant="outlined" color="success">
                        Complete
                      </Button>
                    ) : (
                      <Button variant="outlined" color="error">
                        Incomplete
                      </Button>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {Moment(agenda.day).format("LLLL")}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="outlined"
                        component={Link}
                        to={`/agendas/view/${agenda.id}`}
                      >
                        View
                      </Button>
                      <Button
                        variant="outlined"
                        component={Link}
                        to={`/agendas/edit/${agenda.id}`}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => deleteAgenda(agenda.id)}
                        color="error"
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Stack sx={{ width: "100%" }} spacing={2} alignItems={"center"}>
          <Alert severity="info">No Agenda added! Please add Agenda.</Alert>
        </Stack>
      )}
    </Container>
  );
}
