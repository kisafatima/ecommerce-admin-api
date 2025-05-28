const express = require("express");
const router = express.Router();
const Sale = require("../models/Sale");

// Helper to get week number
function getWeekNumber(date) {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + startOfYear.getDay() + 1) / 7);
}

// GET /api/revenue/daily
router.get("/daily", async (req, res) => {
  try {
    const now = new Date();
    const yearParam = req.query.year ? parseInt(req.query.year, 10) : now.getFullYear();
    const monthParam = req.query.month ? parseInt(req.query.month, 10) : now.getMonth() + 1;
    const dayParam = req.query.day ? parseInt(req.query.day, 10) : now.getDate();

    if (
      isNaN(yearParam) || yearParam < 1970 || yearParam > 3000 ||
      isNaN(monthParam) || monthParam < 1 || monthParam > 12 ||
      isNaN(dayParam) || dayParam < 1 || dayParam > 31
    ) {
      return res.status(400).json({ error: "Invalid date parameter(s)" });
    }

    const revenueForDay = await Sale.aggregate([
      { $unwind: "$sale" },
      {
        $project: {
          year: { $year: "$sale.saleDate" },
          month: { $month: "$sale.saleDate" },
          day: { $dayOfMonth: "$sale.saleDate" },
          totalAmount: "$sale.totalAmount",
          quantity: "$sale.quantity"
        }
      },
      { $match: { year: yearParam, month: monthParam, day: dayParam } },
      {
        $group: {
          _id: { year: "$year", month: "$month", day: "$day" },
          dailyRevenue: { $sum: "$totalAmount" },
          totalQuantity: { $sum: "$quantity" }
        }
      }
    ]);

    if (revenueForDay.length === 0) {
      return res.status(404).json({ message: `No revenue data found for ${yearParam}-${monthParam}-${dayParam}` });
    }

    res.status(200).json(revenueForDay[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/revenue/weekly
router.get("/weekly", async (req, res) => {
  try {
    const now = new Date();
    const yearParam = req.query.year ? parseInt(req.query.year, 10) : now.getFullYear();
    const weekParam = req.query.week ? parseInt(req.query.week, 10) : getWeekNumber(now);

    if (
      isNaN(yearParam) || yearParam < 1970 || yearParam > 3000 ||
      isNaN(weekParam) || weekParam < 1 || weekParam > 53
    ) {
      return res.status(400).json({ error: "Invalid year or week parameter" });
    }

    const revenueForWeek = await Sale.aggregate([
      { $unwind: "$sale" },
      {
        $project: {
          year: { $year: "$sale.saleDate" },
          week: { $week: "$sale.saleDate" },
          totalAmount: "$sale.totalAmount",
          quantity: "$sale.quantity"
        }
      },
      { $match: { year: yearParam, week: weekParam } },
      {
        $group: {
          _id: { year: "$year", week: "$week" },
          weeklyRevenue: { $sum: "$totalAmount" },
          totalQuantity: { $sum: "$quantity" }
        }
      }
    ]);

    if (revenueForWeek.length === 0) {
      return res.status(404).json({ message: `No revenue data found for year ${yearParam} week ${weekParam}` });
    }

    res.status(200).json(revenueForWeek[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/revenue/monthly
router.get("/monthly", async (req, res) => {
  try {
    const now = new Date();
    const yearParam = req.query.year ? parseInt(req.query.year, 10) : now.getFullYear();
    const monthParam = req.query.month ? parseInt(req.query.month, 10) : now.getMonth() + 1;

    if (
      isNaN(yearParam) || yearParam < 1970 || yearParam > 3000 ||
      isNaN(monthParam) || monthParam < 1 || monthParam > 12
    ) {
      return res.status(400).json({ error: "Invalid year or month parameter" });
    }

    const revenueForMonth = await Sale.aggregate([
      { $unwind: "$sale" },
      {
        $project: {
          year: { $year: "$sale.saleDate" },
          month: { $month: "$sale.saleDate" },
          totalAmount: "$sale.totalAmount",
          quantity: "$sale.quantity"
        }
      },
      { $match: { year: yearParam, month: monthParam } },
      {
        $group: {
          _id: { year: "$year", month: "$month" },
          monthlyRevenue: { $sum: "$totalAmount" },
          totalQuantity: { $sum: "$quantity" }
        }
      }
    ]);

    if (revenueForMonth.length === 0) {
      return res.status(404).json({ message: `No revenue data found for ${yearParam}-${monthParam}` });
    }

    res.status(200).json(revenueForMonth[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/revenue/annual
router.get("/annual", async (req, res) => {
  try {
    const now = new Date();
    const yearParam = req.query.year ? parseInt(req.query.year, 10) : now.getFullYear();

    if (isNaN(yearParam) || yearParam < 1970 || yearParam > 3000) {
      return res.status(400).json({ error: "Invalid year parameter" });
    }

    const revenueForYear = await Sale.aggregate([
      { $unwind: "$sale" },
      {
        $project: {
          year: { $year: "$sale.saleDate" },
          totalAmount: "$sale.totalAmount",
          quantity: "$sale.quantity"
        }
      },
      { $match: { year: yearParam } },
      {
        $group: {
          _id: "$year",
          annualRevenue: { $sum: "$totalAmount" },
          totalQuantity: { $sum: "$quantity" }
        }
      }
    ]);

    if (revenueForYear.length === 0) {
      return res.status(404).json({ message: `No revenue data found for year ${yearParam}` });
    }

    res.status(200).json(revenueForYear[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Get revenue by products
router.get('/by-product', async (req, res) => {
  try {
    const productRevenue = await Sale.aggregate([
      {
        $addFields: {
          productObjId: { $toObjectId: "$productId" }  // convert string to ObjectId
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: 'productObjId',
          foreignField: '_id',
          as: 'product',
        }
      },
      { $unwind: '$product' },
      { $unwind: '$sale' },
      {
        $group: {
          _id: '$productObjId',
          productName: { $first: '$product.title' },
          totalQuantity: { $sum: '$sale.quantity' },
          totalRevenue: { $sum: '$sale.totalAmount' },
        }
      },
      {
        $project: {
          productId: '$_id',
          productName: 1,
          totalQuantity: 1,
          totalRevenue: 1,
          _id: 0,
        }
      }
    ]);

    res.status(200).json(productRevenue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


//Get revenue by category
router.get('/by-category', async (req, res) => {
  try {
    const categoryRevenue = await Sale.aggregate([
      {
        $addFields: {
          productObjId: { $toObjectId: "$productId" }  // convert string to ObjectId
        }
    }
        ,{
        $lookup: {
          from: 'products',
          localField: 'productObjId',
          foreignField: '_id',
          as: 'product',
        },
      },
      { $unwind: '$product' },
      { $unwind: '$sale' },
      {
        $group: {
          _id: '$product.category',
          totalQuantity: { $sum: '$sale.quantity' },
          totalRevenue: { $sum: '$sale.totalAmount' },
        },
      },
      {
        $project: {
          category: '$_id',
          totalQuantity: 1,
          totalRevenue: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(categoryRevenue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
