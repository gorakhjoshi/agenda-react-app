import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <Box maxWidth={500} margin={"0 auto"}>
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "stretched", sm: "flex-start" }}
        justifyContent={"space-evenly"}
      >
        <Button variant="outlined" component={Link} to={"/"}>
          Home
        </Button>
        <Button variant="outlined" component={Link} to={"/agendas/list"}>
          Import/Export Agenda
        </Button>
        <Button variant="outlined" component={Link} to={"/agendas/add"}>
          Add Agenda
        </Button>
      </Box>
    </Box>
  );
}
