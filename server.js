// server.mjs

import express from 'express';
import path from 'path';
import multer from 'multer';
import { mergePdfs } from './merge.js';
import { getCurrentDirname } from './utils.js';

const upload = multer({ dest: 'uploads/' });
const app = express();
const port = 3000;
app.use('/static',express.static('public'));

const __dirname = getCurrentDirname(import.meta.url);
// app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/templates/index.html'));
});

app.post('/merge', upload.array('pdfs', 10000), async (req, res, next) => {
    let d = await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path));
    res.redirect(`http://localhost:3000/static/${d}.pdf`);
}); 

// app.post('/merge', upload.array('pdfs', 100), async (req, res, next) => {
//     // Get an array of uploaded file paths
//     const pdfPaths = req.files.map(file => path.join(__dirname, file.path));

//     // Call the mergePdfs function with the array of file paths
//     const mergedPdfPath = await mergePdfs(pdfPaths);

//     res.redirect(`/static/${path.basename(mergedPdfPath.toString())}`);
// });

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
