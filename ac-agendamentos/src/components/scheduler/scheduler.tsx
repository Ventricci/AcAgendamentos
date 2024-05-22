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
  typeVisit: string;
  date: string;
  hour: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  email: string;
  observation: string;
}

export default function Scheduler() {
  const router = useRouter();
  const [form, setForm] = useState<Form>({
    typeVisit: "",
    date: "",
    hour: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    email: "",
    observation: "",
  });
  const [alerta, setAlert] = useState<boolean | undefined>(false);
  const [response, setResponse] = useState<String>("");
  const calendarRef = React.useRef();
  const [events, setEvents] = useState([]);
  async function getData() {
    try {
      const response = await fetch(`/api/schedule`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      await Promise.all(
        data.data.map((item: any) => {
          item.date = item.dateTime;
          item.title = item.type + " - " + item.city;
        })
      );

      setEvents(data.data);
      try {
        console.log(events);
        var calendar = new Calendar(calendarRef.current, {
          plugins: [dayGridPlugin, interactionPlugin],
          initialView: "dayGridMonth",
          height: "100%",
          expandRows: true,
          editable: true,
          selectable: true,
          events: data.data,
          eventClick: function (info) {
            alert("Event: " + info.event.title);
            console.log(info.event);
          },
        });

        calendar.render();
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      setAlert(true);
    }
  }

  useEffect(() => {
    getData();
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
    if (alerta) {
      let timer1 = setTimeout(() => setAlert(false), 4000);

      return () => {
        clearTimeout(timer1);
      };
    }
  }, [alerta]);
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
        <Collapse in={alerta}>
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
