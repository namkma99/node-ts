import { Pool } from "pg";
import { User } from "../entity/User";

export class UserRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findAll(): Promise<User[]> {
    const result = await this.pool.query("SELECT * FROM users");
    return result.rows;
  }

  async findById(id: number): Promise<User | null> {
    const result = await this.pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    if (result.rowCount === 0) {
      return null;
    }
    return result.rows[0];
  }

  async findByRoleId(roleId: number): Promise<User | null> {
    const { rows, rowCount } = await this.pool.query<User>(
      "SELECT * FROM users WHERE role_id = $1",
      [roleId]
    );
    if (rowCount === 0) {
      return null;
    }
    return rows[0];
  }

  async create(user: User): Promise<User> {
    const result = await this.pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [user.name, user.email, user.password]
    );
    return result.rows[0];
  }

  async update(user: User): Promise<User | null> {
    const result = await this.pool.query(
      "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
      [user.name, user.email, user.password, user.id]
    );
    if (result.rowCount === 0) {
      return null;
    }
    return result.rows[0];
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.pool.query("DELETE FROM users WHERE id = $1", [
      id,
    ]);
    return result.rowCount > 0;
  }
}
