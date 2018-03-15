export const verifyUser = (req, res, next) => {
  
    let Model;
    req.verified = false;
    if(!req.cookies.token) return next();
    const user = jwt.decode(req.cookies.token, secret);
    if(user.status === 'artist') Model = Artist;
    if(user.status === 'client') Model = Client;
    if(user.status === 'shop') Model = Shop;
    if(!Model || !user.ex || user.ex < Date.now()) return next();
    Model.findOne({ username: user.username, password: user.password }, {password: 0, createdAt:0, __v: 0,})
    .exec((err, found) => {
      if (err || !found) return next();
      const token = jwt.encode({username: user.username, password: user.password, status: user.status, ex: setExp(eTime)}, secret);
      res.cookie('token', token);
      req.verified = true;
      next();
    });
};
