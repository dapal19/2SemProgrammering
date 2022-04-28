const sql = require('mssql')
const config = require('../Database/DBConfig')


const getAllUsers = async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let users = await pool.request().query('SELECT * FROM dbo.User');
        res.json(users.recordsets[0])
    } catch (err) {
        res.json(err)
    }
};
module.exports = {
    getAllUsers,
};




/*

const getUserById = async (req, res) => {
    let id = req.params.id
    try {
        let pool = await sql.connect(config);
        let users = await pool
            .request()
            .input('Id', sql.Int, id)
            .query('SELECT * FROM WHERE id = @id');
        res.json(users.recordsets[0])
    } catch {
        res.json(err)
    }

    const createUser = async (req, res) => {
        try {
            let user = { ...req.body }
            let pool = await sql.connect(config)
            //Check if email already exists in the database
            let emailExists = await pool
                .request()
                .input('Email', sql.NVarChar, user.Email)
                .query('SELECT id from dbo.user WHERE email = @email')

            if (userExists.recordsets[0].length !== 0) {
                res.status(409).json('Username already in use')
            } else if (emailExists.recordsets[0].length !== 0) {
                res.status(409).json('Email already in use')
            } else {
                //Check isFinished
                let users = await pool
                    .request()
                    .query('INSERT INTO dbo.user (user_id, name, password, status_id, følger
        VALUES(`
                    firstName = '${users.user_id}',
                    lastName = '${users.name}',
                    email = '${users.password}',
                    password = '${users.status_id}',
                    følger = '${users.følger}',
                    WHERE id = '@Id'`
                    );'
                    res.status(200).json(user);
            } catch (err){
                res.json (err)
                           



                const deleteUser = async (req, res) => {
                    let id = req.params.id;
                    try {
                        let pool = await sql.connect(config);
                        let userExist = await pool
                            .request()
                            .input("Id", sql.Int, id)
                            .query("SELECT username FROM dbo.user WHERE id = @Id");
                        if (userExist.recordsets[0].length === 0) {
                            res.status(404).json("User does not exist");
                        } else {
                            let user = await pool
                                .request()
                                .input("Id", sql.Int, id)
                                .query("DELETE FROM dbo.user WHERE id = @Id");
                            res.json("User is deleted");
                        }
                    } catch (err) {
                        res.json(err);
                    }
                };

                const updateUser = async (req, res) => {
                    try {
                        let user = { ...req.body };
                        let pool = await sql.connect(config);
                        let users = await pool
                            .request()
                            .input("Id", sql.Int, user.Id)
                            .query(`UPDATE dbo.user SET
                    firstName = '${user.firstName}',
                    lastName = '${user.lastName}',
                    email = '${user.email}',
                    password = '${user.password}',
                    updatedAt = CURRENT_TIMESTAMP
                    WHERE id = '@Id'`
                            );
                        res.json(user);
                    } catch (err) {
                        res.json(err);
                    }
                };


*/






