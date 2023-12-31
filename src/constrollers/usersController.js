const { hash, compare } = require("bcryptjs")

const appError = require("../utils/appError")

const sqliteConection = require("../database/sqlite")

class UsersController {
  async create(req, res) {
    const {name, email, password} = req.body

    const database = await sqliteConection()
    const checkUsersExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if(checkUsersExists) {
      throw new appError('Usuário já cadastrado !')
    }

    const hashedPassword = await hash(password, 8)

    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword])

    return res.status(201).json()
  }

  async update(req, res) {
    const {name, email, password, old_password} = req.body;
    const user_id = req.user.id;

    const database = await sqliteConection()
    const user = await database.get(`SELECT * FROM users WHERE id = (?)`, [user_id])

    if(!user) {
      throw new appError('Usuário não encontrado')
    }

    const userWithUpdatedEmail = await database.get(`SELECT * FROM users WHERE email = (?)`, [email])

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new appError('Este email já está em uso.')
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    if(password && !old_password) {
      throw new appError('Você precisa informar a senha antiga para definir a nova senha')
    }

    if(password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if(!checkOldPassword) {
        throw new appError('A senha antiga não confere.')
      }

      user.password = await hash(password, 8)
    }

    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, user_id]
    )

    return res.json()
  }
}

module.exports = UsersController 