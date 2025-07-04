import React, { useState } from 'react';

function App() {
    const [preferences, setPreferences] = useState({
        budget: 10000,
        familyFriendly: false,
        walkability: false,
        publicTransport: false,
    });
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPreferences({
            ...preferences,
            [name]: type === 'checkbox' ? checked : parseInt(value),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/match', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(preferences),
        });
        const data = await res.json();
        setResults(data.matches);
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center p-6">
            <h1 className="text-4xl font-bold text-purple-700 mb-2">NeighborFit</h1>
            <p className="text-lg text-gray-600 mb-6">Find your ideal neighborhood effortlessly.</p>

            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md space-y-4">
                <div>
                    <label className="block text-gray-700 mb-1">Budget: (INR{preferences.budget})</label>
                    <input
                        type="range"
                        name="budget"
                        min="10000"
                        max="50000"
                        step="500"
                        value={preferences.budget}
                        onChange={handleChange}
                        className="w-full"
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            name="familyFriendly"
                            checked={preferences.familyFriendly}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        Family Friendly
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            name="walkability"
                            checked={preferences.walkability}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        Walkability
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            name="publicTransport"
                            checked={preferences.publicTransport}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        Public Transport
                    </label>
                </div>
                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                >
                    {loading ? 'Loading...' : 'Find Matches'}
                </button>
            </form>

            {results.length > 0 && (
                <div className="mt-8 w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.map((item, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow p-4">
                            <h3 className="text-xl font-semibold text-purple-700">{item.neighborhood.name} ({item.score} pts)</h3>
                            <p className="text-gray-600">{item.neighborhood.city}, {item.neighborhood.state}</p>
                            <p className="text-gray-800 mt-1">Average Rent: INR {item.neighborhood.averageRent}</p>
                            <div className="text-sm text-gray-600 mt-2 space-y-1">
                                <p>Safety Score: {item.neighborhood.safetyScore}</p>
                                <p>Walkability: {item.neighborhood.walkabilityScore}</p>
                                <p>Public Transport: {item.neighborhood.publicTransportScore}</p>
                                <p>Family Friendly: {item.neighborhood.familyFriendlyScore}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;
