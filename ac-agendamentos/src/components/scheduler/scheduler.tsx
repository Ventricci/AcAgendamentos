import { useEffect, useRef, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import {
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Link,
  Alert,
  Box,
  Typography,
  Collapse,
  Modal,
} from "@mui/material";
import { ButtonAdd, SchedulerContainer, Title } from "./style";
import React from "react";
import { GET } from "@/app/api/schedule/route";

interface Form {
  email: string;
  password: string;
}

export default function Scheduler() {
  const router = useRouter();
  const [form, setForm] = useState<Form>({ email: "", password: "" });
  const [alert, setAlert] = useState<boolean | undefined>(false);
  const [response, setResponse] = useState<String>("");
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);
  async function getData() {
    const response = await fetch(`/api/schedule`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    if (response?.ok) {
      setEvents(response);
    } else {
      setAlert(true);
    }
  }
  useEffect(() => {
    getData();
    const calendar = new Calendar(calendarRef.current, {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: "dayGridMonth",
      width: "100%",
      height: "100%",
      expandRows: true,
      editable: true,
      selectable: true,
      events: [
        { title: "Event 1", date: "2024-05-28" },
        { title: "Event 2", date: "2024-05-22" },
      ],
      dateClick: function (info) {
        console.log("Clicked on: " + info.dateStr);
        console.log(
          "Coordinates: " + info.jsEvent.pageX + "," + info.jsEvent.pageY
        );
        console.log("Current view: " + info.view.type);
        // change the day's background color just for fun
        info.dayEl.style.backgroundColor = "red";
      },
    });

    calendar.render();
  }, []);
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute" as "absolute",
    padding: "50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    background: "radial-gradient(#9989b0, #564787)",
    opacity: 0.9,
    width: "40%",
    top: "15%",
    left: "30%",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.25)",
    boxSizing: "border-box",
  };

  return (
    <>
      <ButtonAdd>
        <div
          onClick={handleOpen}
          style={{
            color: "#fff",
            fontSize: "70px",
            marginTop: "-56px",
            marginLeft: "-20px",
          }}
        >
          +
        </div>
      </ButtonAdd>

      <Box
        sx={{
          width: "60%",
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Novo Agendamento
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              id="typeVisit"
              label="Tipo de Visita"
              type="string"
              variant="standard"
              value={form.typeVisit}
              onChange={onChangeHandler}
              sx={{ width: "100%" }}
            />
            <TextField
              id="date"
              label="Data"
              type="date"
              variant="standard"
              value={form.date}
              onChange={onChangeHandler}
              sx={{ width: "100%" }}
            />
            <TextField
              id="hour"
              label="Hora"
              type="time"
              variant="standard"
              value={form.hour}
              onChange={onChangeHandler}
              sx={{ width: "100%" }}
            />

            <TextField
              id="street"
              label="Rua"
              type="string"
              variant="standard"
              value={form.street}
              onChange={onChangeHandler}
              sx={{ width: "100%" }}
            />
            <TextField
              id="number"
              label="Número"
              type="string"
              variant="standard"
              value={form.number}
              onChange={onChangeHandler}
              sx={{ width: "100%" }}
            />

            <TextField
              id="neighborhood"
              label="Bairro"
              type="string"
              variant="standard"
              value={form.neighborhood}
              onChange={onChangeHandler}
              sx={{ width: "100%" }}
            />
            <TextField
              id="city"
              label="Cidade"
              type="string"
              variant="standard"
              value={form.city}
              onChange={onChangeHandler}
              sx={{ width: "100%" }}
            />
            <TextField
              id="email"
              label="E-mail"
              type="email"
              variant="standard"
              value={form.email}
              onChange={onChangeHandler}
              sx={{ width: "100%" }}
            />
            <TextField
              id="observation"
              label="Observações"
              type="text"
              variant="standard"
              value={form.observation}
              onChange={onChangeHandler}
              sx={{ width: "100%" }}
            />
          </Typography>
          <Button
            variant="contained"
            sx={{ alignSelf: "center", mt: 2 }}
            onClick={submit}
          >
            Salvar
          </Button>
        </Box>
      </Modal>
      <SchedulerContainer>
        <div ref={calendarRef} style={{ width: "100%" }}></div>
      </SchedulerContainer>
    </>
  );
}
