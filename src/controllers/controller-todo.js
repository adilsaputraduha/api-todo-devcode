const config = require("../configs/database");
const mysql = require("mysql");
const pool = mysql.createPool(config);

pool.on("error", (err) => {
    console.error(err);
});

module.exports = {
    getAllTodo(req, res) {
        let id = req.query.activity_group_id;
        if (id === undefined) {
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `
                    SELECT * FROM tb_todo;
                    `,
                    function (error, results) {
                        if (error) throw error;
                        res.send({
                            status: "Success",
                            message: "Success",
                            data: results,
                        });
                    }
                );
                connection.release();
            });
        } else {
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `
                    SELECT * FROM tb_todo WHERE activity_group_id = ?;
                    `,
                    [id],
                    function (error, results) {
                        if (error) throw error;
                        res.send({
                            status: "Success",
                            message: "Success",
                            data: results,
                        });
                    }
                );
                connection.release();
            });
        }
    },
    getTodoById(req, res) {
        let id = req.params.id;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM tb_todo WHERE id = ?;
                `,
                [id],
                function (error, results) {
                    if (error) throw error;
                    if (results.length === 0) {
                        res.send({
                            status: "Not Found",
                            message: "Activity with ID " + id + " Not Found",
                            data: {},
                        });
                    } else {
                        res.send({
                            status: "Success",
                            message: "Success",
                            data: results[0],
                        });
                    }
                }
            );
            connection.release();
        });
    },
    addTodo(req, res) {
        if (req.body.title === undefined) {
            res.send({
                status: "Bad Request",
                message: "title cannot be null",
                data: {},
            });
        } else if (req.body.activity_group_id === undefined) {
            res.send({
                status: "Bad Request",
                message: "activity_group_id cannot be null",
                data: {},
            });
        } else {
            let data = {
                activity_group_id: req.body.activity_group_id,
                title: req.body.title,
                is_active: 1,
                priority: req.body.priority ? req.body.priority : "very-high",
                created_at: new Date(),
                updated_at: new Date(),
            };
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `
                    INSERT INTO tb_todo SET ?;
                    `,
                    [data],
                    function (error, results) {
                        if (error) throw error;
                        res.send({
                            status: "Success",
                            message: "Success",
                            data: {
                                created_at: new Date(),
                                updated_at: new Date(),
                                id: results.insertId,
                                title: req.body.title,
                                activity_group_id: req.body.activity_group_id,
                                is_active: true,
                                priority: req.body.priority
                                    ? req.body.priority
                                    : "very-high",
                            },
                        });
                    }
                );
                connection.release();
            });
        }
    },
    editTodo(req, res) {
        let id = req.params.id;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                    SELECT * FROM tb_todo WHERE id = ?;
                    `,
                [id],
                function (error, results) {
                    if (error) throw error;
                    if (results.length === 0) {
                        res.send({
                            status: "Not Found",
                            message: "Todo with ID " + id + " Not Found",
                            data: {},
                        });
                    } else {
                        let dataEdit = {};
                        if (req.body.is_active === undefined) {
                            dataEdit = {
                                title: req.body.title,
                                updated_at: new Date(),
                            };
                        } else {
                            dataEdit = {
                                is_active:
                                    req.body.is_active === true ? 1 : 0,
                                updated_at: new Date(),
                            };
                        }
                        connection.query(
                            `
                            UPDATE tb_todo SET ? WHERE id = ?;
                            `,
                            [dataEdit, id],
                            function (error, resultsUpdate) {
                                if (error) throw error;
                                let status;
                                if (req.body.is_active === true) {
                                    status = 1;
                                } else {
                                    status = 0;
                                }
                                res.send({
                                    status: "Success",
                                    message: "Success",
                                    data: {
                                        id: results[0].id,
                                        activity_group_id:
                                            results[0].activity_group_id,
                                        title: req.body.title
                                            ? req.body.title
                                            : results[0].title,
                                        is_active:
                                            req.body.is_active === undefined
                                                ? results[0].is_active
                                                : status,
                                        priority: results[0].priority,
                                        created_at: results[0].created_at,
                                        updated_at: new Date(),
                                        deleted_at: results[0].deleted_at,
                                    },
                                });
                            }
                        );
                    }
                }
            );
            connection.release();
        });
    },
    deleteTodo(req, res) {
        let id = req.params.id;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM tb_todo WHERE id = ?;
                `,
                [id],
                function (error, results) {
                    if (error) throw error;
                    if (results.length === 0) {
                        res.send({
                            status: "Not Found",
                            message: "Todo with ID " + id + " Not Found",
                            data: {},
                        });
                    } else {
                        connection.query(
                            `
                            DELETE FROM tb_todo WHERE id = ?;
                            `,
                            [id],
                            function (error, results) {
                                if (error) throw error;
                                res.send({
                                    status: "Success",
                                    message: "Success",
                                    data: {},
                                });
                            }
                        );
                    }
                }
            );
            connection.release();
        });
    },
};
