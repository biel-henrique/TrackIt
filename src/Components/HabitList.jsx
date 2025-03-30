import styled from "styled-components";
import { motion } from "framer-motion";

export default function HabitList({ dayWeek, habitList }) {
    return (
        <Animated
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            <ListHabits>
                {habitList.map((item, index) => (   
                    <FlexHabits key={index}>
                        <HabitName>
                            <h1>{item.name}</h1>
                        </HabitName>
                        <FlexButton>
                            {dayWeek.map((days, idx) => (
                                <CustomButton
                                    key={idx}
                                    $set={item.days.includes(idx)}
                                >
                                    {days}
                                </CustomButton>
                            ))}
                        </FlexButton>
                    </FlexHabits>
                ))}
            </ListHabits>
        </Animated>
    );
}

const Animated = styled(motion.div)`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const ListHabits = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 90%;
    justify-content: center;
    align-items: center;
`;

const FlexHabits = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 30px;
    gap: 10px;
    width: 100%;
    background-color: #ffffff;
    border-radius: 10px;
`;

const HabitName = styled.div`
    display: flex;
    justify-content: start;
    width: 100%;

    h1 {
        font-size: 18px;
        font-weight: 400;
        color: #666666;
        word-wrap: break-word;
        overflow-wrap: break-word;
        white-space: normal;
        max-width: 100%;
    }
`;

const CustomButton = styled.div`
    color: ${(props) => (props.$set ? "#FFFFFF" : "#D4D4D4")};
    width: 30px;
    height: 30px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #d4d4d4;
    background-color: ${(props) => (props.$set ? "#CFCFCF" : "")};
    cursor: pointer;
`;

const FlexButton = styled.div`
    display: flex;
    gap: 7px;
    h1 {
        font-size: 18px;
        font-weight: 400;
        text-align: justify;
    }
`;
