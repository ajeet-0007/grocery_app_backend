require('dotenv').config
const bcrypt = require('bcrypt')
const db = require('../../config/index')
const jwt = require('jsonwebtoken')

exports.agentSignUp = async (req, res, next) => {
    try {
        const {
            agent_name,
            agent_email,
            agent_phone_number,
            agent_password,
        } = req.body
        const agent_hashed_password = await bcrypt.hash(agent_password, 10)
        const agent_id = Math.ceil(Math.random() * 100)
        const data = await db.sequelize.query(
            'EXEC InsertAgent :agent_id, :agent_name, :agent_email, :agent_phone_number, :agent_password',
            {
                replacements: {
                    agent_id: agent_id,
                    agent_name: agent_name,
                    agent_email: agent_email,
                    agent_phone_number: agent_phone_number,
                    agent_password: agent_hashed_password,
                },
            }
        )
        if (data[1] === 1) {
            return res.status(201).json({
                message: 'User SignUp Successfull',
                success: true,
            })
        } else {
            return res.status(500).json({
                message: 'something went wrong!',
                success: false,
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
            success: false,
        })
    }
}

exports.agentLogIn = async (req, res, next) => {
    try {
        const { agent_email, agent_password } = req.body
        const data = await db.sequelize.query(
            'EXEC GetAgentPassword :agent_email',
            {
                replacements: {
                    agent_email: agent_email,
                },
                type: db.sequelize.QueryTypes.SELECT,
            }
        )
        const passwordMatched = await bcrypt.compare(
            agent_password,
            data[0].agent_password
        )
        if (passwordMatched) {
            const accessToken = jwt.sign(
                { agent_id: data[0].agent_id },
                process.env.AGENT_SECRET_KEY
            )
            return res.status(201).json({
                message: 'Login Successfull',
                accessToken: accessToken,
                error: false,
            })
        } else {
            return res.status(200).json({
                message: 'Invalid Email or Password',
                error: false,
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
            success: false,
        })
    }
}
