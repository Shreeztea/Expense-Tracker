import React, { useRef } from 'react'
import { TextField, Button, Grid } from '@mui/material';
import { Expense } from '../types';
const ExpenseForm = ({addExpense}: {addExpense: (expense: Expense) => void}) => {
    const description = useRef<HTMLInputElement | null>(null);
    const amount = useRef<HTMLInputElement | null>(null);
    const date = useRef<HTMLInputElement | null>(null);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (description.current && amount.current && date.current) {
            const NewExpense : Expense = {
                'id' : 2,
                'description' : description.current.value,
                'amount' : parseInt(amount.current.value),
                'date': date.current.value,
            }
            addExpense(NewExpense);
            description.current.value = "";
            amount.current.value = "";
            date.current.value = "";
        }
    }
    return (
        <>
            <form onSubmit = {handleSubmit}>
                <Grid container spacing={2} p={4}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Description"
                            inputRef={description}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Amount"
                            inputRef={amount}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            label="Date"
                            inputRef={date}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Add Expense
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}

export default ExpenseForm
