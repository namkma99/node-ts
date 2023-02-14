import { Pool } from "pg";
import { Role } from "../entity/Role";

export class RoleRepository {
  constructor(private pool: Pool) {}

  async findAll() {
    const { rows } = await this.pool.query<Role>("SELECT * FROM roles");
    return rows;
  }

  async findById(id: number) {
    const { rows } = await this.pool.query<Role>(
      "SELECT * FROM roles WHERE id = $1",
      [id]
    );
    return rows[0];
  }

  async create(role: Role) {
    const { key, name } = role;
    const { rows } = await this.pool.query<Role>(
      "INSERT INTO roles (key, name) VALUES ($1, $2) RETURNING *",
      [key, name]
    );
    return rows[0];
  }

  async update(role: Role) {
    const { id, key, name } = role;
    const { rowCount } = await this.pool.query(
      "UPDATE roles SET key = $2, name = $3 WHERE id = $1",
      [id, key, name]
    );
    return rowCount === 1 ? role : null;
  }

  async delete(id: number) {
    const { rowCount } = await this.pool.query(
      "DELETE FROM roles WHERE id = $1",
      [id]
    );
    return rowCount === 1;
  }
}
