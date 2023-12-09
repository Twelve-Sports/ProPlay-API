import dbKnex from '../database/db_config.js'
import { format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

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

export const dateNow = async (req, res) => {
    const court = req.params.court;

    try {
        const courtEntity = await dbKnex('court').where('id', court).select('*').first();

        if (!courtEntity) {
            return res.status(400).json({
                message: 'Quadra não encontrada'
            });
        }

        const date = new Date();
        date.setHours(date.getHours() - 3);
        const dateNow = format(date, 'yyyy-MM-dd HH:mm:ss');

        const dateEntity = await dbKnex('dateNow')
            .insert({
                data: dateNow,
                court_id: courtEntity.id
            })

        res.status(200).json(dateEntity[0]);

    } catch (err) {
        return res.status(400).json({
            message: 'Não foi possível criar a data',
            error: err
        });
    }
}

export const dateNowList = async (req, res) => {
    const { courtId } = req.params;

    try {
        const result = await dbKnex('dateNow')
            .select('dateNow.data', 'dateNow.id','dateNow.isDone', 'court.name as court_name', 'court.id as court_id')
            .join('court', 'court.id', '=', 'dateNow.court_id')
            .where('court.id', courtId);

        if (!result || result.length === 0) {
            return res.status(400).json({
                message: 'Nenhuma data encontrada para esta quadra'
            });
        }

        res.status(200).json(result);
    } catch (err) {
        return res.status(400).json({
            message: 'Não foi possível obter os dados da data',
            error: err
        });
    }
};

 export const saveVideo = async (req, res) => {
    const { dateNowId } = req.params;
    
    const video = req.file.path

  try{
    console.log(video);
    console.log(dateNowId);
    const result = await dbKnex('clips').insert({
        file: video,
        dateNow_id: dateNowId
    });

    await dbKnex('dateNow').where('id', dateNowId).update({
        isDone: true
    });

    res.status(200).json(result);
  }
    catch(err){
        return res.status(400).json({
            message: 'Não foi possível salvar o vídeo',
            error: err.message
        });
    }

 }

 export const getVideo = async (req, res) => {
    const { courtId } = req.params;

    try {
        const result = await dbKnex('clips')
            .select('clips.file', 'dateNow.data', 'court.name as court_name')
            .join('dateNow', 'dateNow.id', '=', 'clips.dateNow_id')
            .join('court', 'court.id', '=', 'dateNow.court_id')
            .where('court.id', courtId);

        if (!result || result.length === 0) {
            return res.status(400).json({
                message: 'Nenhum vídeo encontrado para esta quadra'
            });
        }

        res.status(200).json(result);
    } catch (err) {
        return res.status(400).json({
            message: 'Não foi possível obter os dados do vídeo',
            error: err
        });
    }

}

export const getVideoByDay = async (req, res) => {
    const { courtId } = req.params;
    const { date } = req.body;

    try {
        const formattedDate = format(utcToZonedTime(parseISO(date), 'UTC'), 'yyyy-MM-dd');

        const result = await dbKnex('clips')
            .select('clips.file', 'dateNow.data', 'court.name as court_name', 
            'court.id as court_id')
            .join('dateNow', 'dateNow.id', '=', 'clips.dateNow_id')
            .join('court', 'court.id', '=', 'dateNow.court_id')
            .where('court.id', courtId)
            .whereRaw('DATE(dateNow.data) = ?', [formattedDate]);

        if (!result || result.length === 0) {
            return res.status(400).json({
                message: `Nenhum vídeo encontrado para a quadra ${courtId} na data ${formattedDate}`
            });
        }

        res.status(200).json(result);
    } catch (err) {
        return res.status(400).json({
            message: 'Não foi possível obter os dados do vídeo',
            error: err
        });
    }
}

export const getVideoByDayAndHour = async (req, res) => {
    const { courtId } = req.params;
    const { date, hour } = req.body;

    try {
        const formattedDate = format(utcToZonedTime(parseISO(date), 'UTC'), 'yyyy-MM-dd');

        const result = await dbKnex('clips')
            .select('clips.file', 'dateNow.data', 'court.name as court_name', 'court.id as court_id')
            .join('dateNow', 'dateNow.id', '=', 'clips.dateNow_id')
            .join('court', 'court.id', '=', 'dateNow.court_id')
            .where('court.id', courtId)
            .whereRaw('DATE_FORMAT(dateNow.data, "%Y-%m-%d") = ?', [formattedDate])
            .whereRaw('HOUR(dateNow.data) = ?', [hour]);

        if (!result || result.length === 0) {
            return res.status(400).json({
                message: `Nenhum vídeo encontrado para a quadra ${courtId} na data
                 ${formattedDate} e hora ${hour}`
            });
        }

        const totalClips = result.length;

        res.status(200).json({ totalClips, videos: result });
    } catch (err) {
        return res.status(400).json({
            message: 'Não foi possível obter os dados do vídeo',
            error: err
        });
    }
}

export const getCourtWhenHaveVideoInDay = async (req, res) => {
    const { date } = req.body;


    try {
        const formattedDate = format(utcToZonedTime(parseISO(date), 'UTC'), 'yyyy-MM-dd');

        const result = await dbKnex('clips')
            .select('court.id', 'court.name')
            .join('dateNow', 'dateNow.id', '=', 'clips.dateNow_id')
            .join('court', 'court.id', '=', 'dateNow.court_id')
            .whereRaw('DATE(dateNow.data) = ?', [formattedDate])
            .groupBy('court.id');

        if (!result || result.length === 0) {
            return res.status(400).json({
                message: `Nenhuma quadra encontrada com vídeo na data ${formattedDate}`
            });
        }

        res.status(200).json(result);
    } catch (err) {
        return res.status(400).json({
            message: 'Não foi possível obter os dados do vídeo',
            error: err
        });
    }
}

export const getCourtWhenHaveVideoInDayAndHour = async (req, res) => {
    const { date, hour } = req.body;

    try {
        const formattedDate = format(utcToZonedTime(parseISO(date), 'UTC'), 'yyyy-MM-dd');

        const result = await dbKnex('clips')
            .select('court.id', 'court.name')
            .join('dateNow', 'dateNow.id', '=', 'clips.dateNow_id')
            .join('court', 'court.id', '=', 'dateNow.court_id')
            .whereRaw('DATE_FORMAT(dateNow.data, "%Y-%m-%d") = ?', [formattedDate])
            .whereRaw('HOUR(dateNow.data) = ?', [hour - 3])
            .groupBy('court.id');

        if (!result || result.length === 0) {
            return res.status(400).json({
                message: `Nenhuma quadra encontrada com vídeo na data ${formattedDate} e hora ${hour}`
            });
        }

        res.status(200).json(result);
    } catch (err) {
        return res.status(400).json({
            message: 'Não foi possível obter os dados do vídeo',
            error: err
        });
    }
}

export const getVideoByDayAllCourts = async (req, res) => {
    const { date } = req.body;

    try {
      const formattedDate = format(utcToZonedTime(parseISO(date), 'UTC'), 'yyyy-MM-dd');
  
      const result = await dbKnex('clips')
        .select(
          'clips.file',
          'dateNow.data',
          dbKnex.raw('extract(hour from dateNow.data) as hour'),
          'court.name as court_name',
          'court.id as court_id'
        )
        .join('dateNow', 'dateNow.id', '=', 'clips.dateNow_id')
        .join('court', 'court.id', '=', 'dateNow.court_id')
        .whereRaw('DATE(dateNow.data) = ?', [formattedDate]);
  
      if (!result || result.length === 0) {
        return res.status(400).json({
          message: `Nenhum vídeo encontrado para a data ${formattedDate}`,
        });
      }
  
      // Count the total number of videos for each hour
      const totalClipsByHour = result.reduce((acc, video) => {
        const hourWithMinutes = `${video.hour}:00`;
        acc[hourWithMinutes] = (acc[hourWithMinutes] || 0) + 1;
        return acc;
      }, {});
  
      res.status(200).json({ totalClipsByHour });
    } catch (err) {
      return res.status(400).json({
        message: 'Não foi possível obter os dados do vídeo',
        error: err,
      });
    }
};

export const getVideoCountByCourtAndHour = async (req, res) => {
    const { date, hour } = req.body;

    try {
        const formattedDate = format(utcToZonedTime(parseISO(date), 'UTC'), 'yyyy-MM-dd');

        const videoCounts = await dbKnex('clips')
            .select('court.name as court_name', 'court.id as court_id')
            .count('clips.id as video_count')
            .join('dateNow', 'dateNow.id', '=', 'clips.dateNow_id')
            .join('court', 'court.id', '=', 'dateNow.court_id')
            .whereRaw('DATE_FORMAT(dateNow.data, "%Y-%m-%d") = ?', [formattedDate])
            .whereRaw('HOUR(dateNow.data) = ?', [hour])
            .groupBy('court.id');

        const formattedCounts = videoCounts.map(({ court_name, court_id, video_count }) => ({
            court_name,
            court_id,
            video_count: parseInt(video_count) // Convert count to integer
        }));

        res.status(200).json(formattedCounts);
    } catch (err) {
        return res.status(400).json({
            message: 'Não foi possível obter os dados do vídeo',
            error: err
        });
    }
}
