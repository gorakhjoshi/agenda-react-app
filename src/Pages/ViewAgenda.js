import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Moment from "moment";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewAgendaNew() {
  const [agenda, setAgenda] = useState({
    title: "",
    description: "",
    status: false,
    day: "",
  });
  const { id } = useParams();

  useEffect(() => {
    laodAgenda();
  }, []);

  const laodAgenda = async () => {
    const response = await fetch(`http://localhost:3002/agendas/${id}`);
    const result = await response.json();
    setAgenda(result);
  };

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      alignItems={{ xs: "stretched", sm: "flex-start" }}
      justifyContent={"center"}
      marginTop={2}
    >
      <Card sx={{ width: "600px" }}>
        <CardHeader
          avatar={
            agenda.status ? (
              <CheckCircleIcon fontSize="large" color="success" />
            ) : (
              <CancelIcon fontSize="large" color="error" />
            )
          }
          title={agenda.title}
          subheader={Moment(agenda.day).format("LLLL")}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {agenda.description}
          </Typography>
          <Button
            variant="outlined"
            component={Link}
            to={"/"}
            sx={{ marginTop: "10px" }}
          >
            Go Back
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
