const Neighborhood = require('../models/neighborhoodModel');

exports.getMatches = async (req, res) => {
    const { budget, familyFriendly, walkability, publicTransport } = req.body;

    try {
        const neighborhoods = await Neighborhood.find({});

        // Calculate a score for each neighborhood
        const scoredNeighborhoods = neighborhoods.map((n) => {
            let score = 0;

            if (budget) {
                // Lower rent closer to budget increases score
                const budgetDiff = Math.abs(n.averageRent - budget);
                score += Math.max(0, 50 - budgetDiff / 20); // adjust scaling as needed
            }
            if (familyFriendly) {
                score += n.familyFriendlyScore * 0.2; // weight 20%
            }
            if (walkability) {
                score += n.walkabilityScore * 0.2;
            }
            if (publicTransport) {
                score += n.publicTransportScore * 0.2;
            }
            score += n.safetyScore * 0.2; // always consider safety

            return { neighborhood: n, score: Math.round(score) };
        });

        // Sort by score descending
        scoredNeighborhoods.sort((a, b) => b.score - a.score);

        res.json({
            success: true,
            matches: scoredNeighborhoods.slice(0, 5), // top 5 matches
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
