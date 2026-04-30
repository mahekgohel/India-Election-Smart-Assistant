const { getPersonalizedDashboardData } = require('../services/electionService');

const getDashboardData = (req, res) => {
    try {
        const { age, state, isFirstTimeVoter } = req.body;
        
        if (!age || !state) {
            return res.status(400).json({ error: 'Age and State are required' });
        }

        const data = getPersonalizedDashboardData({ age: parseInt(age), state, isFirstTimeVoter });
        res.json(data);
    } catch (error) {
        console.error('Error in electionController:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard data' });
    }
};

module.exports = { getDashboardData };
