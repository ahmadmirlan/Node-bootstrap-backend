import {statusCode} from '../utility/statusCode';

const restManager = (req, res, next) => {
  res.sendData = (data, size, totalElements, page) => {
    let renderPage = {
      data: data,
      page: {
        size: size,
        totalElements: totalElements,
        totalPage: totalElements <= 0 ? 0 : Math.ceil(totalElements / size),
        page: page,
      },
    };
    return res.send(renderPage);
  };

  res.sendMessage = message => {
    return res.send({ message });
  };

  res.sendError = message => {
    let errMessage;
    let errCode;
    if (message instanceof Error) {
      errMessage = message.message;
      errCode = message.code
    }
    return res.json({
      message: errMessage ? errMessage : message,
      url: req.url,
      method: req.method,
      status: errCode ? statusCode[errCode] : statusCode[res.statusCode],
      code: res.statusCode,
    });
  };

  res.unauthorized = message => {
    return res.json({
      message: message || 'Missing or Invalid token',
      url: req.url,
      method: req.method,
      status: 'UnAuthorized',
      code: code || 401,
    });
  };
  next();
};

module.exports = {
  restManager,
};
