const userRoutes = [
    { path: '/getallproduct', methods: ['GET'] },
    { path: '/:productid', methods: ['GET'] },
    { path: '/register', methods: ['POST'] },
    { path: '/orders', methods: ['GET'] },
    { path: '/order', methods: ['POST'] },
  ];


  module.exports = { userRoutes };