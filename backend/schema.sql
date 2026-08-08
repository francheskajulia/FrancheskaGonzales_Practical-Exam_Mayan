CREATE TABLE task (
    task_id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(20),
    createdat TIMESTAMP,
    updated_at TIMESTAMP
);