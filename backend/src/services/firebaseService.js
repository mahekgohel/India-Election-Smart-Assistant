const admin = require('firebase-admin');

/**
 * Note: Firebase Admin initialization should be handled in a separate config file
 * e.g. backend/src/config/firebaseConfig.js
 * For now, assuming `admin` is initialized before these functions are called.
 */

// We'll wrap DB access in a getter to ensure it works once initialized
const getDb = () => admin.firestore();

/**
 * Save user profile to Firestore
 * @param {string} uid - Firebase Auth User ID
 * @param {object} profileData - Profile data (age, state, isFirstTimeVoter)
 */
const saveUserProfile = async (uid, profileData) => {
    try {
        const db = getDb();
        await db.collection('users').doc(uid).set(profileData, { merge: true });
        return { success: true, message: 'Profile saved successfully' };
    } catch (error) {
        console.error("Error saving user profile: ", error);
        throw new Error('Failed to save profile');
    }
};

/**
 * Fetch user profile from Firestore
 * @param {string} uid - Firebase Auth User ID
 */
const getUserProfile = async (uid) => {
    try {
        const db = getDb();
        const doc = await db.collection('users').doc(uid).get();
        if (!doc.exists) {
            return null;
        }
        return doc.data();
    } catch (error) {
        console.error("Error fetching user profile: ", error);
        throw new Error('Failed to fetch profile');
    }
};

/**
 * Update checklist progress for a user
 * @param {string} uid - Firebase Auth User ID
 * @param {string} stepId - The ID of the checklist step (e.g. 'register_nvsp')
 * @param {string} status - 'pending' or 'completed'
 */
const updateChecklistProgress = async (uid, stepId, status) => {
    try {
        const db = getDb();
        await db.collection('users').doc(uid).set({
            checklistProgress: {
                [stepId]: status
            }
        }, { merge: true });
        return { success: true, message: 'Progress updated' };
    } catch (error) {
        console.error("Error updating progress: ", error);
        throw new Error('Failed to update progress');
    }
};

module.exports = {
    saveUserProfile,
    getUserProfile,
    updateChecklistProgress
};
