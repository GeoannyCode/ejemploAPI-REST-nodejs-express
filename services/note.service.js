const notesData = require('../data/notes.json')

class NotesData{
  constructor(){
    this.notes = [];
    this.generate();
  }

  generate(){
    notesData.forEach( (note) => this.notes.push(note) );
  }

  async create(body){
    const generateId = () => {
      const maxId = this.notes.length > 0
        ? Math.max(...this.notes.map(n => n.id))
        :0
      return maxId + 1
    }

    const note = {
      id: generateId(),
      content: body.content,
      date: new Date(),
      important: body.important || false,
    }

    this.notes.push(note)
    return(note)
  }

  async find(){

    return new Promise(( resolve , reject) => {
      setTimeout(() => {
        resolve(this.notes)
      }, 5000)
    })
  }

  async findOne(id){
    const note = this.notes.find( note => note.id === id )
    return note
  }

  async update(id, body){

    const note = {
      id: id + 1,
      content: body.content,
      date: body.date,
      important: body.important || false,
    }

    if (!this.notes[id + 1]) {
      return { mensaje: 'Recurso no encontrado' }
    }

    this.notes[id] = {...this.notes[id], ...note}

    return this.notes[id]

  }

  // async update(id,changes){
  //   const index=this.products.findIndex(item=>item.id===id);
  //   if(index===-1)
  //   {
  //     throw new Error('product not found');
  //   }
  //   const product=this.products[index];
  //   this.products[index]={...product,...changes};
  //   return this.products[index];}

  async delete(id){
    const index = this.notes.findIndex(note => note.id === id);
    this.notes.splice(index, 1)
  }

}

module.exports = NotesData
