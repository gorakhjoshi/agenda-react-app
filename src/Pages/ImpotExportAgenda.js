import { Alert, Button, Container, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

export default function ImpotExportAgenda() {
  const navigate = useNavigate();

  const [agendas, setAgendas] = useState([]);
  const [importedAgendas, setImportedAgendas] = useState([]);

  console.log(importedAgendas);

  useEffect(() => {
    loadAgendas();
  }, []);

  const loadAgendas = async () => {
    const response = await fetch("http://localhost:3002/agendas");
    const result = await response.json();
    console.log(result);
    setAgendas(result);
  };

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      console.log(fileReader);

      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        console.log("loading");
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then(async (d) => {
      setImportedAgendas(d);
    });
  };

  const importAgendas = async () => {
    await fetch(`http://localhost:3002/agendas/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(...importedAgendas),
    });
    navigate("/");
  };

  return (
    <Container>
      <Button variant="contained" component="label" sx={{ mb: 2 }}>
        Upload File
        <input
          type="file"
          hidden
          onChange={(e) => {
            const file = e.target.files[0];

            readExcel(file);
          }}
        />
      </Button>
      {importedAgendas.length > 0 ? (
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {importedAgendas.map((agenda, index) => (
                <TableRow key={index}>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            color="primary"
            onClick={importAgendas}
          >
            Import to Database
          </Button>
        </Box>
      ) : (
        <Stack sx={{ width: "100%" }} spacing={2} alignItems={"center"}>
          <Alert severity="info">Please upload Agenda.</Alert>
        </Stack>
      )}
    </Container>
  );
}
