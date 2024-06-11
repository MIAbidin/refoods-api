const { nanoid } = require('nanoid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const refoods = require('./refoods');
const users = require('./user');

const addRefoodHandler = (request, h) => {
  const { idLimbah } = request.params;
  const { teks, idUser, namaLengkap } = request.payload;
  const idPengolahan = nanoid(16);
  const createdAt = new Date().toISOString();

  const newOlah = {
    teks, idPengolahan, idUser, namaLengkap, createdAt,
  };

  const refoodIndex = refoods.findIndex((refood) => refood.idLimbah === idLimbah);

  if (refoodIndex !== -1) {
    refoods[refoodIndex].caraPengolahan.push(newOlah);

    const response = h.response({
      status: 'success',
      message: 'Cara pengolahan berhasil ditambahkan',
      data: {
        pengolahanId: idPengolahan,
        teks: newOlah.teks,
        createdAt: newOlah.createdAt,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Cara pengolahan gagal ditambahkan. Id Limbah tidak ditemukan.',
  });
  response.code(404);
  return response;
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
      image: request.server.info.uri + refood.picture
    };

    return {
      status: 'success',
      data: {
        refood: refoodWithImage,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Jenis Limbah tidak ditemukan',
  });
  response.code(404);
  return response;
};


const editRefoodHandler = (request, h) => {
  const { idLimbah, idPengolahan } = request.params;
  const { teks, idUser, namaLengkap } = request.payload;
  const updatedAt = new Date().toISOString();

  const refoodIndex = refoods.findIndex((refood) => refood.idLimbah === idLimbah);
  if (refoodIndex !== -1) {
    const olahanIndex = refoods[refoodIndex].caraPengolahan.findIndex((olah) => olah.idPengolahan === idPengolahan);

    if (olahanIndex !== -1) {
      refoods[refoodIndex].caraPengolahan[olahanIndex] = {
        ...refoods[refoodIndex].caraPengolahan[olahanIndex],
        teks,
        idUser,
        namaLengkap,
        updatedAt,
      };

      const response = h.response({
        status: 'success',
        message: 'Cara pengolahan berhasil diperbarui',
      });
      response.code(200);
      return response;
    }
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui cara pengolahan. Id Limbah atau Id Pengolahan tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteRefoodHandler = (request, h) => {
  const { idLimbah, idPengolahan } = request.params;

  const refoodIndex = refoods.findIndex((refood) => refood.idLimbah === idLimbah);
  if (refoodIndex !== -1) {
    const olahanIndex = refoods[refoodIndex].caraPengolahan.findIndex((olah) => olah.idPengolahan === idPengolahan);

    if (olahanIndex !== -1) {
      refoods[refoodIndex].caraPengolahan.splice(olahanIndex, 1);
      const response = h.response({
        status: 'success',
        message: 'Cara pengolahan berhasil dihapus',
      });
      response.code(200);
      return response;
    }
  }

  const response = h.response({
    status: 'fail',
    message: 'Cara pengolahan gagal dihapus. Id Limbah atau Id Pengolahan tidak ditemukan',
  });
  response.code(404);
  return response;
};

const registerHandler = async (request, h) => {
  const { username, password, nama_lengkap } = request.payload;
  const id_user = nanoid(16);
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    users.push({ id_user, username, password: hashedPassword, nama_lengkap });
    return h.response({ status: 'success', message: 'User berhasil didaftarkan', data: { userId: id_user } }).code(201);
  } catch (err) {
    console.error('Error registering user:', err);
    return h.response({ status: 'fail', message: 'User gagal didaftarkan', error: err.message }).code(500);
  }
};

const loginHandler = async (request, h) => {
  const { username, password } = request.payload;

  try {
    const user = users.find(user => user.username === username);

    if (!user) {
      return h.response({ status: 'fail', message: 'Username atau password salah' }).code(401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = jwt.sign({ id: user.id_user }, process.env.JWT_SECRET || 'supersecretkey', { expiresIn: '1h' });
      return h.response({ status: 'success', message: 'Login berhasil', data: { token } });
    } else {
      return h.response({ status: 'fail', message: 'Username atau password salah' }).code(401);
    }
  } catch (err) {
    console.error('Error logging in user:', err);
    return h.response({ status: 'fail', message: 'Terjadi kesalahan', error: err.message }).code(500);
  }
};

module.exports = {
  addRefoodHandler,
  getAllRefoodsHandler,
  getRefoodByIdHandler,
  editRefoodHandler,
  deleteRefoodHandler,
  loginHandler,
  registerHandler,
};
