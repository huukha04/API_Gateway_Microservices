import express from 'express'

import { connectDB, disconnectDB } from '../config/mongoDB.js'
import Word from '../model/word.model.js'

const router = express.Router()
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    await connectDB()

    const deletedWord = await Word.findOneAndDelete({ _id: id})
    if (!deletedWord) {
      return res.status(404).json({ message: 'Word not found or does not belong to the specified library' })
    }
    res.status(200).json({ message: 'Word deleted successfully' })
  } catch (error) {
    console.error('Error deleting word:', error)
    res.status(500).json({ message: 'Internal server error' })
  } finally {
    await disconnectDB()
  }
})
router.patch('/:id', async (req, res) => {
  const { id } = req.params
  console.log('Received request to update word with ID:', id)
  const { libraryId, word, types, pronunciation } = req.body
  if (!libraryId || !word || !types || types.length === 0) {
    return res.status(400).json({ message: 'Library ID, word, and types are required' })
  }
  try {
    await connectDB()

    const updatedWord = await Word.findOneAndUpdate(
      { _id: id, libraryId: libraryId },
      { word, types, pronunciation: pronunciation || '' },
      { new: true, runValidators: true }
    )
    if (!updatedWord) {
      return res.status(404).json({ message: 'Word not found or does not belong to the specified library' })
    }
    res.status(200).json(updatedWord)
  } catch (error) {
    console.error('Error updating word:', error)
    res.status(500).json({ message: 'Internal server error' })
  } finally {
    await disconnectDB()
  }
})

router.post('/', async (req, res) => {
  console.log('Received request to insert word:', req.body)
  const { libraryId, word, types, pronunciation } = req.body
  if ( !libraryId, !word || !types || types.length === 0) {
    return res.status(400).json({ message: 'Library ID, word, and types are required' })
  }

  try {
    await connectDB()

    const existingWord = await Word.findOne({
      libraryId: libraryId,
      word: word,
    })
    if (existingWord) {
      return res.status(400).json({ message: 'Word already exists in the library' })
    }

    const newWord = new Word({
      libraryId: libraryId,
      word,
      types,
      pronunciation: pronunciation || '',
    })

    await newWord.save()
    res.status(201).json(newWord)
  } catch (error) {
    console.error('Error creating word:', error)
    res.status(500).json({ message: 'Internal server error' })
  } finally {
    await disconnectDB()
  }
})

router.get('/libraryId/:libraryId', async (req, res) => {
  const { libraryId } = req.params
  console.log('Received request to get words for library:', libraryId)  
  if (!libraryId) {
    return res.status(400).json({ message: 'Library ID is required' })
  }

  try {
    await connectDB()

    const words = await Word.find({ libraryId: libraryId })
    if (words.length === 0) {
      return res.status(404).json({ message: 'No words found for this library' })
    }
    res.status(200).json(words)
  } catch (error) {
    console.error('Error fetching library:', error)
    res.status(500).json({ message: 'Internal server error' })
  } finally {
    await disconnectDB()
  }
})



export default router