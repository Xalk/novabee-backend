import ApiaryModel from '../models/Apiary.js';

export const create = async (req, res) => {
  try {
    const { name, description, startSeason } = req.body;

    const doc = new ApiaryModel({
      name,
      description,
      startSeason,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалося створити пасіку',
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const apiaries = await ApiaryModel.find().populate('user').exec();
    res.json(apiaries);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалося отриманти пасіки',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const apiaryId = req.params.id;

    ApiaryModel.findOne(
      {
        _id: apiaryId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Не вдалося отриманти пасіку',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Пасіка не знайдена',
          });
        }

        res.json(doc);
      },
    ).populate('user');
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const apiaryId = req.params.id;

    ApiaryModel.findOneAndDelete(
      {
        _id: apiaryId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Не вдалось видалити пасіку',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Пасіка не знайдена',
          });
        }

        res.json({
          success: true,
        });
      },
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалось отримати пасіку',
    });
  }
};

export const update = async (req, res) => {
  try {
    const { name, description, startSeason } = req.body;
    const apiaryId = req.params.id;

    await ApiaryModel.updateOne(
      {
        _id: apiaryId,
      },
      {
        name,
        description,
        startSeason,
        user: req.userId,
      },
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалось оновити пасіку',
    });
  }
};
