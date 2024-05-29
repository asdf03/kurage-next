"use client"

import React from 'react';
import { useState, useEffect } from 'react';
import styles from './Calendar.module.css';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [localeDate, setLocaleDate] = useState<string | null>(null)

    useEffect(() => {
        setLocaleDate(currentDate.toLocaleString('default', { month: 'long' }));
    }, [currentDate]);

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

    const daysInMonth: number[] = []
    for (let i = 1; i <= endOfMonth.getDate(); i++) {
        daysInMonth.push(i)
    }

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const today = new Date()
    const isToday = (day: number) =>
        day === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear()

    return (
        <div className={styles.calendar}>
            <div className={styles.header}>
                <button onClick={prevMonth}>&lt;</button>
                <h2>{localeDate}{currentDate.getFullYear()}</h2>
                <button onClick={nextMonth}>&gt;</button>
            </div>
            <div className={styles.days}>
                {daysInMonth.map(day => (
                    <div
                        key={day}
                        className={`${styles.day} ${isToday(day) ? styles.today : ''}`}
                    >
                    {day}
                </div>
                ))}
            </div>
        </div>
    );
}

export default Calendar
