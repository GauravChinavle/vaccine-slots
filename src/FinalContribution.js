import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import debt from "./services/debt";
import split from "./services/split";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';


export default function FinalContribution({
    members,
    paidBy,
    setPaidBy,
    expenses,
    setExpenses,
}) {

    const [result, setResult] = React.useState([]);
    React.useEffect(()=>{
        try {
            const splitResult =  split(expenses, members);
            const result =  debt(splitResult);
            setResult(result);
        } catch (e) {
            console.log(e);
        }
        
    },[])
   
    const downloadFile = () => {
        let log = '';
        expenses.map((e)=>{
            log += `Expense Name: ${e.expenseName}` + `\n` +
                    `Amount spent: ${e.amount}` + `\n` +
                    `Paid by: ${e.paidBy}` + `\n` +
                    `Split with: ${e.splitWith.join(", ")}` + `\n` +
                    `________________________________` + `\n\n`
        })
    }
    const downloadTxtFile = () => {
        const element = document.createElement("a");
        let log = '';
        expenses.map((e)=>{
            log += `Expense Name: ${e.expenseName}` + `\n` +
                    `Amount spent: ${e.amount} rupees` + `\n` +
                    `Paid by: ${e.paidBy}` + `\n` +
                    `Split with: ${e.splitWith.join(", ")}` + `\n` +
                    `________________________________` + `\n\n`
        })
        const file = new Blob([log], {
          type: "text/plain"
        });
        element.href = URL.createObjectURL(file);
        element.download = "expense_report.txt";
        document.body.appendChild(element);
        element.click();
      };
    
    return (
        <Box sx={{ width: "90%", margin: "5%", textAlign: "center" }}>
            {
                result.length == 0 && <>
                <div className="row">
                    <InputLabel id="demo-simple-select-label">
                        {`Please enter data.....`}
                    </InputLabel>
                    
                    
                </div>


                <hr />
            </>
            }
            {result.map((res) => {
                return (
                    <>
                        <div className="row">
                            <InputLabel id="demo-simple-select-label">
                                {`${res}`}
                            </InputLabel>
                            
                            
                        </div>


                        <hr />
                    </>
                );
            })}
           {expenses?.length && <div className="row">
                <Link>
                    <Button onClick={downloadTxtFile}>Download expense report</Button>
                </Link>
            </div>}
        </Box>
    );
}
