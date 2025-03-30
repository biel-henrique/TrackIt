import styled from "styled-components";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import UserContext from "../Contexts/UserContext";
import { useContext } from "react";

export default function Footer({isHabitPage}) {
    
    const navigate = useNavigate()

    const habit = () => {
        navigate('/habitos')
    }

    const today = () => {
        navigate('/hoje')
    }

    return(
        <Content>
            <ButtonHabit onClick={habit} $click={isHabitPage}>
                <StyledCalendarIcon $click={isHabitPage}/>
                <h1>Hábitos</h1>
            </ButtonHabit>
            <ButtonToday onClick={today} $click={isHabitPage}>
                <StyledEventIcon $click={isHabitPage}/>
                <h1>Hoje</h1>
            </ButtonToday>
        </Content>
    )
}

const Content = styled.div`
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const ButtonHabit = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
    background-color: ${(props) => (props.$click ? "#52B6FF" : "#ffffff")};
    width: 50%;
    height: 100%;
    color: ${(props) => (props.$click ? "#ffffff" : "#D4D4D4")};
    border-radius: 5px 5px 0 0;
    border: 1px solid lightgray;
    cursor: pointer;

    h1 {
        font-size: 18px;
        font-weight: 400;
    }
`;

const ButtonToday = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
    background-color: ${(props) => (props.$click ? "#ffffff" : "#52B6FF")};
    width: 50%;
    height: 100%;
    color: ${(props) => (props.$click ? "#D4D4D4" : "#ffffff")};
    border-radius: 5px 5px 0 0;
    border: 1px solid lightgray;
    cursor: pointer;
    
    h1 {
        font-size: 18px;
        font-weight: 400;
    }
`;

const StyledCalendarIcon = styled(CalendarMonthIcon)`
    color: ${(props) => (props.$click ? "#ffffff" : "#D4D4D4")};
    font-size: 32px;
`;

const StyledEventIcon = styled(EventAvailableIcon)`
    color: ${(props) => (props.$click ? "#D4D4D4" : "#ffffff")};
    font-size: 32px;
`;