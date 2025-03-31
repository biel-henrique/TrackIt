import { useState } from "react";
import styled from "styled-components";
import {SyncLoader} from 'react-spinners';
import TextField from "@mui/material/TextField";


export default function CreateHabit({addDays, dayWeek, name, daySelected, setName, submitForm, cancel, isLoading}) {
    
    return (
        <Form onSubmit={submitForm}>
            <TextField
                type="Text"
                value={name}
                className="name"
                label="Proxima Tarefa"
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading ? true : false}
                sx={{width:'90%'}}
            />
            {name && (
                <Days>
                    {dayWeek.map((item, index) => (
                        <CustomButton
                            key={index}
                            onClick={() => addDays(index)}
                            $set={daySelected.has(index)}
                            $disabled={isLoading}
                        >
                            {item}
                        </CustomButton>
                    ))}
                </Days>
            )}
            {daySelected.size > 0 && (
                <Confirmation>
                    <ButtonCancel onClick={cancel}>
                        <h1>Cancelar</h1>
                    </ButtonCancel>
                    <ButtonSave type="submit">
                        {!isLoading ? 'Salvar' : <SyncLoader size={8} color="gray"/>}
                    </ButtonSave>
                </Confirmation>
            )}
        </Form>
    );
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 90%;
    align-items: center;
    justify-content: space-between;
    padding: 30px 0;
    gap: 25px;
    border: 1px solid #D4D4D4;
    border-radius: 5px;
    background-color: #FFFFFF;
`

const Days = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
`

const CustomButton = styled.div`
  color: ${(props) => (props.$set ? "#FFFFFF" : "#D4D4D4")};;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #D4D4D4;
  background-color: ${(props) => (props.$set ? "#CFCFCF" : "")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`

const ButtonSave = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #52B6FF;
    width: 27%;
    height: 35px;
    color: #ffffff;
    border-radius: 5px;
    border: none;
    box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.3);

    h1 {
        font-size: 15px;
        font-weight: 300;
    }
`;

const ButtonCancel = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 27%;
    height: 35px;
    color: #52B6FF;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    background-color: transparent;

    h1 {
        font-size: 15px;
        font-weight: 300;
    }
`

const Confirmation = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-right: 30px;
    gap: 5px;
`