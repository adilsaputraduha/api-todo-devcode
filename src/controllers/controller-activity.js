const config = require("../configs/database");
const mysql = require("mysql");
const pool = mysql.createPool(config);

pool.on("error", (err) => {
    console.error(err);
});

module.exports = {
    getAllActivity(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM activites;
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
    },
    getActivityById(req, res) {
        let id = req.params.id;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM activites WHERE id = ?;
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
    addActivity(req, res) {
        if (req.body.title === undefined) {
            res.send({
                status: "Bad Request",
                message: "title cannot be null",
                data: {},
            });
        } else {
            let data = {
                email: req.body.email,
                title: req.body.title,
                created_at: new Date(),
                updated_at: new Date(),
            };
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `
                    INSERT INTO activites SET ?;
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
                                email: req.body.email,
                            },
                        });
                    }
                );
                connection.release();
            });
        }
    },
    editActivity(req, res) {
        if (req.body.title === undefined) {
            res.send({
                status: "Bad Request",
                message: "title cannot be null",
                data: {},
            });
        } else {
            let id = req.params.id;
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `
                    SELECT * FROM activites WHERE id = ?;
                    `,
                    [id],
                    function (error, results) {
                        if (error) throw error;
                        if (results.length === 0) {
                            res.send({
                                status: "Not Found",
                                message:
                                    "Activity with ID " + id + " Not Found",
                                data: {},
                            });
                        } else {
                            let dataEdit = {
                                email: req.body.email,
                                title: req.body.title,
                                updated_at: new Date(),
                            };
                            connection.query(
                                `
                            UPDATE activites SET ? WHERE id = ?;
                            `,
                                [dataEdit, id],
                                function (error, resultsUpdate) {
                                    if (error) throw error;
                                    res.send({
                                        status: "Success",
                                        message: "Success",
                                        data: {
                                            id: results[0].id,
                                            email: req.body.email,
                                            title: req.body.title,
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
        }
    },
    deleteActivity(req, res) {
        let id = req.params.id;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM activites WHERE id = ?;
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
                        connection.query(
                            `
                            DELETE FROM activites WHERE id = ?;
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
