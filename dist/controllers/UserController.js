"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserRepository_1 = require("../repository/UserRepository");
class UserController {
    constructor(pool) {
        this.repository = new UserRepository_1.UserRepository(pool);
    }
    async findAll(req, res) {
        const users = await this.repository.findAll();
        res.json(users);
    }
    async findById(req, res) {
        const id = parseInt(req.params.id);
        const user = await this.repository.findById(id);
        if (!user) {
            res.status(404).send("User not found");
        }
        else {
            res.json(user);
        }
    }
    async create(req, res) {
        const user = req.body;
        const createdUser = await this.repository.create(user);
        res.status(201).json(createdUser);
    }
    async update(req, res) {
        const user = req.body;
        user.id = parseInt(req.params.id);
        const updatedUser = await this.repository.update(user);
        if (!updatedUser) {
            res.status(404).send("User not found");
        }
        else {
            res.json(updatedUser);
        }
    }
    async delete(req, res) {
        const id = parseInt(req.params.id);
        const deleted = await this.repository.delete(id);
        if (deleted) {
            res.sendStatus(204);
        }
        else {
            res.status(404).send("User not found");
        }
    }
}
exports.UserController = UserController;
