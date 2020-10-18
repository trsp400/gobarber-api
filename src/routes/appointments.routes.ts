
export default async function appointmentsRoutes(server, options, next){
  server.get(`/`, (req, res) => {
    res.send({ status: 'ok' });
  });

  next()
};
