const Task = require("../models/TaskModel");
const asyncWrapper = require("../middleware/async");

const { createCustomError } = require("../errors/coustom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const getAlldata = await Task.find({});
  res.status(200).json({
    status: "success",
    data: { getAlldata, nbHits: getAlldata.length },
  });

  //! log way and above code  improved version
  // try {
  //   const getAlldata = await Task.find({});
  //   // res.status(200).json({ getAlldata });

  //   res.status(200).json({
  //     status: "success",
  //     data: { getAlldata, nbHits: getAlldata.length },
  //   });
  // } catch (error) {
  //   res.status(500).json({ meg: `Server error try again please${error}` });
  // }
});

const createTasks = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });

  // try {
  //   const task = await Task.create(req.body);
  //   res.status(201).json({ task });
  // } catch (error) {
  //   res.status(500).json({ meg: error });
  // }
});

const getSingleTasks = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const findTask = await Task.findOne({ _id: taskId });

  if (!findTask) {
    // const error = new Error("Not Found");
    // error.status = 404;

    return next(
      createCustomError(` No Task found with  Id : ${findTask} `, 404)
    );
    // return res
    //   .status(404)
    //   .json({ msg: ` No Task found with  Id : ${findTask} ` });
  }

  res.status(201).json({ findTask });

  // try {
  //   const { id: taskId } = req.params;
  //   const findTask = await Task.findOne({ _id: taskId });

  //   if (!findTask) {
  //     return res
  //       .status(404)
  //       .json({ msg: ` No Task found with  Id : ${findTask} ` });
  //   }

  //   res.status(201).json({ findTask });
  // } catch (error) {
  //   res.status(500).json({ msg: error });
  // }
});

const updateTasks = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const taskUpdate = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!taskUpdate) {
    return next(
      createCustomError(` No Task found with  Id : ${findTask} `, 404)
    );
    // return res
    //   .status(404)
    //   .json({ msg: ` No Task found with  Id : ${findTask}` });
  }
  res.status(201).json({ taskUpdate });

  // try {
  //   const { id: taskId } = req.params;
  //   const taskUpdate = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
  //     new: true,
  //     runValidators: true,
  //   });

  //   if (!taskUpdate) {
  //     return res
  //       .status(404)
  //       .json({ msg: ` No Task found with  Id : ${findTask}` });
  //   }
  //   res.status(201).json({ taskUpdate });
  // } catch (error) {
  //   res.status(500).json({ msg: error });
  // }
});

const deleteTasks = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const findTask = await Task.findOneAndDelete({ _id: taskId });
  if (!findTask) {
    return next(
      createCustomError(` No Task found with  Id : ${findTask} `, 404)
    );
    // return res
    //   .status(404)
    //   .json({ msg: ` No Task found with  Id : ${findTask} ` });
  }
  res.status(200).json({ findTask });

  // try {
  //   const { id: taskId } = req.params;
  //   const findTask = await Task.findOneAndDelete({ _id: taskId });
  //   if (!findTask) {
  //     return res
  //       .status(404)
  //       .json({ msg: ` No Task found with  Id : ${findTask} ` });
  //   }
  //   res.status(200).json({ findTask });
  // } catch (error) {
  //   res.status(404).json({ msg: error });
  // }
});
module.exports = {
  getAllTasks,
  deleteTasks,
  updateTasks,
  getSingleTasks,
  createTasks,
};
