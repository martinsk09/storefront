// @ts-ignore
import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
export type UserT = {
  id?: number;
  firstname?: string;
  lastname?: string;
  username: string;
  password_digest: string;
};

export class User {
  async index(): Promise<UserT[]> {
    try {
      // @ts-ignore
      const ctn = await Client.connect();
      const sql = 'SELECT * FROM users';

      const result = await ctn.query(sql);

      ctn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not retrieve users. Error: ${err}`);
    }
  }
  async create(u: UserT): Promise<UserT> {
    try {
        // @ts-ignore
      const conn = await Client.connect();
      const sql =
        'INSERT INTO users (firstname, lastname, username, password_digest) VALUES($1, $2, $3, $4) RETURNING *';

      const hash = bcrypt.hashSync(
        u.password_digest + pepper,
        parseInt(
          // @ts-ignore
          saltRounds
        )
      );

      const result = await conn.query(sql, [
        u.firstname,
        u.lastname,
        u.username,
        hash
      ]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Unable to create user (${u.username}): ${err}`);
    }
  }
  async show(id: string): Promise<UserT> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      // @ts-ignore
      const ctn = await Client.connect();

      const result = await ctn.query(sql, [id]);

      ctn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    // @ts-ignore
    const conn = await Client.connect();
    const sql = 'SELECT password_digest FROM users WHERE username=($1)';

    const result = await conn.query(sql, [username]);

    console.log(password + pepper);

    if (result.rows.length) {
      const user = result.rows[0];

      console.log(user);

      if (bcrypt.compareSync(password + pepper, user.password_digest)) {
        return user;
      }
    }

    return null;
  }
}
