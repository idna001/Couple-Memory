import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Game History Component
 * Appears at the bottom of the page and acts as a collapsible container.
 * It displays previously completed games, tracking the scores (moves) and time.
 * The UI is designed to be sleek, unobtrusive, and match the selected light/dark theme perfectly.
 */
const History = ({ historyData }) => {
  const [isOpen, setIsOpen] = useState(false);

  // If there's no history to show, we completely hide the component.
  if (!historyData || historyData.length === 0) return null;

  /**
   * Formats the ISO timestamp into a clean, human-readable date.
   * e.g., 'Oct 25, 10:30 PM'
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  /**
   * Returns a specific rank text and tailwind color classes based on the player's performance.
   * Gives a nice visual progression indicator without being overbearing.
   */
  const getRank = (moves) => {
    if (moves <= 15) return { text: 'Legendary', color: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20' };
    if (moves <= 25) return { text: 'Master', color: 'text-purple-500 bg-purple-500/10 border-purple-500/20' };
    if (moves <= 35) return { text: 'Expert', color: 'text-blue-500 bg-blue-500/10 border-blue-500/20' };
    return { text: 'Completed', color: 'text-green-500 bg-green-500/10 border-green-500/20' };
  };

  return (
    <div className="w-full max-w-[800px] mx-auto mt-16 mb-20 px-4">
      <div className="flex flex-col items-center">
        {/* Toggle Button for history */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 px-8 py-3 rounded-full bg-background text-text border-2 border-current hover:opacity-75 transition-all duration-300 relative group"
          aria-expanded={isOpen}
          aria-controls="history-details"
        >
          <span className="font-bold text-lg select-none uppercase tracking-wider">Game History</span>

          {/* Animated chevron icon indicating collapse/expand */}
          <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
            <svg className="w-5 h-5 opacity-70 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Badge indicating the number of saved games */}
          <div className="absolute -top-2 -right-2 bg-text text-background text-xs font-black px-2.5 py-1 rounded-full z-10 border-2 border-background">
            {historyData.length}
          </div>
        </button>

        {/* Collapsible Details Container */}
        <div
          id="history-details"
          className={`w-full overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1500px] opacity-100 mt-8' : 'max-h-0 opacity-0'
            }`}
        >
          {/* Outer card wrapper */}
          <div className="border border-text/20 rounded-[24px] p-6 bg-background shadow-sm overflow-x-auto relative">

            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b-2 border-text/10">
                  <th className="py-4 px-4 font-bold text-xs uppercase tracking-widest opacity-60">Date</th>
                  <th className="py-4 px-4 font-bold text-xs uppercase tracking-widest opacity-60 text-center">Score (Moves)</th>
                  <th className="py-4 px-4 font-bold text-xs uppercase tracking-widest opacity-60 text-center">Time</th>
                  <th className="py-4 px-4 font-bold text-xs uppercase tracking-widest opacity-60 text-right">Rank</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-text/10">
                {historyData.map((game, index) => {
                  const rank = getRank(game.moves);
                  return (
                    <tr key={game.id || index} className="hover:bg-text/5 transition-colors duration-200">

                      {/* Date details */}
                      <td className="py-4 px-4">
                        <span className="text-sm font-semibold opacity-90">
                          {formatDate(game.timestamp)}
                        </span>
                      </td>

                      {/* Score / Moves value */}
                      <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center justify-center min-w-[2.5rem] px-3 py-1 bg-text/5 font-bold rounded-lg border border-text/10">
                          {game.moves}
                        </span>
                      </td>

                      {/* Time taken to complete the run */}
                      <td className="py-4 px-4 text-center">
                        <span className="text-sm font-mono font-medium opacity-80">
                          {game.time}s
                        </span>
                      </td>

                      {/* Calculated Player Rank */}
                      <td className="py-4 px-4 text-right">
                        <span className={`inline-block px-3 py-1 rounded-md border text-xs font-bold uppercase tracking-wider ${rank.color}`}>
                          {rank.text}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  );
};

History.propTypes = {
  historyData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      moves: PropTypes.number.isRequired,
      time: PropTypes.number.isRequired,
      timestamp: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default History;
