import fs from 'fs/promises';


async function dataJson() {
  const data = await fs.readFile('src/data.json');
  return JSON.parse(data.toString())
}

export async function getAllBooks(request, response) {
  const db = await dataJson()
  response.status(200).json({ db })
}

export async function getBooksById(request, response) {
  const id = request.params.id
  if (!id) {
    return response.status(400).send('id is required')
  }
  const db = await dataJson()

  const book = db.find((book) => book.id === id)

  if (!book) {
    return response.status(404).send('book not found')
  }

  response.status(200).json({ book })
}

export async function addBooks(request, response) {
  const id = (Math.round(Math.random() * 1000000000)).toString()
  const db = await dataJson()

  const { title, author, pages, description } = request.body

  if (!title || !author || !pages || !description ){
    return response.status(404).send('Please provide all fields')
  }

  const newBook = {
    id: id,
    title: title,
    author: author,
    pages:  pages,
    description: description,
  }

  const newDB = [...db, newBook] 

  await fs.writeFile('src/data.json', JSON.stringify(newDB, null, 2))
  
  response.status(200).send('Book was added')
}

export async function updateBooks(request, response) {
  const id = request.params.id 
  if (!id) {
    return response.status(400).send('id is required')
  }

  const db = await dataJson()

  const bookIndex = db.findIndex((book) => book.id === id)

  if (bookIndex === -1) {
    return response.status(404).send('book not found')
  }

  const book = db[bookIndex]

  const newData = request.body
  
  const updateBook = {
    id: id,
    title: newData.title || book.title,
    author: newData.author || book.author,
    pages:  newData.pages || book.pages,
    description: newData.description || book.description,
  }

  db[bookIndex] = updateBook

  await fs.writeFile('src/data.json', JSON.stringify(db, null, 2))
  
  response.status(200).send('Book was updated')
}

export async function deleteBooks(request, response) {
  const id = request.params.id;
  if (!id) {
    return response.status(400).send('id is required')
  }
  const db = await dataJson()

  const bookIndex = db.findIndex((book) => book.id === id)
  if (bookIndex === -1) {
    response.status(404).send('book not found')
  }

  const filteredDB = db.filter((book) => book.id !== id)

  await fs.writeFile('src/data.json', JSON.stringify(filteredDB, null, 2))

  response.status(200).json({ filteredDB })
}


