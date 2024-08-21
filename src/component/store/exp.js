import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    expenses: [],
    totalAmount: 0,
    premiumActive: false,
  };
  
  const expensesSlice = createSlice({
    name: "expenses",
    initialState,
    reducers: {
      addExpense(state, action) {
       // console.log(action.payload); //{money: '23', des: 'asdfg', cat: 'Salary', key: '-NzMHzq8nQN6wpdzIMPi'}
        state.expenses.push(action.payload); 
        // console.log(parseFloat(action.payload.money)); // 178
        // state.totalAmount += parseFloat(action.payload.money);
       // console.log(action.payload.money); //100
        state.totalAmount += Number(action.payload.money);
       //console.log(state.totalAmount); // 13557 //13657
        if (state.totalAmount > 10000) {
          state.premiumActive = true;
        }
      },
  
      setExpenses(state, action) {
        state.expenses = action.payload;
        // console.log(state.expenses); //(20) [{…}, // 0: {key: '-NzIz6d_p1zbwqDH96ge', cat: 'Food', des: 'samosh', money: '1000'}
        state.totalAmount = action.payload.reduce((total, expense) => total + parseFloat(expense.money), 0);
        // 
        if (state.totalAmount > 10000) {
          state.premiumActive = true;
        }
      },
  
      updateExpense(state, action) {
        const index = state.expenses.findIndex(expense => expense.key === action.payload.key);
        // console.log(index); //0 give index value
        // console.log(state.expenses[index].money); // old value;
        // console.log(action.payload);//{money: '3000', des: 'samosh', cat: 'Food', key: '-NzIz6d_p1zbwqDH96ge'}  update value
        if (index !== -1) {
          state.totalAmount -= parseFloat(state.expenses[index].money);
          state.expenses[index] = action.payload;
          state.totalAmount += parseFloat(action.payload.money);
          state.premiumActive = state.totalAmount > 10000;
        }
      },
  
      deleteExpense(state, action) {
        const index = state.expenses.findIndex(expense => expense.key === action.payload);
        if (index !== -1) {
          state.totalAmount -= parseFloat(state.expenses[index].money);
          state.expenses.splice(index, 1);
          state.premiumActive = state.totalAmount > 10000;
        }
      },
    },
  });
  
 
  // export const expensesActions = expensesSlice.actions;
  // export default expensesSlice;

  export default expensesSlice.actions;
  export const expensesSl = expensesSlice;
   