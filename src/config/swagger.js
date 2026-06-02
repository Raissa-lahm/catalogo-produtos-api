const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Catálogo de Produtos API',
      version: '1.0.0',
      description:
        'API REST para gerenciamento de produtos com autenticação JWT. ' +
        'Para acessar as rotas protegidas, registre um usuário, faça login e use o token no botão **Authorize** acima.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Insira o token JWT obtido no login. Ex: Bearer eyJhbGci...',
        },
      },
      schemas: {
        RegisterInput: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name:     { type: 'string', example: 'Maria Silva' },
            email:    { type: 'string', format: 'email', example: 'maria@email.com' },
            password: { type: 'string', format: 'password', example: 'senha123' },
          },
        },
        LoginInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email:    { type: 'string', format: 'email', example: 'maria@email.com' },
            password: { type: 'string', format: 'password', example: 'senha123' },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
            user: {
              type: 'object',
              properties: {
                id:    { type: 'string', example: '665f1a2b3c4d5e6f7a8b9c0d' },
                name:  { type: 'string', example: 'Maria Silva' },
                email: { type: 'string', example: 'maria@email.com' },
              },
            },
          },
        },
        ProductInput: {
          type: 'object',
          required: ['name', 'price', "category"],
          properties: {
            name:        { type: 'string',  example: 'Notebook Dell' },
            description: { type: 'string',  example: 'Notebook para trabalho' },
            price:       { type: 'number',  example: 3500 },
            category:    { type: 'string',  example: 'eletronicos' },
            stock:       { type: 'integer', example: 10 },
            attributes: {
              type: 'object',
              additionalProperties: true,
              example: { ram: '16GB', processador: 'i7', armazenamento: '512GB SSD' },
            },
          },
        },
        Product: {
          allOf: [
            { $ref: '#/components/schemas/ProductInput' },
            {
              type: 'object',
              properties: {
                _id:       { type: 'string',  example: '665f1a2b3c4d5e6f7a8b9c0d' },
                createdAt: { type: 'string',  format: 'date-time' },
                updatedAt: { type: 'string',  format: 'date-time' },
              },
            },
          ],
        },
        Error400: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Dados inválidos ou ausentes.' },
          },
        },
        Error401: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Token inválido ou não fornecido.' },
          },
        },
        Error404: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Recurso não encontrado.' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);