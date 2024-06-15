const { nanoid } = require('nanoid');
const refoods = require('./refoods');

const addRefoodHandler = (request, h) => {
  const { idLimbah } = request.params;
  const { teks, username } = request.payload;
  const idPengolahan = nanoid(16);
  const createdAt = new Date().toISOString();

  const newOlah = { teks, idPengolahan, username, createdAt };

  const refoodIndex = refoods.findIndex((refood) => refood.idLimbah === idLimbah);

  if (refoodIndex !== -1) {
    refoods[refoodIndex].caraPengolahan.push(newOlah);

    return h.response({
      status: 'success',
      message: 'Cara pengolahan berhasil ditambahkan',
      data: {
        pengolahanId: idPengolahan,
        username: newOlah.username,
        teks: newOlah.teks,
        createdAt: newOlah.createdAt,
      },
    }).code(201);
  }

  return h.response({
    status: 'fail',
    message: 'Cara pengolahan gagal ditambahkan. Id Limbah tidak ditemukan.',
  }).code(404);
};

const getAllRefoodsHandler = () => ({
  status: 'success',
  data: {
    refoods,
  },
});

const getRefoodByIdHandler = (request, h) => {
  const { idLimbah } = request.params;
  const refood = refoods.find((refood) => refood.idLimbah === idLimbah);

  if (refood) {
    const refoodWithImage = {
      ...refood,
      image: request.server.info.uri + refood.picture,
    };

    return {
      status: 'success',
      data: {
        refood: refoodWithImage,
      },
    };
  }

  return h.response({
    status: 'fail',
    message: 'Jenis Limbah tidak ditemukan',
  }).code(404);
};

const editRefoodHandler = (request, h) => {
  const { idLimbah, idPengolahan } = request.params;
  const { teks, username } = request.payload;
  const updatedAt = new Date().toISOString();

  const refoodIndex = refoods.findIndex((refood) => refood.idLimbah === idLimbah);
  if (refoodIndex !== -1) {
    const olahanIndex = refoods[refoodIndex].caraPengolahan.findIndex((olah) => olah.idPengolahan === idPengolahan);

    if (olahanIndex !== -1) {
      refoods[refoodIndex].caraPengolahan[olahanIndex] = {
        ...refoods[refoodIndex].caraPengolahan[olahanIndex],
        teks,
        username,
        updatedAt,
      };

      return h.response({
        status: 'success',
        message: 'Cara pengolahan berhasil diperbarui',
      }).code(200);
    }
  }

  return h.response({
    status: 'fail',
    message: 'Gagal memperbarui cara pengolahan. Id Limbah atau Id Pengolahan tidak ditemukan',
  }).code(404);
};

const deleteRefoodHandler = (request, h) => {
  const { idLimbah, idPengolahan } = request.params;

  const refoodIndex = refoods.findIndex((refood) => refood.idLimbah === idLimbah);
  if (refoodIndex !== -1) {
    const olahanIndex = refoods[refoodIndex].caraPengolahan.findIndex((olah) => olah.idPengolahan === idPengolahan);

    if (olahanIndex !== -1) {
      refoods[refoodIndex].caraPengolahan.splice(olahanIndex, 1);
      return h.response({
        status: 'success',
        message: 'Cara pengolahan berhasil dihapus',
      }).code(200);
    }
  }

  return h.response({
    status: 'fail',
    message: 'Cara pengolahan gagal dihapus. Id Limbah atau Id Pengolahan tidak ditemukan',
  }).code(404);
};

module.exports = {
  addRefoodHandler,
  getAllRefoodsHandler,
  getRefoodByIdHandler,
  editRefoodHandler,
  deleteRefoodHandler,
};
