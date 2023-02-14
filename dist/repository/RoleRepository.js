"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRepository = void 0;
class RoleRepository {
    constructor(pool) {
        this.pool = pool;
    }
    async findAll() {
        const { rows } = await this.pool.query("SELECT * FROM roles");
        return rows;
    }
    async findById(id) {
        const { rows } = await this.pool.query("SELECT * FROM roles WHERE id = $1", [id]);
        return rows[0];
    }
    async create(role) {
        const { key, name } = role;
        const { rows } = await this.pool.query("INSERT INTO roles (key, name) VALUES ($1, $2) RETURNING *", [key, name]);
        return rows[0];
    }
    async update(role) {
        const { id, key, name } = role;
        const { rowCount } = await this.pool.query("UPDATE roles SET key = $2, name = $3 WHERE id = $1", [id, key, name]);
        return rowCount === 1 ? role : null;
    }
    async delete(id) {
        const { rowCount } = await this.pool.query("DELETE FROM roles WHERE id = $1", [id]);
        return rowCount === 1;
    }
}
exports.RoleRepository = RoleRepository;
