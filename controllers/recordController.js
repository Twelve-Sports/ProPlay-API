import dbKnex from '../database/db_config.js'

export const indexRec = async (req, res) => {

try{
    const records = await dbKnex('record').select('*');

    return res.json(records);
} catch (err) {
    return res.status(400).json({
        message: 'Não foi possível listar os registros',
        error: err
    })
}

}

export const createRec = async (req, res) => {
    const { file, data , court} = req.body;

    if(!file || !data || !court){
        return res.status(400).json({
            message: 'Dados inválidos'
        })
    }


    try{
        const record = await dbKnex('record').insert({
            file,
            court,
            data
        });

        return res.json(record);
    } catch (err) {
        return res.status(400).json({
            message: 'Não foi possível criar o registro',
            error: err
        })
    }
}

