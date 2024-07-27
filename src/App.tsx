import React, { useState, useMemo } from 'react';
import { Container, Grid } from '@mui/material';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import { Expense } from './types';

const App = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);

    const addExpense = (newExp: Expense) => {
        setExpenses([...expenses, newExp]);
    };

    const totals = useMemo(() => {
        const today = new Date('2024-07-26');
        const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

        let totalExpense = 0;
        let totalExpenseToday = 0;
        let totalExpenseYesterday = 0;
        let totalExpenseThisMonth = 0;
        let totalExpenseLastMonth = 0;

        expenses.forEach(expense => {
            const amount = expense.amount;
            const date = new Date(expense.date);

            totalExpense += amount;

            if (date.toDateString() === today.toDateString()) {
                totalExpenseToday += amount;
            } else if (date.toDateString() === new Date(today.getTime() - 86400000).toDateString()) {
                totalExpenseYesterday += amount;
            }

            if (date >= firstDayOfCurrentMonth && date <= today) {
                totalExpenseThisMonth += amount;
            }

            if (date >= firstDayOfLastMonth && date <= lastDayOfLastMonth) {
                totalExpenseLastMonth += amount;
            }
        });

        return {
            totalExpense,
            totalExpenseToday,
            totalExpenseYesterday,
            totalExpenseThisMonth,
            totalExpenseLastMonth,
        };
    }, [expenses]);

    return (
        <Container>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                <h1>Expense Tracker</h1>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <h2>Total Expense: {totals.totalExpense}</h2>
                    <h2>Total Expense Today: {totals.totalExpenseToday}</h2>
                    <h2>Total Expense Yesterday: {totals.totalExpenseYesterday}</h2>
                    <h2>Total Expense This Month: {totals.totalExpenseThisMonth}</h2>
                    <h2>Total Expense Last Month: {totals.totalExpenseLastMonth}</h2>
                </Grid>
                <Grid item xs={4}>
                    <ExpenseForm addExpense={addExpense} />
                </Grid>
                <Grid item xs={4}>
                    <ExpenseList expenses={expenses} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default App;
