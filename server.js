// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/files', async (req, res) => {
  const files = await prisma.file.findMany();
  res.json(files);
});

app.post('/files', async (req, res) => {
  const { name, size } = req.body;
  const file = await prisma.file.create({
    data: {
      name,
      size
    }
  });
  res.json(file);
});

app.put('/files/:id', async (req, res) => {
    const { id } = req.params;
    const { name, size } = req.body;
  
    // Convert size to an integer
    const newSize = parseInt(size);
  
    try {
      const updatedFile = await prisma.file.update({
        where: {
          id: parseInt(id)
        },
        data: {
          name,
          size: newSize 
        }
      });
      res.json(updatedFile);
    } catch (error) {
      console.error("Error updating file:", error);
      res.status(500).json({ error: "An error occurred while updating the file." });
    }
  });
  

app.delete('/files/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.file.delete({
    where: {
      id: parseInt(id)
    }
  });
  res.json({ message: 'File deleted successfully' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
