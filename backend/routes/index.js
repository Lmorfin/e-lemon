const router = require("express").Router();
module.exports = router;

//router.use(clientRoutes);

function useAPIErrorHandlers(router) {
  router.use((err, req, res, next) => {
    if (!err) {
      return next();
    }

    console.error(err.stack);

    res.sendStatus(500);
  });
}
