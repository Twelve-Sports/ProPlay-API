import dbKnex from '../database/db_config.js'

export const indexClipe = async (req, res) => {

    try{
        const clips = await dbKnex('clips').select('*');

        return res.json(clips);
    }
    catch (err) {
        return res.status(400).json({
            message: 'Não foi possível listar os clipes',
            error: err
        })
    }

}

export const createClipe = async (req, res) => {

    const { file , timestamp, record_id } = req.body;

    if(!record_id){
        return res.status(400).json({
            message: 'Registro não informado'
        })
    }

    try{
        const clip = await dbKnex('clips').insert({
            file,
            timestamp,
            record_id
        });

        return res.json(clip);
    }
    catch (err) {
        return res.status(400).json({
            message: 'Não foi possível criar o clipe',
            error: err
        })
    }

}
