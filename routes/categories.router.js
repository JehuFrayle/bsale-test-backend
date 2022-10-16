const express = require('express');

const CategoryService = require('./../services/categories.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { getCategorySchema } = require('./../schemas/category.schema');

const router = express.Router();
const service = new CategoryService();

router.get('/', async (req, res, next) => {
  const { search } = req.query;
  if (search) {
    try {
      const categories = await service.findByName(search);
      res.json(categories);
    } catch (error) {
      next(error);
    }
  } else {
    try {
      const categories = await service.find();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  }
});

router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
