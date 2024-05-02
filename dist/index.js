"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/routes/user.route.ts
var import_express = require("express");

// src/schema/user.schema.ts
var import_zod = __toESM(require("zod"));
var userSchema = import_zod.default.object({
  id: import_zod.default.string(),
  name: import_zod.default.string().min(1),
  email: import_zod.default.string().email(),
  phone: import_zod.default.string().min(1),
  customerId: import_zod.default.string().min(1),
  subscriptionId: import_zod.default.string().min(1)
});
var createUserSchema = import_zod.default.object({
  name: import_zod.default.string().min(1),
  email: import_zod.default.string().email(),
  phone: import_zod.default.string().min(1),
  customerId: import_zod.default.string().min(1),
  subscriptionId: import_zod.default.string().min(1)
});

// src/domain/User.ts
var User = class {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.customerId = data.customerId;
    this.subscriptionId = data.subscriptionId;
  }
};

// src/interface/IDatabase.ts
var BaseRepository = class {
  constructor() {
    this.data = [];
  }
  create(entity) {
    this.data.push(entity);
  }
  read() {
    return this.data;
  }
  findFirst(id) {
  }
  update(id, updatedEntity) {
    const index = this.data.findIndex((entity) => entity.id === id);
    if (index !== -1) {
      this.data[index] = { ...this.data[index], ...updatedEntity };
    } else {
      throw new Error("Entity not found");
    }
  }
  delete(id) {
    this.data = this.data.filter((entity) => entity.id !== id);
  }
};

// src/repository/UserPrismaRepository.ts
var import_client = require("@prisma/client");
var UserPrismaRepository = class extends BaseRepository {
  constructor() {
    super(...arguments);
    this.prisma = new import_client.PrismaClient();
  }
  async create(data) {
    const { id, ...user } = data;
    try {
      return await this.prisma.user.create({
        data: { ...user }
      });
    } catch (error) {
      return null;
    }
  }
  async delete(userId) {
    try {
      return await this.prisma.user.delete({
        where: {
          id: userId
        }
      });
    } catch (error) {
      return null;
    }
  }
  async findFirst(userId) {
    try {
      return await this.prisma.user.findFirst({
        where: {
          id: userId
        }
      });
    } catch (error) {
      return null;
    }
  }
  async update(userId, data) {
    try {
      return await this.prisma.user.update({
        where: {
          id: userId
        },
        data
      });
    } catch (error) {
      return null;
    }
  }
};

// src/controllers/user.controller.ts
var userRepository = new UserPrismaRepository();
var UserController = class {
  async create(req, res) {
    try {
      const { email, name, customerId, phone, subscriptionId } = createUserSchema.parse(req.body);
      const user = new User({
        email,
        name,
        customerId,
        phone,
        subscriptionId,
        id: ""
      });
      await userRepository.create(user);
      return res.status(201).send(user);
    } catch (error) {
      return res.status(400).send("Erro ao criar usuario");
    }
  }
  findById(req, res) {
    return res.status(200).send("user");
  }
};

// src/routes/user.route.ts
var userRouters = (0, import_express.Router)();
var userController = new UserController();
userRouters.post("/user", userController.create);
userRouters.get("/user", userController.findById);
userRouters.get("/", userController.findById);

// src/server.ts
var import_express2 = __toESM(require("express"));
var import_express_session = __toESM(require("express-session"));
var cookieParser = require("cookie-parser");
var ExpressServer = class {
  constructor() {
    this.app = (0, import_express2.default)();
    this.PORT = 3e3;
    this.app.use(import_express2.default.json());
    this.app.use(cookieParser());
    this.app.use(
      (0, import_express_session.default)({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true
      })
    );
  }
  addRouter(routes) {
    this.app.use(routes);
  }
  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`Server is running on http://localhost:${this.PORT}`);
    });
  }
};

// src/index.ts
var server = new ExpressServer();
server.addRouter(userRouters);
server.listen();
