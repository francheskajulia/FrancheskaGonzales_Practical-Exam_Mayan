const db = require('../config/dbcon');

const getAllTasks = async (req, res) => {
    try{
        const { status, search } = req.params;
        let query, result;

        if(status == 'All'){
            if(!search){
                query = 'SELECT * FROM task';
                result = await db.query(query);
            }else{
                query = `SELECT * FROM task WHERE title ILIKE $1`;
                result = await db.query(query, [`%${search}%`]);
            }
        }else{
            if(!search){
                query = `SELECT * FROM task WHERE status = $1`;
                result = await db.query(query, [status]);
            }else{
                query = `SELECT * FROM task WHERE status = $1 AND title ILIKE $2`;
                result = await db.query(query, [status, `%${search}%`]);
            }
        }

        res.status(200).json(result.rows);
    }catch(err){
        console.error(err);
        res.status(500).json({
            error: err.message
        })
    }
}

const getTaskByFilter = async (req, res) => {
    try{
        const { status, search } = req.params;
        let result;

        if (!search){
            const 
            result = await db.query(query, [status]);
        }else{
            const query = `SELECT  FROM task WHERE status = $1 AND title ILIKE $2`;
            result = await db.query(query, [status, `%${search}%`]);
        }

        res.status(200).json(result.rows);
        
    }catch(err){
        console.error(err);
        res.status(500).json({
            error: err.message
        })
    }
}

const createTask = async (req, res) => {
    const { title, description } = req.body;
    const createdAt = new Date();
    let result;

    try{
        const query = `INSERT INTO task(title, description, createdAt) VALUES ($1, $2, $3) RETURNING task_id`;
        result = await db.query(query, [title, description, createdAt]);
        
        const ticket_id = result.rows[0].task_id;

        const query2 = `SELECT * FROM task WHERE task_id = $1`;
        result = await db.query(query2, [ticket_id]);

        res.status(200).json(result.rows);

    }catch(err){
        console.error(err);
        res.status(500).json({
            error: err.message
        })
    }
}

const editTask = async (req, res) => {
    const { task_id } = req.params;
    const { title, description } = req.body;
    let result;

    try{
        const query = `UPDATE task SET title = $1, description = $2 WHERE task_id = $3`;
        result = await db.query(query, [title, description, task_id]);

        const query2 = `SELECT * FROM task WHERE task_id = $1`;
        result = await db.query(query2, [task_id]);

        res.status(200).json(result.rows);
    }catch(err){
        console.error(err);
        res.status(500).json({
            error: err.message
        })
    }
}

const markTask = async (req, res) => {
    const { task_id } = req.params;
    const { status } = req.body;
    let result;

    try{
        const query = `UPDATE task SET status = $1 WHERE task_id = $2`;
        result = await db.query(query, [status, task_id]);

        const query2 = `SELECT * FROM task WHERE task_id = $1`;
        result = await db.query(query2, [task_id]);

        res.status(200).json(result.rows);
    }catch(err){
        console.error(err);
        res.status(500).json({
            error: err.message
        })
    }
}

module.exports = {
    getAllTasks,
    getTaskByFilter,
    createTask,
    editTask,
    markTask
}