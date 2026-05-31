import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ================= DATABASE CONNECTION =================
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});
console.log(process.env.DB_HOST);
db.connect((err) => {
    if (err) {
        console.error('❌ Error connecting to MySQL:', err);
        return;
    }
    console.log('✅ Connected to MySQL Database!');
});

// ================= HELPER FUNCTION =================
function extractBranch(rollNumber) {
    const roll = rollNumber.toUpperCase();
    if (roll.includes('BCS')) return 'CSE';
    if (roll.includes('BEC')) return 'ECE';
    if (roll.includes('BME')) return 'ME';
    if (roll.includes('BDS')) return 'DS';
    if (roll.includes('BSM')) return 'SM';
    return 'CSE'; // Fallback
}

// ================= API ROUTES =================

// 1. GET STUDENT PROFILE
// 1. GET STUDENT PROFILE (Now includes DOB & Contact)
app.get('/api/student/:rollNumber', (req, res) => {
    const query = `SELECT roll_number, first_name, last_name, current_semester, branch_code, dob, contact_number FROM students WHERE roll_number = ?`;
    db.query(query, [req.params.rollNumber], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: "Student not found" });
        res.json(result[0]); 
    });
});

// 2. GET ALL RESULTS FOR A STUDENT
app.get('/api/results/:rollNumber', (req, res) => {
    const { rollNumber } = req.params;
    const studentQuery = `SELECT * FROM students WHERE roll_number = ?`;
    
    const gradesQuery = `
        SELECT e.course_code as code, c.course_name as title, c.credits, e.grade, e.semester_execution 
        FROM enrollments e 
        JOIN courses c ON e.course_code = c.course_code
        JOIN students s ON e.roll_number = s.roll_number
        WHERE e.roll_number = ? AND CAST(e.semester_execution AS SIGNED) <= CAST(s.current_semester AS SIGNED)
    `;

    db.query(studentQuery, [rollNumber], (err, studentResult) => {
        if (err || studentResult.length === 0) return res.status(404).json({ message: "Student not found" });
        db.query(gradesQuery, [rollNumber], (err, gradesResult) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({
                student: {
                    name: `${studentResult[0].first_name} ${studentResult[0].last_name}`,
                    branch: studentResult[0].branch_code, 
                    current_semester: studentResult[0].current_semester
                },
                allCourses: gradesResult
            });
        });
    });
});

// 3. CLEAN ONBOARDING (Profile Only!)
app.post('/api/onboard', (req, res) => {
    const { rollNumber, firstName, lastName, currentSemester } = req.body;
    const branchCode = extractBranch(rollNumber); 
    
    const insertStudent = `
        INSERT INTO students (roll_number, first_name, last_name, branch_code, current_semester) 
        VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE first_name=?, last_name=?, branch_code=?, current_semester=?
    `;

    db.query(insertStudent, [rollNumber, firstName, lastName, branchCode, currentSemester, firstName, lastName, branchCode, currentSemester], (err) => {
        if (err) {
            console.error("❌ Student Insert Error:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Profile Created! Proceed to Enrollment." });
    });
});

// 4. UPDATE STUDENT DETAILS 
app.post('/api/update-student', (req, res) => {
    const { rollNumber, firstName, lastName, currentSemester, dob, contactNumber } = req.body;
    const branchCode = extractBranch(rollNumber); 
    
    // We update the row with the new DOB and Contact info
    const query = `UPDATE students SET first_name=?, last_name=?, branch_code=?, current_semester=?, dob=?, contact_number=? WHERE roll_number=?`;
    
    db.query(query, [firstName, lastName, branchCode, currentSemester, dob, contactNumber, rollNumber], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Profile Updated!" });
    });
});

// 5. SAVE A SINGLE GRADE
// 5. UPDATE A GRADE (No more duplicates!)
app.post('/api/save-grade', (req, res) => {
    const { rollNumber, courseCode, grade } = req.body;
    
    // We completely remove INSERT. We strictly UPDATE the existing row.
    const query = `UPDATE enrollments SET grade = ? WHERE roll_number = ? AND course_code = ?`;
    
    db.query(query, [grade, rollNumber, courseCode], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Grade successfully updated!" });
    });
});

// 6. GET COURSES FOR ENROLLMENT PAGE
// 6. GET CORE COURSES FOR SPECIFIC SEMESTER TAB
app.get('/api/enrollment-options/:rollNumber/:semester', (req, res) => {
    const branchCode = extractBranch(req.params.rollNumber);
    const { semester } = req.params;
    
    // We only pull 'Core' courses that match this specific branch and semester
    const query = `
        SELECT c.course_code, c.course_name, c.credits, c.course_type 
        FROM courses c 
        JOIN course_branches cb ON c.course_code = cb.course_code 
        WHERE cb.branch_code = ? AND cb.semester_number = ? AND c.course_type = 'Core'
    `;
    
    db.query(query, [branchCode, semester], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 7. SUBMIT OFFICIAL ENROLLMENT
app.post('/api/submit-enrollment', (req, res) => {
    const { rollNumber, semester, selectedCourses } = req.body;
    
    if (!selectedCourses || selectedCourses.length === 0) {
        return res.status(400).json({ message: "No courses selected" });
    }

    const values = selectedCourses.map(courseCode => {
        return [rollNumber, courseCode, semester, 'Pending'];
    });

    const bulkInsert = `INSERT IGNORE INTO enrollments (roll_number, course_code, semester_execution, grade) VALUES ?`;

    db.query(bulkInsert, [values], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Successfully enrolled in courses!" });
    });
});
// 8. CHECK IF ALREADY ENROLLED (The Lock Feature)
app.get('/api/check-enrollment/:rollNumber/:semester', (req, res) => {
    const { rollNumber, semester } = req.params;
    const query = `SELECT COUNT(*) as count FROM enrollments WHERE roll_number = ? AND semester_execution = ?`;
    
    db.query(query, [rollNumber, semester], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        // If count is greater than 0, they are already locked in for this semester!
        res.json({ isEnrolled: results[0].count > 0 });
    });
});
// 9. GET ALL GLOBAL ELECTIVES
// 9. GET ALL GLOBAL ELECTIVES (Including cross-branch Open Electives)
// 9. GET ALL GLOBAL ELECTIVES
app.get('/api/all-electives/:rollNumber', (req, res) => {
    // Because electives are global in the 'courses' table, we don't even need to join branches!
    // This instantly grabs every OE, PE, and SWAYAM course in the entire database.
    const query = `
        SELECT course_code, course_name, credits, course_type
        FROM courses
        WHERE course_type = 'Elective'
    `;
    
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Backend Server is running on http://localhost:${PORT}`);
});