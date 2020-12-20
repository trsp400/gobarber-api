export default async function appointmentsRoutes(server, options, next) {
  server.post(`/`, async (req, res) => {
    return {
      message: true,
    };
  });

  next();
}
