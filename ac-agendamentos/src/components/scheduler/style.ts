import { styled } from "styled-components";
import { TextField } from "@mui/material";

export const SchedulerContainer = styled.div`
  width: 70vw;
  height: 70vh;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background: radial-gradient(#9989b0, #564787);
  opacity: 0.75;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
`;
export const ButtonAdd = styled.div`
  width: 30px;
  height: 30px;
  padding: 40px;
  display: flex;
  /* flex-direction: column; */
  align-items: flex-start;
  justify-content: space-between;
  background: radial-gradient(#9989b0, #564787);
  left: 0px;
  opacity: 0.75;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  position: absolute;
  left: 10px;
  top: 10px;
`;
export const Title = styled.p`
  font-size: 24px;
  font-weight: 500;
  color: #fff;
`;

export const StyledTextField = styled(TextField)``;

export const StyledForm = styled.form;
