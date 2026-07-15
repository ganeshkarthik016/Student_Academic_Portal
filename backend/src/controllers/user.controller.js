import connectDB from '../src/db/index.js';
import { asyncHandler } from '../src/utils/asyncHandler.js';

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

// ================= 1. GET STUDENT PROFILE =================
export const getStudentProfile = asyncHandler(async (req, res) => {
    const requestedRoll = req.params.rollNumber.toUpperCase();
    const tokenRoll = req.user.rollNumber;

    if (requestedRoll !== tokenRoll) return res.status(403).json({ message: "Forbidden" });

    const db = await connectDB();
    const query = `SELECT roll_number, first_name, last_name, current_semester, branch_code, dob, contact_number FROM students WHERE roll_number = ?`;
    const [result] = await db.query(query, [requestedRoll]);

    if (result.length === 0) return res.status(404).json({ message: "Student not found" });
    res.json(result[0]);
});

// ================= 2. GET ALL RESULTS FOR A STUDENT =================
export const getStudentResults = asyncHandler(async (req, res) => {
    const requestedRoll = req.params.rollNumber.toUpperCase();
    if (requestedRoll !== req.user.rollNumber) return res.status(403).json({ message: "Forbidden" });

    const db = await connectDB();
    const studentQuery = `SELECT * FROM students WHERE roll_number = ?`;
    const gradesQuery = `
        SELECT e.course_code as code, c.course_name as title, c.credits, e.grade, e.semester_execution 
        FROM enrollments e 
        JOIN courses c ON e.course_code = c.course_code
        JOIN students s ON e.roll_number = s.roll_number
        WHERE e.roll_number = ? AND CAST(e.semester_execution AS SIGNED) <= CAST(s.current_semester AS SIGNED)
    `;

    const [studentResult] = await db.query(studentQuery, [requestedRoll]);
    if (studentResult.length === 0) return res.status(404).json({ message: "Student not found" });

    const [gradesResult] = await db.query(gradesQuery, [requestedRoll]);

    res.json({
        student: {
            name: `${studentResult[0].first_name} ${studentResult[0].last_name}`,
            branch: studentResult[0].branch_code,
            current_semester: studentResult[0].current_semester
        },
        allCourses: gradesResult
    });
});

// ================= 3. CLEAN ONBOARDING =================
export const onboardStudent = asyncHandler(async (req, res) => {
    const { rollNumber, firstName, lastName, currentSemester } = req.body;

    // Security: You can only onboard yourself!
    if (rollNumber.toUpperCase() !== req.user.rollNumber) return res.status(403).json({ message: "Forbidden" });

    const branchCode = extractBranch(rollNumber);
    const db = await connectDB();

    const insertStudent = `
        INSERT INTO students (roll_number, first_name, last_name, branch_code, current_semester) 
        VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE first_name=?, last_name=?, branch_code=?, current_semester=?
    `;

    await db.query(insertStudent, [rollNumber, firstName, lastName, branchCode, currentSemester, firstName, lastName, branchCode, currentSemester]);
    res.json({ message: "Profile Created! Proceed to Enrollment." });
});

// ================= 4. UPDATE STUDENT DETAILS =================
export const updateStudent = asyncHandler(async (req, res) => {
    const { rollNumber, firstName, lastName, currentSemester, dob, contactNumber } = req.body;
    if (rollNumber.toUpperCase() !== req.user.rollNumber) return res.status(403).json({ message: "Forbidden" });

    const branchCode = extractBranch(rollNumber);
    const db = await connectDB();

    const query = `UPDATE students SET first_name=?, last_name=?, branch_code=?, current_semester=?, dob=?, contact_number=? WHERE roll_number=?`;
    await db.query(query, [firstName, lastName, branchCode, currentSemester, dob, contactNumber, rollNumber]);

    res.json({ message: "Profile Updated!" });
});

// ================= 5. SAVE A SINGLE GRADE =================
export const saveGrade = asyncHandler(async (req, res) => {
    const { rollNumber, courseCode, grade } = req.body;
    const db = await connectDB();

    const query = `UPDATE enrollments SET grade = ? WHERE roll_number = ? AND course_code = ?`;
    await db.query(query, [grade, rollNumber, courseCode]);

    res.json({ message: "Grade successfully updated!" });
});

// ================= 6. GET COURSES FOR ENROLLMENT PAGE =================
export const getEnrollmentOptions = asyncHandler(async (req, res) => {
    const branchCode = extractBranch(req.params.rollNumber);
    const { semester } = req.params;
    const db = await connectDB();

    const query = `
        SELECT c.course_code, c.course_name, c.credits, c.course_type 
        FROM courses c 
        JOIN course_branches cb ON c.course_code = cb.course_code 
        WHERE cb.branch_code = ? AND cb.semester_number = ? AND c.course_type = 'Core'
    `;

    const [results] = await db.query(query, [branchCode, semester]);
    res.json(results);
});

// ================= 7. SUBMIT OFFICIAL ENROLLMENT =================
export const submitEnrollment = asyncHandler(async (req, res) => {
    const { rollNumber, semester, selectedCourses } = req.body;
    if (rollNumber.toUpperCase() !== req.user.rollNumber) return res.status(403).json({ message: "Forbidden" });

    if (!selectedCourses || selectedCourses.length === 0) {
        return res.status(400).json({ message: "No courses selected" });
    }

    const db = await connectDB();
    const values = selectedCourses.map(courseCode => [rollNumber, courseCode, semester, 'Pending']);
    const bulkInsert = `INSERT IGNORE INTO enrollments (roll_number, course_code, semester_execution, grade) VALUES ?`;

    await db.query(bulkInsert, [values]);
    res.json({ message: "Successfully enrolled in courses!" });
});

// ================= 8. CHECK IF ALREADY ENROLLED =================
export const checkEnrollment = asyncHandler(async (req, res) => {
    const { rollNumber, semester } = req.params;
    const db = await connectDB();

    const query = `SELECT COUNT(*) as count FROM enrollments WHERE roll_number = ? AND semester_execution = ?`;
    const [results] = await db.query(query, [rollNumber, semester]);

    res.json({ isEnrolled: results[0].count > 0 });
});

// ================= 9. GET ALL GLOBAL ELECTIVES =================
export const getAllElectives = asyncHandler(async (req, res) => {
    const db = await connectDB();
    const query = `SELECT course_code, course_name, credits, course_type FROM courses WHERE course_type = 'Elective'`;

    const [results] = await db.query(query);
    res.json(results);
});