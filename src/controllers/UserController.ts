import express, { Request, Response } from "express";
import { Pool } from "pg";
import { UserRepository } from "../repository/UserRepository";
import { User } from "../entity/User";

export class UserController {
  private repository: UserRepository;

  constructor(pool: Pool) {
    this.repository = new UserRepository(pool);
  }

  async findAll(req: Request, res: Response) {
    const users = await this.repository.findAll();
    res.json(users);
  }

  async findById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const user = await this.repository.findById(id);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.json(user);
    }
  }

  async create(req: Request, res: Response) {
    const user: User = req.body;
    const createdUser = await this.repository.create(user);
    res.status(201).json(createdUser);
  }

  async update(req: Request, res: Response) {
    const user: User = req.body;
    user.id = parseInt(req.params.id);
    const updatedUser = await this.repository.update(user);
    if (!updatedUser) {
      res.status(404).send("User not found");
    } else {
      res.json(updatedUser);
    }
  }

  async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const deleted = await this.repository.delete(id);
    if (deleted) {
      res.sendStatus(204);
    } else {
      res.status(404).send("User not found");
    }
  }
}
