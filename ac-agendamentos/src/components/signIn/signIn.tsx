import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Link,
  Alert,
  Box,
  Collapse,
} from "@mui/material";
import { SignInContainer, Title } from "./style";

interface Form {
  email: string;
  password: string;
}

export default function SignIn() {
  const router = useRouter();
  const [form, setForm] = useState<Form>({ email: "", password: "" });
  const [alert, setAlert] = useState<boolean | undefined>(false);
  const [response, setResponse] = useState<String>("");

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevForm) => ({
      ...prevForm,
      [event.target.id]: event.target.value,
    }));
  };

  async function submit() {
    const response = await signIn("credentials", { ...form, redirect: false });
    if (response?.ok) {
      router.push("/dashboard");
    } else {
      setAlert(true);
    }
  }

  useEffect(() => {
    if (alert) {
      let timer1 = setTimeout(() => setAlert(false), 4000);

      return () => {
        clearTimeout(timer1);
      };
    }
  }, [alert]);

  return (
    <>
      <Box
        sx={{
          width: "30%",
          position: "absolute",
          top: "10px",
          right: "10px",
        }}
      >
        <Collapse in={alert}>
          <Alert
            variant="filled"
            severity="error"
            onClose={() => {
              setAlert(false);
            }}
          >
            Houve um erro ao tentar se conectar, verifique os dados inseridos e
            tente novamente.
          </Alert>
        </Collapse>
      </Box>

      <SignInContainer>
        <Title>Entrar</Title>
        <TextField
          id="email"
          label="Email"
          type="email"
          variant="standard"
          value={form.email}
          onChange={onChangeHandler}
          sx={{ width: "100%" }}
        />
        <TextField
          id="password"
          label="Senha"
          type="password"
          variant="standard"
          value={form.password}
          onChange={onChangeHandler}
          sx={{ width: "100%" }}
        />
        <FormGroup>
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Manter-se conectado"
          />
        </FormGroup>
        <Button
          variant="contained"
          sx={{ alignSelf: "center" }}
          onClick={submit}
        >
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
    </>
  );
}
