"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
class UserRepository {
    constructor(pool) {
        this.pool = pool;
    }
    async findAll() {
        const result = await this.pool.query("SELECT * FROM users");
        return result.rows;
    }
    async findById(id) {
        const result = await this.pool.query("SELECT * FROM users WHERE id = $1", [
            id,
        ]);
        if (result.rowCount === 0) {
            return null;
        }
        return result.rows[0];
    }
    async findByRoleId(roleId) {
        const { rows, rowCount } = await this.pool.query("SELECT * FROM users WHERE role_id = $1", [roleId]);
        if (rowCount === 0) {
            return null;
        }
        return rows[0];
    }
    async create(user) {
        const result = await this.pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [user.name, user.email, user.password]);
        return result.rows[0];
    }
    async update(user) {
        const result = await this.pool.query("UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *", [user.name, user.email, user.password, user.id]);
        if (result.rowCount === 0) {
            return null;
        }
        return result.rows[0];
    }
    async delete(id) {
        const result = await this.pool.query("DELETE FROM users WHERE id = $1", [
            id,
        ]);
        return result.rowCount > 0;
    }
}
exports.UserRepository = UserRepository;
