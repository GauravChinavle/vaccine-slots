import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const ColorButton = styled(Button)(({ theme }) => ({
    color: "#0063cc",
    height: "38px",
    fontSize: "11px",
    textColor: "#0063cc",
}));

const TextFieldStyled = styled(TextField)(({ theme }) => ({
    color: theme.palette.getContrastText("#0063cc"),
    width: "100%",
    height: "20px",
    fontSize: "10px",
    textAlign: "right",
    marginTop: "5%"
}));

export default function AddMember({ members, setMember }) {
    
    const handleOnClick = () => {
        const newMember = [...members];
        newMember.push({
            name: "",
            paid: 0,
            needToPay: 0,
            owes: 0,
            getsBack: 0
        });
        setMember(newMember);
    };

    const handleOnRemove = (index) => {
        const newMember = [...members];
        newMember.splice(index, 1);
        setMember(newMember);
    };

    const handleOnChange = (event, index) => {
        const newMember = [...members];
        newMember[index].name = event.target.value;
        setMember(newMember);
    };

    return (
        <>
            {members.map((member, index) => {
                return (
                    <div className="row" style={{ marginTop: "8%" }} id={index}>
                        <div className="col" id={`text_field_${index}`}>
                            <TextFieldStyled
                                key={index}
                                id="outlined-basic"
                                label={`Member ${index + 1}`}
                                variant="outlined"
                                size="small"
                                value={member?.name}
                                onChange={(e) => handleOnChange(e, index)}
                                autoFocus
                            />
                        </div>
                        <div className="col" style={{ textAlign: "right" }}>
                            {index !== 0 &&
                                <ColorButton onClick={() => handleOnRemove(index)}>
                                    Remove
                                </ColorButton>
                            }
                        </div>
                    </div>
                );
            })}

            <div className="col" style={{ textAlign: "right", marginTop: "5%" }}>
                <ColorButton onClick={handleOnClick}>Add member</ColorButton>
            </div>
        </>
        // <Box sx={{ width: "90%", margin: "5%", textAlign: "center" }}>

        // </Box>
    );
}