import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import expensesActions from "./store/exp";
import { themeActions } from "./store/Theme";

import { LuToggleLeft } from "react-icons/lu";
import { LuToggleRight } from "react-icons/lu";

export default function Vote() {
  const [money, setMoney] = useState("");
  const [des, setDes] = useState("");
  const [cat, setCat] = useState("BJP");
  const [editingKey, setEditingKey] = useState(null);

  const [sortOrder, setSortOrder] = useState("default");
  const [increasingOrder, setIncreasingOrder] = useState([]);
  const [decreaseOrder, setDecreaseOrder] = useState([]);

  //   const sortExpenses = (event) => {
  //     event.preventDefault();
  // console.log(sortOrder);

  // if(sortOrder == ""){

  // }

  //    }

  const dispatch = useDispatch();
  // const allexp = useDispatch((state)=>state.expenses);
  const expenses = useSelector((state) => state.expenses.expenses);
  const totalAmount = useSelector((state) => state.expenses.totalAmount);
  const premiumActive = useSelector((state) => state.expenses.premiumActive);

  const theme = useSelector((state) => state.themeUse.isDarkMode);
  // console.log(theme); //{isDarkMode: false}

  // console.log(expenses);
  // console.log(totalAmount);
  // console.log(premiumActive);

  const submitHandle = (e) => {
    e.preventDefault();
    const newData = { money, des, cat };

    if (editingKey) {
      fetch(
        // `https://expensetracker-7f8dd-default-rtdb.firebaseio.com/expensetracker/${editingKey}.json`,
        `https://expensetrackerv1-eb334-default-rtdb.firebaseio.com/expensetracker/${editingKey}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        }
      )
        .then((res) => res.json())
        .then(() => {
          // console.log(newData); //{money: '2000', des: 'samosh', cat: 'Food'} update value
          // console.log(editingKey); //-NzIz6d_p1zbwqDH96ge
          dispatch(
            expensesActions.updateExpense({ ...newData, key: editingKey })
          );
          setMoney("");
          setDes("");
          setCat("Food");
          setEditingKey(null);
        })
        .catch((error) => console.error("Error updating data:", error));
    } else {
      console.log(newData);
      fetch(
        "https://expensetrackerv1-eb334-default-rtdb.firebaseio.com/expensetracker.json",

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        }
      )
        .then(
          (
            res 
          ) => {
            res.json();
            console.log(res);
          }
        )
        
        .then((data) => {
          dispatch(expensesActions.addExpense({ ...newData, key: data.name }));
          setMoney("");
          setDes("");
          setCat("BJP");
        })
        .catch((error) => console.error("Error saving data:", error));
    }
  };

  const deleteExpense = (key) => {
    fetch(
      `https://expensetrackerv1-eb334-default-rtdb.firebaseio.com/expensetracker/${key}.json`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (res.ok) {
          dispatch(expensesActions.deleteExpense(key));
        } else {
          throw new Error("Failed to delete data.");
        }
      })
      .catch((error) => console.error("Error deleting data:", error));
  };

  const getData = () => {
    fetch(
      "https://expensetrackerv1-eb334-default-rtdb.firebaseio.com/expensetracker.json",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to fetch data.");
        }
      })
      .then((data) => {
        const dataArray = data
          ? Object.keys(data).map((key) => ({ key, ...data[key] }))
          : [];

        dispatch(expensesActions.setExpenses(dataArray));
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const editExpense = (expense) => {
    setMoney(expense.money);
    setDes(expense.des);
    setCat(expense.cat);
    setEditingKey(expense.key);
  };

  useEffect(() => {
    getData();
  });


  return (
    <div
      className={`${
        theme
          ? "flex flex-col justify-center items-center min-h-screen bg-gray-900 "
          : "flex flex-col justify-center items-center min-h-screen bg-gray-100"
      }`}
    >
      <form
        className={`p-6 rounded-lg shadow-lg w-full max-w-md  m-2 ${
          theme ? "bg-gray-800" : "bg-white"
        }`}
        onSubmit={submitHandle}
      >
        <div className="mb-4">
          <label
            htmlFor="money"
            className={`${
              theme
                ? "block text-gray-300 font-bold mb-2"
                : "block text-gray-700 font-bold mb-2"
            }`}
          >
            Enter Name
          </label>
          <input
            type="text"
            name="money"
            value={money}
            onChange={(e) => setMoney(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme ? "border-gray-700" : "border-gray-300"
            }`}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className={`block font-bold mb-1 ${
              theme ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Enter Description
          </label>
          <input
            type="text"
            name="description"
            value={des}
            onChange={(e) => setDes(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme ? "border-gray-700" : "border-gray-300"
            }`}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className={`block font-bold mb-1 ${
              theme ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Category
          </label>
          <select
            name="category"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme ? "border-gray-700" : "border-gray-300"
            }`}
          >
            <option value="Food">BJP</option>
            <option value="Petrol">BSP</option>
            <option value="Salary">INC</option>
            <option value="Vegetable">CPM</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button
            className={`px-4 py-2 bg-blue-500 text-white font-bold rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500${
              theme
                ? "bg-blue-700 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-900"
            }`}
          >
            {editingKey ? "Update" : "Submit"}
          </button>
        </div>
      </form>

      

      
      

      

      <div className="mt-6 w-full max-w-md">
        {expenses.map((expense) => (
          <div
            key={expense.key}
            className={`p-4 rounded-lg shadow-md mb-4 ${
              theme ? "bg-gray-800" : "bg-white"
            }`}
          >
            <p className={`${theme ? "text-gray-300" : "text-gray-700"}`}>
              <strong>Money:</strong> {expense.money}
            </p>
            <p className={`${theme ? "text-gray-300" : "text-gray-700"}`}>
              <strong>Description:</strong> {expense.des}
            </p>
            <p className={`${theme ? "text-gray-300" : "text-gray-700"}`}>
              <strong>Category:</strong> {expense.cat}
            </p>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => editExpense(expense)}
                className="px-4 py-2 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => deleteExpense(expense.key)}
                className="px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
