exports.up = function(knex) {
    return knex.schema
        .createTable('users', function(table) {
            table.increments().primary()
            table.string('name', 255).notNullable()
            table.string('email', 255).unique().notNullable()
            table.string('phone_number', 255).unique().notNullable()
            table.string('password', 255).notNullable()
            // table.string('salt', 255) // Not needed w/ bcrypt
            table.timestamp('created_at').defaultTo(knex.fn.now())
            table.timestamp('updated_at').defaultTo(knex.fn.now())
        })
}

exports.down = function(knex) {
    return knex.schema.dropTable('users');
}
