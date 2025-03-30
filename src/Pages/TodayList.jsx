import styled from "styled-components";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useContext, useEffect, useState } from "react";
import UserContext from "../Contexts/UserContext";
import axios from "axios";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export default function TodayList() {
    dayjs.locale("pt-br");

    const [todayHabit, setTodayHabit] = useState([]);
    const [updt, setUpdt] = useState(false);
    const [token] = useContext(UserContext);

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
                "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
                config
            )
            .then((res) => {
                setTodayHabit(res.data);
            })
            .catch((err) => console.log(err.response.data.message));
    }, [updt]);

    const checkHabit = (id) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .post(
                `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,
                "",
                config
            )
            .then(() => setUpdt(!updt))
            .catch((err) => console.log(err.response.data.message));
    };

    const unCheckHabit = (id) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .post(
                `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,
                "",
                config
            )
            .then(() => setUpdt(!updt))
            .catch((err) => console.log(err.response.data.message));
    };

    return (
        <Page>
            <Header />
            <Content>
                <Title>
                    <h1>{dayjs().format("dddd, DD/MM")}</h1>
                </Title>
                {todayHabit.length === 0 ? (
                    <NoHabits>
                        <h1>Nenhuma tarefa prevista para o dia de hoje!</h1>
                    </NoHabits>
                ) : (
                    todayHabit.map(
                        (
                            item,
                            index
                        ) => (
                            <Animated
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                key={index}
                            >
                                <Habit>
                                    <HabitTitle>
                                        <h1>{item.name}</h1>
                                    </HabitTitle>
                                    <Sequence>
                                        <Flex>
                                            <h1>
                                                <em>Sequência atual:</em>
                                            </h1>
                                            <h1>{item.currentSequence}</h1>
                                        </Flex>
                                        <Flex>
                                            <h1>
                                                <em>Seu record:</em>
                                            </h1>
                                            <h1>{item.highestSequence}</h1>
                                        </Flex>
                                    </Sequence>
                                    <PositionCheck>
                                        <motion.div whileTap={{ scale: 1.2 }}>
                                            <CheckBoxIcon
                                                sx={{
                                                    color: item.done
                                                        ? "#4CAF50"
                                                        : "#e5e5e5",
                                                    borderRadius: "5px",
                                                    padding: "5px",
                                                    fontSize: "100px",
                                                }}
                                                onClick={() =>
                                                    item.done
                                                        ? unCheckHabit(item.id)
                                                        : checkHabit(item.id)
                                                }
                                            />
                                        </motion.div>
                                    </PositionCheck>
                                </Habit>
                            </Animated>
                        )
                    )
                )}
            </Content>
            <Footer isHabitPage={false} />
        </Page>
    );
}

const PositionCheck = styled.div`
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
`;

const Animated = styled(motion.div)`
    width: 100%;
    display: flex;
    justify-content: center;
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

const Title = styled.div`
    display: flex;
    justify-content: start;
    width: 100%;

    h1 {
        font-size: 23px;
        font-weight: 400;
        color: #126ba5;
    }
`;

const Page = styled.div`
    padding-top: 91px;
    display: flex;
    justify-content: center;
    background-color: #e5e5e5;
    min-height: 100vh;
    width: 100%;
`;

const Flex = styled.div`
    display: flex;
    gap: 10px;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
    width: 90%;
    padding-bottom: 100px;
    gap: 15px;
`;

const Habit = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 10px;
    width: 100%;
    background-color: #ffffff;
    border-radius: 20px;
    position: relative;
`;

const HabitTitle = styled.div`
    h1 {
        font-size: 22px;
        font-weight: 400;
        color: #666666;
        word-wrap: break-word;
        overflow-wrap: break-word;
        white-space: normal;
        max-width: 70%;
    }
`;

const Sequence = styled.div`
    display: flex;
    flex-direction: column;
    h1 {
        font-size: 18px;
        font-weight: 300;
        color: #666666;
        word-wrap: break-word;
        overflow-wrap: break-word;
        white-space: normal;
        max-width: 100%;
    }
`;
