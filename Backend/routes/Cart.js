import express from "express";
const router = express.Router();

router.post('/', (req, res) => {
    const cartData = req.body;

    console.log("🛒 Received Cart Data:", cartData);

    // Example: Save to DB or perform operations here
    // You could loop through items and store them in MongoDB, etc.

    res.status(200).json({ message: 'Cart received successfully' });
});

export default router;
