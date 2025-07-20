import express from 'express'

import { connectDB, disconnectDB } from '../config/mongoDB.js'
import Library from '../model/library.model.js'

const router = express.Router()


router.delete('/:id', async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ message: 'Library ID is required' })  
  }

  try {
    await connectDB()

    const library = await Library.findByIdAndDelete(id)
    if (!library) {
      return res.status(404).json({ message: 'Library not found' })
    }

    res.status(200).json({ message: 'Library deleted successfully' })
  } catch (error) {
    console.error('Error deleting library:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

router.patch('/:id', async (req, res) => {
  const { id } = req.params
  const { title, language, isPublic, isStarred } = req.body

  if (!id) {
    return res.status(400).json({ message: 'Library ID is required' })
  }

  try {
    await connectDB()

    const updatedLibrary = await Library.findByIdAndUpdate(
      id,
      { title, language, isPublic, isStarred },
      { new: true }
    )

    if (!updatedLibrary) {
      return res.status(404).json({ message: 'Library not found' })
    }

    res.status(200).json(updatedLibrary)
  } catch (error) {
    console.error('Error updating library:', error)
    res.status(500).json({ message: 'Internal server error' })
  } finally {
    await disconnectDB()
  }
})

router.post('/', async (req, res) => {
  const { user, title, language, isPublic, isStarred } = req.body

  if (!user || !title || !language) {
    return res.status(400).json({ message: 'User, title, and language are required' })
  }

  if (typeof user !== 'object' || !user.id || !user.name) {
    return res.status(400).json({ message: 'Invalid user object' })
  }

  try {
    await connectDB()

    const existingLibrary = await Library.findOne({
      'user.id': user.id,
      title,
      language,
    })
    if (existingLibrary) {
      return res.status(400).json({ message: 'Library with this title and language already exists' })
    }



    const newLibrary = new Library({
      user: {
        id: user.id,
        name: user.name,
      },
      title,
      language: language || 'en',
      isPublic: isPublic || false,
      isStarred: isStarred || false,
    })

    await newLibrary.save()
    res.status(201).json(newLibrary)
  } catch (error) {
    console.error('Error creating library:', error)
    res.status(500).json({ message: 'Internal server error' })
  } finally {
    await disconnectDB()
  }
})

router.get('/userId/:userId', async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' })
  }
  try {
    await connectDB()
    const libraries = await Library.find({ 'user.id': userId })
      .sort({ isStarred: -1, createdAt: -1 })
      .select('-__v')
    res.status(200).json(libraries)
  } catch (error) {
    console.error('Error fetching libraries:', error)
    res.status(500).json({ message: 'Internal server error' })
  } finally {
    await disconnectDB()
  }
})






export default router