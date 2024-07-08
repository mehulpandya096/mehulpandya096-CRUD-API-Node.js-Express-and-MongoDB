const express = require("express");
// express router setup here
const router = express.Router();

const {
  getAllTasks,
  deleteTasks,
  updateTasks,
  getSingleTasks,
  createTasks,
} = require("../controllers/TaskControler");

router.route("/").get(getAllTasks).post(createTasks)
router.route('/:id').get(getSingleTasks).patch(updateTasks).delete(deleteTasks)


module.exports = router;
