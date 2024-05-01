import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLayoutEffect, useRef } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import NumScreen from './NumScreen';

am4core.useTheme(am4themes_animated);

const BillsScreen = () => {
    const chartRef = useRef(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [expenses, setExpenses] = useState({});
    const [categories, setCategories] = useState({});

    useEffect(() => {
        fetchExpenses();
    }, [selectedDate]);

    useLayoutEffect(() => {
        // 创建饼图实例
        let chart = am4core.create("chartdiv", am4charts.PieChart);
        chartRef.current = chart;

        // 设置数据
        chart.data = Object.keys(categories).map(key => ({
            category: key,
            value: categories[key]
        }));

        // 添加饼图系列
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "value";
        pieSeries.dataFields.category = "category";
        pieSeries.slices.template.stroke = am4core.color("#000");
        pieSeries.slices.template.strokeWidth = 2;
        pieSeries.slices.template.strokeOpacity = 1;
        pieSeries.slices.template.strokeDasharray = "2,2";

        return () => {
            chart.dispose();
        };
    }, [categories]);

    const fetchExpenses = async () => {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1;
        const formattedMonth = `${year}-${month < 10 ? `0${month}` : month}`;

        try {
            const response = await axios.get(`/api/transactions/get?month=${formattedMonth}`);
            const monthlyExpenses = {};
            const categoryTotals = {};
            response.data.forEach((transaction) => {
                const day = new Date(transaction.date).getDate();
                monthlyExpenses[day] = (monthlyExpenses[day] || 0) + transaction.amount;

                // Accumulate totals by category
                if (categoryTotals[transaction.category]) {
                    categoryTotals[transaction.category] += transaction.amount;
                } else {
                    categoryTotals[transaction.category] = transaction.amount;
                }
            });
            setExpenses(monthlyExpenses);
            setCategories(categoryTotals);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    const renderDays = () => {
        const monthDays = [];
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        const days = new Date(year, month + 1, 0).getDate();

        for (let day = 1; day <= days; day++) {
            const expenseOfDay = expenses[day] || 0;
            monthDays.push(
                <div key={day} style={{
                    minHeight: '60px',
                    width:'60px',
                    padding: '5px',
                    border: '1px solid #ccc',
                    fontSize: '18px'
                }}>
                    <strong>{day}</strong>
                    {expenses[day] ? <div style={{padding:'5px', fontSize:'13px'}}>-{expenseOfDay.toFixed(2)}</div> : <div>/</div>}
                </div>
            );
        }
        return monthDays;
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%',
                marginBottom: '20px'
            }}>
                <div style={{padding:'10px', border:'1px solid #000'}}>
                    <div style={{ textAlign: 'center' }}> 
                        <h3>Monthly Expenses Calendar</h3>
                    </div>
                    <div style={{padding:'10px'}}>
                        <DatePicker
                            selected={selectedDate}
                            onChange={date => setSelectedDate(date)}
                            dateFormat="yyyy-MM"
                            showMonthYearPicker
                        />
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(7, 1fr)',
                        gap: '5px',
                        maxWidth: '800px'
                    }}>
                        {renderDays()}
                    </div>
                </div>
                <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
            </div>
            <div style={{ width: '100%' }}>
                <NumScreen />
            </div>
        </div>
    );
};

export default BillsScreen;
