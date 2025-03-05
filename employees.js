const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticateToken } = require('../middleware/auth');

// Create an employee
router.post('/', authenticateToken, (req, res) => {
    const { name, position, department, salary, email } = req.body;
    const query = 'INSERT INTO employees (name, position, department, salary, email) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [name, position, department, salary, email], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Employee created', id: result.insertId });
    });
});

// Read all employees
router.get('/', authenticateToken, (req, res) => {
    const query = 'SELECT * FROM employees';

    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Update an employee
router.put('/:id', authenticateToken, (req, res) => {
    const { name, position, department, salary, email } = req.body;
    const query = 'UPDATE employees SET name = ?, position = ?, department = ?, salary = ?, email = ? WHERE id = ?';

    db.query(query, [name, position, department, salary, email, req.params.id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Employee updated' });
    });
});

// Delete an employee
router.delete('/:id', authenticateToken, (req, res) => {
    const query = 'DELETE FROM employees WHERE id = ?';

    db.query(query, [req.params.id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Employee deleted' });
    });
});

module.exports = router;

