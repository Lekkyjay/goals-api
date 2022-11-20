import asyncHandler from 'express-async-handler'
import Goal from '../models/Goal'

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async(req, res) => {
  const goals = await Goal.find()
  
  res.status(200).json(goals)
})


// @desc    Set goals
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async(req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user._id,
  })

  res.status(200).json(goal)
})


// @desc    Update goals
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async(req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

   // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // console.log(goal.user)    //new ObjectId("63790bd175bddd12f266a4a6")
  // console.log(req.user._id) //new ObjectId("63790bd175bddd12f266a4a6")
  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user._id?.toString()) {
    res.status(401)
    throw new Error('User not authorized')
  }  

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })

  res.status(200).json(updatedGoal)
})


// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async(req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

   // Check for user
   if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user._id?.toString()) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await goal.remove()
  res.status(200).json({ id: req.params.id })
})

export  { getGoals, setGoal, updateGoal, deleteGoal }