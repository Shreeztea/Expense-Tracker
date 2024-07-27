import React from 'react'
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { Expense } from '../types';

interface ExpenseListProps {
    expenses : Expense[]
}
const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {

    return (
        <>
            <List>
                {expenses.map((expense) =>
                    <ListItem key='{expense.id}'>
                        <ListItemAvatar>
                            <Avatar>A</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={expense.description}
                            secondary={`Amount: ${expense.amount}  Date: ${expense.date}`}
                        />
                    </ListItem>
                )}
            </List>
        </>
    )
}

export default ExpenseList
