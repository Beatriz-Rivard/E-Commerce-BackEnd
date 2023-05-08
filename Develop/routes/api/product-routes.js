const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/categories` endpoint
// find all categories
router.get("/", async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [{ model: Category, attributes: ['id', 'category_name'], }],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one product by its `id` value
 // be sure to include its associated Products
router.get("/:id", async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id'], }],
    });
    if (!productData) {
      res.status(404).json({ message: "No product found with that ID!" });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new product
router.post("/", async (req, res) => {
  try {
    const productData = await Product.create(req.body);
    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update product by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const productData = await Product.update(req.body, {
      where: { product_id: req.params.id },
    });
    if (!productData) {
      res.status(404).json({ message: "No product found with that ID!" });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete product by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const productData = await Product.destroy(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!productData) {
      res.status(404).json({ message: "No product found with that ID!" });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;