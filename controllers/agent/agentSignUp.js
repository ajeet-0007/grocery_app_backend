const bcrypt = require('bcrypt');
const db = require('../../config/index');



exports.agentSignUp = async (req, res, next) => {
    try {
        const {agent_id, agent_name, agent_email, agent_phone_number, agent_password} = req.body;
        const agent_hashed_password = await bcrypt.hash(agent_password, 10);
        const data = await db.sequelize.query('EXEC InsertAgent :agent_id, :agent_name, :agent_email, :agent_phone_number, :agent_password', {
            replacements: {
                agent_id: agent_id,
                agent_name: agent_name,
                agent_email: agent_email,
                agent_phone_number: agent_phone_number,
                agent_password: agent_hashed_password,
            }
        })
        if(data[1]===1){
        return res.status(201).json({
            message: "User SignUp Successfull",
            success: true
        })
    }else{
        return res.status(500).json({
            message: "something went wrong!",
            success: false
        })
    }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            success: false
        })
    }
}