import Footer from "../Components/Footer";
import Header from "../Components/Header";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import CreateHabit from "../Components/CreateHabit";
import { motion } from "framer-motion";
import { Navigate, useNavigate } from "react-router-dom";
import UserContext from "../Contexts/UserContext";
import HabitList from "../Components/HabitList";
import { SnackbarProvider, useSnackbar } from 'notistack';

export default function Habits() {
    const [name, setName] = useState("");
    const [daySelected, setDaySelected] = useState(new Set());
    const [openForm, setOpenForm] = useState(false);
    const [habitList, setHabitList] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [updt, setUpdt] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')


    const { enqueueSnackbar } = useSnackbar();

    const snackSucess = () => {
        enqueueSnackbar('Tarefa Adicionada com Sucesso!', { variant: 'success' });
    }

    const snackError = (errorMessage) => {
        enqueueSnackbar(errorMessage, { variant: 'success' });
    }

    const [token] = useContext(UserContext);

    const dayWeek = ["D", "S", "T", "Q", "Q", "S", "S"];
    const navigate = useNavigate();

    const addDays = (item) => {
        setDaySelected((prev) => {
            const newSet = new Set(prev);
            newSet.has(item)
                ? newSet.delete(item)
                : newSet.add(item);
            return newSet;
        });
    };

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, []);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .get(
                "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
                config
            )
            .then((res) => {
                setHabitList(res.data);
            })
            .catch((err) => console.log(err.response.data.message));
    }, [updt]);

    const submitForm = (e) => {
        e.preventDefault();
        setIsLoading(true)

        const days = [...daySelected];

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        
        const body = {
            name,
            days,
        };

        axios
            .post(
                "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
                body,
                config
            )
            .then((res) => {
                setOpenForm(false)
                setName("")
                setDaySelected(new Set())
                setIsLoading(false)
                snackSucess()
                setUpdt(!updt)
            })
            .catch((err) => {
                setIsLoading(false)
                setErrorMessage(err.response.data.message)
                snackError(errorMessage)
            });
    };

    const cancel = () => {
        setOpenForm(false);
    };

    return (
        <SnackbarProvider>
            <Page>
                <Header />
                <Content>
                    <Add>
                        <h1>Meus Hábitos</h1>
                        <AddBoxRoundedIcon
                            onClick={() => setOpenForm(!openForm)}
                            fontSize="large"
                            sx={{
                                color: "#52B6FF",
                                fontSize: 40,
                                cursor: "pointer",
                            }}
                        />
                    </Add>
                    {openForm && (
                        <Animated
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <CreateHabit
                                addDays={addDays}
                                dayWeek={dayWeek}
                                name={name}
                                daySelected={daySelected}
                                setName={setName}
                                submitForm={submitForm}
                                cancel={cancel}
                                isLoading={isLoading}
                            />
                        </Animated>
                    )}
                    {habitList.length === 0 ? (
                        <NoHabits>
                            <h1>
                                Você não tem nenhum hábito cadastrado ainda.
                                Adicione um para começar a trackear!
                            </h1>
                        </NoHabits>
                    ) : (
                        <HabitList dayWeek={dayWeek} habitList={habitList} />
                    )}
                </Content>
                <Footer isHabitPage={true} />
            </Page>
        </SnackbarProvider>
    );
}

const Page = styled.div`
    padding-top: 91px;
    display: flex;
    justify-content: center;
    background-color: #e5e5e5;
    min-height: 100vh;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
    width: 100%;
    padding-bottom: 100px;
`;

const Add = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    align-items: center;
    width: 90%;

    h1 {
        font-size: 23px;
        font-weight: 400;
        color: #126ba5;
    }
`;

const NoHabits = styled.div`
    display: flex;
    justify-content: center;
    color: #666666;
    width: 85%;

    h1 {
        font-size: 18px;
        font-weight: 400;
        text-align: justify;
    }
`;

const Animated = styled(motion.div)`
    width: 100%;
    display: flex;
    justify-content: center;
`;
