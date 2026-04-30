const electionsData = require('../data/mockElections.json');

/**
 * Checks voter eligibility based on age.
 * @param {number} age - The user's age
 * @returns {object} Eligibility status and message
 */
const checkEligibility = (age) => {
    const MINIMUM_VOTING_AGE = 18;
    if (age >= MINIMUM_VOTING_AGE) {
        return { isEligible: true, message: "You are eligible to vote!" };
    } else {
        const yearsLeft = MINIMUM_VOTING_AGE - age;
        return { isEligible: false, message: `You will be eligible to vote in ${yearsLeft} year(s).` };
    }
};

/**
 * Fetches upcoming elections for a specific state.
 * @param {string} state - The user's state
 * @returns {Array} List of elections in that state + National elections
 */
const getElectionsForState = (state) => {
    if (!state) return [];
    return electionsData.elections.filter(
        election => election.state.toLowerCase() === state.toLowerCase() || election.state.toLowerCase() === 'national'
    );
};

/**
 * Generates a personalized voting checklist based on user profile.
 * @param {object} user - User profile object { age, state, isFirstTimeVoter }
 * @param {Array} upcomingElections - The list of relevant elections
 * @returns {Array} List of step-by-step actions
 */
const generatePersonalizedChecklist = (user, upcomingElections) => {
    const checklist = [];

    if (!user.age || user.age < 18) {
        checklist.push({
            id: 'wait_eligibility',
            step: 1,
            title: "Wait for Eligibility",
            description: "You must be 18 years old to vote in India.",
            status: "pending",
            link: "https://eci.gov.in/voter/"
        });
        return checklist;
    }

    if (user.isFirstTimeVoter) {
        checklist.push({
            id: 'register_nvsp',
            step: 1,
            title: "Register on NVSP (Form 6)",
            description: "As a first-time voter, you need to apply for a new Voter ID (EPIC) using Form 6 on the National Voters' Service Portal.",
            status: "pending",
            link: "https://voters.eci.gov.in/"
        });
    }

    checklist.push({
        id: 'verify_electoral_roll',
        step: user.isFirstTimeVoter ? 2 : 1,
        title: "Verify Name in Electoral Roll",
        description: "Check if your name exists in the latest voter list for your constituency.",
        status: "pending",
        link: "https://electoralsearch.eci.gov.in/"
    });

    checklist.push({
        id: 'find_polling_booth',
        step: user.isFirstTimeVoter ? 3 : 2,
        title: "Find Polling Booth",
        description: "Locate your assigned polling station before election day.",
        status: "pending",
        link: null // Will be handled dynamically by the Google Maps component in UI
    });

    checklist.push({
        id: 'carry_valid_id',
        step: user.isFirstTimeVoter ? 4 : 3,
        title: "Carry Valid ID",
        description: "Carry your Voter ID (EPIC) or other ECI-approved valid photo ID to the polling booth.",
        status: "pending",
        link: null
    });

    // Check deadlines for missed alerts
    if (upcomingElections.length > 0) {
        // Filter out national if we have state elections, or prioritize state ones
        const stateElection = upcomingElections.find(e => e.state !== 'National') || upcomingElections[0];
        
        const currentDate = new Date();
        const registrationDeadline = new Date(stateElection.voterRegistrationDeadline);
        
        if (currentDate > registrationDeadline && user.isFirstTimeVoter) {
            checklist.push({
                id: 'missed_deadline_alert',
                step: 5,
                title: "⚠️ Missed Deadline Alert",
                description: `The voter registration deadline for the upcoming ${stateElection.electionType} in ${stateElection.state} has passed. You may not be able to vote in this election, but you should still register for future elections.`,
                status: "warning",
                link: null
            });
        }
    }

    return checklist;
};

/**
 * Main utility function to fetch personalized election dashboard data.
 * @param {object} userProfile - User details { age: number, state: string, isFirstTimeVoter: boolean }
 * @returns {object} The comprehensive personalized dashboard data
 */
const getPersonalizedDashboardData = (userProfile) => {
    const eligibility = checkEligibility(userProfile.age);
    const upcomingElections = getElectionsForState(userProfile.state);
    const checklist = generatePersonalizedChecklist(userProfile, upcomingElections);

    return {
        userProfile,
        eligibility,
        upcomingElections,
        checklist
    };
};

module.exports = {
    checkEligibility,
    getElectionsForState,
    generatePersonalizedChecklist,
    getPersonalizedDashboardData
};
