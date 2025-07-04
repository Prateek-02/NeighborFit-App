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
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col items-center p-6">
            {/* Header Section */}
            <div className="text-center mb-8">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 leading-tight pb-2">
                    NeighborFit
                </h1>
                <p className="text-xl text-gray-600 font-medium">Find your ideal neighborhood effortlessly.</p>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-3 rounded-full"></div>
            </div>

            {/* Form Section */}
            <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full max-w-lg border border-white/20">
                <div className="space-y-6">
                    {/* Budget Section */}
                    <div className="space-y-3">
                        <label className="block text-gray-700 font-semibold text-lg">
                            Budget: <span className="text-purple-600 font-bold">INR {preferences.budget.toLocaleString()}</span>
                        </label>
                        <div className="relative">
                            <input
                                type="range"
                                name="budget"
                                min="10000"
                                max="50000"
                                step="500"
                                value={preferences.budget}
                                onChange={handleChange}
                                className="w-full h-3 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg appearance-none cursor-pointer slider"
                            />
                            <div className="flex justify-between text-sm text-gray-500 mt-1">
                                <span>₹10K</span>
                                <span>₹50K</span>
                            </div>
                        </div>
                    </div>

                    {/* Preferences Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Preferences</h3>
                        <div className="space-y-3">
                            <label className="flex items-center p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 hover:shadow-md transition-all duration-200 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="familyFriendly"
                                    checked={preferences.familyFriendly}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-blue-600 bg-white border-2 border-blue-300 rounded focus:ring-blue-500 focus:ring-2 mr-3"
                                />
                                <span className="text-gray-700 font-medium">Family Friendly</span>
                            </label>
                            <label className="flex items-center p-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 hover:shadow-md transition-all duration-200 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="walkability"
                                    checked={preferences.walkability}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-green-600 bg-white border-2 border-green-300 rounded focus:ring-green-500 focus:ring-2 mr-3"
                                />
                                <span className="text-gray-700 font-medium">Walkability</span>
                            </label>
                            <label className="flex items-center p-3 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100 hover:shadow-md transition-all duration-200 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="publicTransport"
                                    checked={preferences.publicTransport}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-orange-600 bg-white border-2 border-orange-300 rounded focus:ring-orange-500 focus:ring-2 mr-3"
                                />
                                <span className="text-gray-700 font-medium">Public Transport</span>
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Searching...
                            </div>
                        ) : (
                            '🔍 Find Perfect Matches'
                        )}
                    </button>
                </div>
            </div>

            {/* Results Section */}
            {results.length > 0 && (
                <div className="mt-12 w-full max-w-6xl">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Perfect Matches Found</h2>
                        <p className="text-gray-600">Here are the neighborhoods that match your preferences</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {results.map((item, idx) => (
                            <div key={idx} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">{item.neighborhood.name}</h3>
                                        <p className="text-gray-600 font-medium">{item.neighborhood.city}, {item.neighborhood.state}</p>
                                    </div>
                                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                        {item.score} pts
                                    </div>
                                </div>
                                
                                <div className="mb-4">
                                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-3 border border-green-200">
                                        <p className="text-gray-800 font-semibold">Average Rent: <span className="text-green-600">INR {item.neighborhood.averageRent.toLocaleString()}</span></p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="grid grid-cols-12 gap-2 items-center">
                                        <span className="text-sm text-gray-600 col-span-4">Safety Score</span>
                                        <div className="col-span-6">
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-blue-500 h-2 rounded-full" style={{width: `${(item.neighborhood.safetyScore / 100) * 100}%`}}></div>
                                            </div>
                                        </div>
                                        <span className="text-sm font-semibold text-gray-700 col-span-2 text-right">{item.neighborhood.safetyScore}</span>
                                    </div>
                                    <div className="grid grid-cols-12 gap-2 items-center">
                                        <span className="text-sm text-gray-600 col-span-4">Walkability</span>
                                        <div className="col-span-6">
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-green-500 h-2 rounded-full" style={{width: `${(item.neighborhood.walkabilityScore / 100) * 100}%`}}></div>
                                            </div>
                                        </div>
                                        <span className="text-sm font-semibold text-gray-700 col-span-2 text-right">{item.neighborhood.walkabilityScore}</span>
                                    </div>
                                    <div className="grid grid-cols-12 gap-2 items-center">
                                        <span className="text-sm text-gray-600 col-span-4">Transport</span>
                                        <div className="col-span-6">
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-orange-500 h-2 rounded-full" style={{width: `${(item.neighborhood.publicTransportScore / 100) * 100}%`}}></div>
                                            </div>
                                        </div>
                                        <span className="text-sm font-semibold text-gray-700 col-span-2 text-right">{item.neighborhood.publicTransportScore}</span>
                                    </div>
                                    <div className="grid grid-cols-12 gap-2 items-center">
                                        <span className="text-sm text-gray-600 col-span-4">Family</span>
                                        <div className="col-span-6">
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-purple-500 h-2 rounded-full" style={{width: `${(item.neighborhood.familyFriendlyScore / 100) * 100}%`}}></div>
                                            </div>
                                        </div>
                                        <span className="text-sm font-semibold text-gray-700 col-span-2 text-right">{item.neighborhood.familyFriendlyScore}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;