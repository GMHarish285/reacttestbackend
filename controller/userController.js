import { db } from "../dbConnection/poolConnection.js";

export const addUser = async (req, res) => {
    const { email, name, gender, age, height, weight } = req.body;

    if (!email || !name || !gender || !age || !height || !weight) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const sql = `INSERT INTO users (email, name, gender, age, height, weight) VALUES (?, ?, ?, ?, ?, ?)`;
        const [result] = await db.promise().query(sql, [email, name, gender, age, height, weight]);

        res.status(201).json({ message: "User added successfully", userId: result.insertId });
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ error: "Failed to add user." });
    }
};
