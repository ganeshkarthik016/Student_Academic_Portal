import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';

const app = express();

// ================= MIDDLEWARE =================
// This stops the CORS errors between React and Express
app.use(cors());
app.use(express.json());

// ================= DATABASE CONNECTION =================
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Default XAMPP user
    password: '',      // Default XAMPP password (leave blank if not set)
    database: 'fusion_portal_clone' // <--- CHANGE THIS TO YOUR ACTUAL DB NAME!
});

db.connect((err) => {
    if (err) {
        console.error('❌ Error connecting to MySQL:', err);
        return;
    }
    console.log('✅ Connected to MySQL Database!');
});


// ================= API ROUTES =================

// 1. GET STUDENT PROFILE DATA (For the Profile Tab)
app.get('/api/student/:rollNumber', (req, res) => {
    const { rollNumber } = req.params;
    
    // Using your exact students table columns
    const query = `
        SELECT roll_number, first_name, last_name, current_semester, branch_code 
        FROM students 
        WHERE roll_number = ?
    `;

    db.query(query, [rollNumber], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Student not found" });
        }
        
        // Send back the exact row
        res.json(result[0]); 
    });
});


// 2. GET STUDENT RESULTS DYNAMICALLY (For the Marksheet)
// Notice we removed the semester from the URL so it fetches ALL grades for CPI!
app.get('/api/results/:rollNumber', (req, res) => {
    const { rollNumber } = req.params;

    const studentQuery = `SELECT * FROM students WHERE roll_number = ?`;
    
    // JOINING YOUR EXACT TABLES: enrollments -> courses
    const gradesQuery = `
        SELECT e.course_code as code, c.course_name as title, c.credits, e.grade, e.semester_execution 
        FROM enrollments e
        JOIN courses c ON e.course_code = c.course_code
        WHERE e.roll_number = ?
    `;

    db.query(studentQuery, [rollNumber], (err, studentResult) => {
        if (err) {
            console.error("Student Query Error:", err);
            return res.status(500).json({ error: err.message });
        }
        if (studentResult.length === 0) {
            return res.status(404).json({ message: "Student not found" });
        }

        db.query(gradesQuery, [rollNumber], (err, gradesResult) => {
            if (err) {
                console.error("Grades Query Error:", err);
                return res.status(500).json({ error: err.message });
            }

            // Package it perfectly for React
            res.json({
                student: {
                    name: `${studentResult[0].first_name} ${studentResult[0].last_name}`,
                    branch: studentResult[0].branch_code, 
                    current_semester: studentResult[0].current_semester
                },
                allCourses: gradesResult // Sending every grade back to React
            });
        });
    });
});
// ================= ONBOARDING & SETTINGS ROUTES =================

// 1. ONE-CLICK ONBOARDING (Create Student + Auto-fill C+ Grades)
app.post('/api/onboard', (req, res) => {
    const { rollNumber, firstName, lastName, branchCode, currentSemester } = req.body;
    
    // 1. Insert the Student
    const insertStudent = `
        INSERT INTO students (roll_number, first_name, last_name, branch_code, current_semester) 
        VALUES (?, ?, ?, ?, ?) 
        ON DUPLICATE KEY UPDATE first_name=?, last_name=?, branch_code=?, current_semester=?
    `;

    db.query(insertStudent, [rollNumber, firstName, lastName, branchCode, currentSemester, firstName, lastName, branchCode, currentSemester], (err) => {
        if (err) return res.status(500).json({ error: err.message });

        // 2. Find all courses for their branch from previous semesters
        const getCourses = `
            SELECT c.course_code, cb.semester_number 
            FROM courses c 
            JOIN course_branches cb ON c.course_code = cb.course_code 
            WHERE cb.branch_code = ? AND cb.semester_number < ?
        `;

        db.query(getCourses, [branchCode, currentSemester], (err, courses) => {
            if (err) return res.status(500).json({ error: err.message });
            
            // If they are in Sem 1, there are no past courses to grade!
            if (courses.length === 0) return res.json({ message: "Onboarding complete!" });

            // 3. Auto-fill 'C+' for every past course
            let completed = 0;
            courses.forEach(course => {
                // We use IGNORE so we don't overwrite real grades if they re-onboard
                const insertGrade = `INSERT IGNORE INTO enrollments (roll_number, course_code, semester_execution, grade) VALUES (?, ?, ?, 'C+')`;
                
                db.query(insertGrade, [rollNumber, course.course_code, course.semester_number], (err) => {
                    completed++;
                    if (completed === courses.length) res.json({ message: "Onboarding complete with default grades!" });
                });
            });
        });
    });
});

// 2. UPDATE STUDENT DETAILS (For Settings Page)
app.post('/api/update-student', (req, res) => {
    const { rollNumber, firstName, lastName, branchCode, currentSemester } = req.body;
    
    const query = `UPDATE students SET first_name=?, last_name=?, branch_code=?, current_semester=? WHERE roll_number=?`;
    
    db.query(query, [firstName, lastName, branchCode, currentSemester, rollNumber], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Student Profile Updated!" });
    });
});

// 3. SAVE A SINGLE GRADE (Already exists, just making sure you keep it!)
app.post('/api/save-grade', (req, res) => {
    const { rollNumber, courseCode, semester, grade } = req.body;
    const query = `
        INSERT INTO enrollments (roll_number, course_code, semester_execution, grade) 
        VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE grade = ?
    `;
    db.query(query, [rollNumber, courseCode, semester, grade, grade], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Grade saved!" });
    });
});
// ================= START SERVER =================
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Backend Server is running on http://localhost:${PORT}`);
});
