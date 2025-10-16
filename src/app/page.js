'use client'; // 👈 สำคัญ: บอกให้ Next.js ทราบว่าเป็น Client Component

import { useState } from 'react';
import styles from "./page.module.css"; // สมมติว่าไฟล์ CSS เดิมยังมีอยู่

export default function Home() {
  // 1. สร้าง State สำหรับจัดการรายการ To-do
  const [todos, setTodos] = useState([]);

  // 2. สร้าง State สำหรับจัดการข้อความที่ผู้ใช้กรอกในช่อง Input
  const [inputValue, setInputValue] = useState('');

  // 3. ฟังก์ชันสำหรับเพิ่ม To-do ใหม่
  const addTodo = () => {
    if (inputValue.trim() === '') return; // ป้องกันการเพิ่มช่องว่าง

    const newTodo = {
      id: Date.now(), // ใช้เวลาปัจจุบันเป็น ID เฉพาะ
      text: inputValue,
      isCompleted: false, // สถานะเริ่มต้นคือ ยังไม่เสร็จ
    };

    setTodos([...todos, newTodo]); // เพิ่ม To-do ใหม่เข้าในรายการ
    setInputValue(''); // ล้างช่อง Input
  };

  // 4. ฟังก์ชันสำหรับสลับสถานะ (Completed/Uncompleted)
  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>รายการสิ่งที่ต้องทำ (Todo List)</h1>
        
        {/* === ส่วนควบคุม: ช่องกรอกและปุ่มเพิ่ม (Requirement 1 & 2) === */}
        <div className={styles.inputArea}>
          {/* ช่องสำหรับกรอกข้อความ (Requirement 1) */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addTodo();
              }
            }}
            placeholder="เพิ่มรายการใหม่..."
            className={styles.todoInput}
          />

          {/* ปุ่ม Add เข้า List (Requirement 2) */}
          <button onClick={addTodo} className={styles.addButton}>
            เพิ่ม
          </button>
        </div>

        {/* === ส่วนแสดงรายการ To-do (Requirement 3) === */}
        <ul className={styles.todoList}>
          {todos.map(todo => (
            <li key={todo.id} className={styles.todoItem}>
              {/* Checkbox (Requirement 3) */}
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => toggleTodo(todo.id)}
                className={styles.todoCheckbox}
              />

              {/* ข้อความ To-do พร้อมขีดฆ่าหากเสร็จแล้ว */}
              <span
                style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}
                className={styles.todoText}
              >
                {todo.text}
              </span>
            </li>
          ))}
        </ul>

      </main>
      
      {/* สามารถลบส่วน footer หรือโค้ด Next.js template เดิมออกได้ */}
      {/* ... โค้ด footer หรือส่วนอื่นๆ ที่คุณไม่ต้องการ ... */}
      
    </div>
  );
}