import { SignInContainer, Title } from "./style";
import {
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";

export default function SignIn() {
  return (
    <SignInContainer>
      <Title>Entrar</Title>
      <TextField
        id="standard-email"
        label="Email"
        type="email"
        variant="standard"
        sx={{ width: "100%" }}
      />
      <TextField
        id="standard-password"
        label="Senha"
        type="password"
        variant="standard"
        sx={{ width: "100%" }}
      />
      <FormGroup>
        <FormControlLabel
          control={<Checkbox color="primary" />}
          label="Manter-se conectado"
        />
      </FormGroup>
      <Button variant="contained" sx={{ alignSelf: "center" }}>
        Entrar
      </Button>
      <Link
        sx={{
          alignSelf: "center",
          cursor: "pointer",
          color: "white",
        }}
        underline="none"
      >
        Esqueceu sua senha?
      </Link>
    </SignInContainer>
  );
}
