import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form } from 'react-bootstrap';
import { parseISO, format } from 'date-fns';

const NumScreen = () => {
    const [transactions, setTransactions] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));

    useEffect(() => {
        const fetchTransactions = async () => {
            const params = selectedMonth !== 'all' ? { month: selectedMonth } : {};
            try {
                const { data } = await axios.get(`/api/transactions/get`, { params });
                setTransactions(data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, [selectedMonth]);
  // 用于计算分类总计的函数
  const calculateCategoryTotals = () => {
    const totals = transactions.reduce((acc, transaction) => {
      if (!acc[transaction.category]) {
        acc[transaction.category] = 0;
      }
      acc[transaction.category] += transaction.amount;
      return acc;
    }, {});

    return Object.entries(totals).map(([category, total]) => ({
      category,
      total,
    }));
  };

  const categoryTotals = calculateCategoryTotals();

  return (
    <div style={{ padding: '20px' }}>
    <Form>
        <Form.Group>
            <Form.Label>Filter By Month</Form.Label>
            <Form.Control
                as="select"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
            >
               <option value="all">All</option>
                <option value="2024-01">January 2024</option>
                <option value="2024-02">February 2024</option>
                <option value="2024-03">March 2024</option>
                <option value="2024-04">April 2024</option>
                <option value="2024-05">May 2024</option>
                <option value="2024-06">June 2024</option>
                <option value="2024-07">July 2024</option>
                <option value="2024-08">August 2024</option>
                <option value="2024-09">September 2024</option>
                <option value="2024-10">October 2024</option>
                <option value="2024-11">November 2024</option>
                <option value="2024-12">December 2024</option>
                            
            </Form.Control>
        </Form.Group>
    </Form>

      <h2>Transactions Report</h2>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Reference</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{new Date(transaction.date).toLocaleDateString()}</td>
              <td>{transaction.category}</td>
              <td>{transaction.description}</td>
              <td>${transaction.amount.toFixed(2)}</td>
              <td>{transaction.reference}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h3>Category Totals</h3>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Category</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {categoryTotals.map(({ category, total }, index) => (
            <tr key={index}>
              <td>{category}</td>
              <td>${total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default NumScreen;
