import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditAgenda() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [agenda, setAgenda] = useState({
    title: "",
    description: "",
    status: false,
    day: new Date(),
  });
  const { title, description, status, day } = agenda;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAgenda((prevAgenda) => {
      return {
        ...prevAgenda,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  useEffect(() => {
    loadAgenda();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadAgenda = async () => {
    const response = await fetch(`http://localhost:3002/agendas/${id}`);
    const result = await response.json();
    setAgenda(result);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if (!title && !description && !day) {
      alert("Oops! You misssed a field!");
    } else if (!title) {
      alert("Title is required!");
    } else if (!description) {
      alert("Description is required!");
    } else if (!day) {
      alert("Day is required!");
    } else {
      await fetch(`http://localhost:3002/agendas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(agenda),
      });
      navigate("/");
    }
  };
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      alignItems={{ xs: "stretched", sm: "flex-start" }}
      justifyContent={"center"}
      marginTop={2}
    >
      <Paper elevation={3} sx={{ p: 2, width: "600px" }}>
        <Typography
          variant="h4"
          component="div"
          gutterBottom
          sx={{
            ml: -2,
            mr: -2,
            mt: -2,
            p: 3,
            backgroundColor: "green",
            color: "#fff",
            textAlign: "center",
            borderRadius: "5px",
          }}
        >
          Edit Agenda
        </Typography>
        <form>
          <Box pb={2}>
            <TextField
              fullWidth
              label="Enter Title"
              id="fullWidth"
              value={title}
              onChange={handleChange}
              name="title"
            />
          </Box>
          <Box pb={2}>
            <TextField
              id="outlined-multiline-static"
              label="Agenda Description"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={handleChange}
              name="description"
            />
          </Box>

          <Box pb={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} fullWidth />}
                label="Date & Time"
                value={day}
                name="day"
                onChange={(newValue) => {
                  setAgenda((prevAgenda) => {
                    return {
                      ...prevAgenda,
                      day: newValue,
                    };
                  });
                }}
              />
            </LocalizationProvider>
          </Box>

          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "stretched", sm: "flex-start" }}
            justifyContent={"center"}
          >
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Set Status"
                type="checkbox"
                checked={status}
                onChange={handleChange}
                name="status"
              />
            </FormGroup>
            <Button variant="contained" onClick={handleSubmit}>
              Send
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
