const express  = require('express')
const NoteService = require('../../services/note.service')

const router = express.Router()
const service = new NoteService();

// **Obtener todas las notas **//
router.get('/', async (req, res) => {
  const notes = await service.find();
  res.json(notes)
})

// **Buscar una nota por id **//
router.get('/:id', async (req, res, next) => {

  try {
    const id = Number(req.params.id)
    const note = await service.findOne(id)

    if (note){
      res.json(note)
    }
    else{
      res.send("<h1>404</h1>").status(404).end
      console.log("404")
    }

  } catch (error) {
    next(error)
  }

})

//** Crear una nueva nota **//
router.post('/', async (req, res) => {
  const body = req.body

  if (!body.content){
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const note = await service.create(body)
  res.json(note)

})

//** Eliminar una nota por su id **//
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const notes = await service.find();

  try{
    if (notes.some(note => note.id === id)){
      await service.delete(id)
      res.status(200).json({ mensaje: 'Recurso actualizado con éxito' })
    } else {
      res.status(400).json({
        error: 'id missing'
      })
    }
  } catch(error){
    res.status(400).json({
      error: 'id missing'
    })
  }
})

//** Actualizar notas por su id **//
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id) -1
  const body = req.body
  updatedNote = await service.update(id, body)
  return res.status(200).json(updatedNote);

})

module.exports = router;
