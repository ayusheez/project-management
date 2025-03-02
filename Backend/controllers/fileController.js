const File = require('../models/File');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|xls|xlsx|zip/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error('Invalid file type!'));
    }
});

const fileController = {
    uploadFile: async (req, res) => {
        try {
            const file = new File({
                filename: req.file.filename,
                originalName: req.file.originalname,
                path: req.file.path,
                mimetype: req.file.mimetype,
                size: req.file.size,
                uploadedBy: req.user._id,
                project: req.body.projectId,
                task: req.body.taskId
            });

            await file.save();
            res.status(201).json(file);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getFile: async (req, res) => {
        try {
            const file = await File.findById(req.params.id);
            if (!file) {
                return res.status(404).json({ error: 'File not found' });
            }
            res.download(file.path, file.originalName);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteFile: async (req, res) => {
        try {
            const file = await File.findById(req.params.id);
            if (!file) {
                return res.status(404).json({ error: 'File not found' });
            }

            fs.unlink(file.path, async (err) => {
                if (err) throw err;
                await File.findByIdAndDelete(req.params.id);
                res.json({ message: 'File deleted successfully' });
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = { fileController, upload };