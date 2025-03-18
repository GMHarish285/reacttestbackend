import { useState } from "react";
import { Trophy } from "lucide-react";
import Sidebar from "../components/SideBar";

const Leaderboard = () => {
  const [users] = useState([
    { id: 1, name: "Alice", score: 95 },
    { id: 2, name: "Bob", score: 90 },
    { id: 3, name: "Charlie", score: 85 },
    { id: 4, name: "David", score: 80 },
    { id: 55, name: "Eva", score: 75 },
    { id: 15, name: "Alice", score: 95 },
    { id: 25, name: "Bob", score: 90 },
  ]);

  return (
    <div className="flex min-h-screen bg-blue-50">
        <Sidebar/>
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-gradient-to-br from-blue-500 to-blue-700 shadow-2xl rounded-3xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-extrabold text-white">🏆 Leaderboard</h2>
          <Trophy className="text-yellow-400 w-8 h-8" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-[900px] text-white">
            <thead>
              <tr className="bg-blue-600">
                <th className="p-4 text-left font-semibold text-lg border-b border-blue-400">
                  Rank
                </th>
                <th className="p-4 text-left font-semibold text-lg border-b border-blue-400">
                  Name
                </th>
                <th className="p-4 text-left font-semibold text-lg border-b border-blue-400">
                  Score
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`${
                    index === 0
                      ? "bg-gradient-to-r from-blue-300 to-blue-500 text-white"
                      : index === 1
                      ? "bg-gradient-to-r from-blue-200 to-blue-400 text-white"
                      : index === 2
                      ? "bg-gradient-to-r from-blue-100 to-blue-300 text-white"
                      : "hover:bg-blue-700"
                  } transition-all duration-300`}
                >
                  <td className="p-4 font-medium border-b border-blue-400">
                    {index + 1}
                  </td>
                  <td className="p-4 font-medium border-b border-blue-400">
                    {user.name}
                  </td>
                  <td className="p-4 font-medium border-b border-blue-400">
                    {user.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center text-white mt-6 text-lg">
          🌟 Keep pushing — your name could be at the top! 🌟
        </p>
      </div>
    </div>
  );
};

export default Leaderboard;