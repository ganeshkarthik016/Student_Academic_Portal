import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import admin from 'firebase-admin'; // Import Firebase Admin instead of 'jsonwebtoken'

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        // Grab token from the headers (React sends this)
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Unauthorized request: No token provided" });
        }

        // Verify token using FIREBASE instead of a local secret key
        const decodedToken = await admin.auth().verifyIdToken(token);

        // Extract roll number from the verified token's email (just like we did before!)
        const tokenRollNumber = decodedToken.email.split('@')[0].toUpperCase();

        // Attach the roll number to the request so the controller can use it
        req.user = { rollNumber: tokenRollNumber };

        next(); // Let them into the club!
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired Firebase access token" });
    }
});