const db = require('../config/dbcon');

//FETCH ALL TASKS - ALL, FILTERED BY STATUS AND/OR SEARCH
const getAllTasks = async (req, res) => {
    try{
        const { status, search } = req.params;
        let query, result;

        if(status == 'All'){
            if(!search){
                query = 'SELECT * FROM task ORDER BY createdat DESC';
                result = await db.query(query);
            }else{
                query = `SELECT * FROM task WHERE title ILIKE $1 ORDER BY createdat DESC`;
                result = await db.query(query, [`%${search}%`]);
            }
        }else{
            if(!search){
                query = `SELECT * FROM task WHERE status = $1 ORDER BY createdat DESC`;
                result = await db.query(query, [status]);
            }else{
                query = `SELECT * FROM task WHERE status = $1 AND title ILIKE $2 ORDER BY createdat DESC`;
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

//ADD NEW TASK
const createTask = async (req, res) => {
    const { title, description } = req.body;
    const createdAt = new Date();
    let result;

    try{
        const query = `INSERT INTO task(title, description, createdAt) VALUES (TRIM($1), TRIM($2), TRIM($3)) RETURNING task_id`;
        result = await db.query(query, [title, description, createdAt]);
        
        const ticket_id = result.rows[0].task_id;

        const query2 = `SELECT * FROM task WHERE task_id = $1`;
        result = await db.query(query2, [ticket_id]);

        res.status(200).json({
            message: 'Task added successfully.',
            task: result.rows});

    }catch(err){
        console.error(err);
        res.status(500).json({
            error: err.message
        })
    }
}

//EDIT A TASK
const editTask = async (req, res) => {
    const { task_id } = req.params;
    const { title, description } = req.body;
    let result;

    try{
        const query = `UPDATE task SET title = TRIM($1), description = TRIM($2) WHERE task_id = $3`;
        result = await db.query(query, [title, description, task_id]);

        const query2 = `SELECT * FROM task WHERE task_id = $1`;
        result = await db.query(query2, [task_id]);

        res.status(200).json({
            message: 'Task edited successfully.',
            task: result.rows});
    }catch(err){
        console.error(err);
        res.status(500).json({
            error: err.message
        })
    }
}

//MARK A TASK AS COMPLETE OR INCOMPLETE
const markTask = async (req, res) => {
    const { task_id } = req.params;
    const { status } = req.body;
    const markedDate = new Date();
    let result;

    try{
        const query = `UPDATE task SET status = $1, updated_at = $2 WHERE task_id = $3`;
        result = await db.query(query, [status, markedDate, task_id]);

        const query2 = `SELECT * FROM task WHERE task_id = $1`;
        result = await db.query(query2, [task_id]);

        res.status(200).json({
            message: 'Task marked successfully.',
            task: result.rows});
    }catch(err){
        console.error(err);
        res.status(500).json({
            error: err.message
        })
    }
}

const deleteTask = async(req, res) => {
    const { task_id } = req.params;

    try{
        const query = `DELETE FROM task WHERE task_id = $1 RETURNING task_id`;
        const result = await db.query(query, [task_id]);

        res.status(200).json({
            message: 'Task deleted successfully.',
            task: result.rows});
    }catch(err){
        console.error(err);
        res.status(500).json({
            error: err.message
        })
    }
}

module.exports = {
    getAllTasks,
    createTask,
    editTask,
    markTask,
    deleteTask
}