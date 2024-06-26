const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categories = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categories) {
      res
        .status(404)
        .json({ message: `No category found with id ${req.params.id}!` });
      return;
    }
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      category_name: req.body.name,
    });
    res.status(200).json(newCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(
      {
        category_name: req.body.name,
      },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
      }
    );
    if (updatedCategory[0]) {
      res.status(200).json({
        message: "Updated Category name",
        updated: updatedCategory[1],
      });
    } else {
      res.status(404).json({
        message: "No Category found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ deleted: deletedCategory });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
