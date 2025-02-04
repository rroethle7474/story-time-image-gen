import express from 'express';
import generateImage from './image.js';
import { enforceAuth } from './auth.js';
const router = express.Router();


router.post('/generate-image', enforceAuth, async (req, res) => {
  try {
    const { prompt, options } = req.body; // options -> aspect_ration, format, quality
    
    if (!prompt || prompt.trim().length === 0) {
      return res.status(400).send({error: 'Prompt is required'} );
    }
    const {image, format} = await generateImage(prompt, options);
    res.type(format);

    res.status(201).send(image);

  } catch (error) {
    res.status(500).send({error: 'Internal server error'} );
  }
});

export default router; 