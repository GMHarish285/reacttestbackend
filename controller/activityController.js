import { db } from "../dbConnection/poolConnection.js";

export const addActivity = async (req, res) => {
    const { user_id, name, type, icon } = req.body;

    if (!user_id || !name || !type || !icon) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const userCheck = await db.promise().query("SELECT id FROM users WHERE id = ?", [user_id]);
        if (userCheck[0].length === 0) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        const sql = `INSERT INTO activities (user_id, name, type, icon) VALUES (?, ?, ?, ?)`;
        await db.promise().query(sql, [user_id, name, type, icon]);

        res.status(201).json({ message: "Activity added successfully." });
    } catch (error) {
        console.error("Error adding activity:", error);
        res.status(500).json({ error: "Failed to add activity." });
    }
};
