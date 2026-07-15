import { Router } from 'express';
import { verifyJWT } from '../middleware/auth.middleware.js';
import {
    getStudentProfile,
    getStudentResults,
    onboardStudent,
    updateStudent,
    saveGrade,
    getEnrollmentOptions,
    submitEnrollment,
    checkEnrollment,
    getAllElectives
} from '../controllers/user.controller.js';

const router = Router();

// ================= APPLY BOUNCER TO ALL ROUTES =================
// Since this is an internal college portal, every single route requires a valid Firebase login!
router.use(verifyJWT);

// ================= DEFINE ROUTES =================

// Profile & Results
router.route('/student/:rollNumber').get(getStudentProfile);
router.route('/results/:rollNumber').get(getStudentResults);

// Onboarding & Updating
router.route('/onboard').post(onboardStudent);
router.route('/update-student').post(updateStudent);

// Grades
router.route('/save-grade').post(saveGrade);

// Enrollment 
router.route('/enrollment-options/:rollNumber/:semester').get(getEnrollmentOptions);
router.route('/submit-enrollment').post(submitEnrollment);
router.route('/check-enrollment/:rollNumber/:semester').get(checkEnrollment);

// Electives
router.route('/all-electives/:rollNumber').get(getAllElectives);

export default router;