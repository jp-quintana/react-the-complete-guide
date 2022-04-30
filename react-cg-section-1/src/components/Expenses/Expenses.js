import { useState } from 'react'

import ExpenseItem from './ExpenseItem';
import ExpensesFilter from './ExpensesFilter'
import ExpensesList from './ExpensesList'
import ExpensesChart from './ExpensesChart'

import Card from '../UI/Card'


import './Expenses.css';


const ExpenseItemContainer = props => {

  const [filteredYear, setFilteredYear] = useState('2020')

  const filterChangeHandler = selectedYear => {
    setFilteredYear(selectedYear)
  }

  const filteredExpenses = props.items.filter(expense => expense.date.getFullYear().toString() === filteredYear)

  return (
    <li>
      <Card className="expenses">
      <ExpensesFilter selected={filteredYear} onChangeFilter={filterChangeHandler} />
      <ExpensesChart expenses={filteredExpenses} />
      <ExpensesList items={filteredExpenses}/>
      </Card>
    </li>

  )

}

export default ExpenseItemContainer;
