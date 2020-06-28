exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([
                {
                    name: 'Jack D',
                    email: 'jack@twitter.com',
                    phone_number: '8888888888',
                    password: '$2b$10$yDuzRneNGGnGyx3tTSpiLevKNbKSdRKLtbsLklw1M4EFn.Riep0/q', // password
                    // dob: '2016-03-07', // Include in the future for TOS compliance.
                },
                {
                    name: 'Jackie D',
                    email: 'jackie@twitter.com',
                    phone_number: '9999999999',
                    password: '$2b$10$yDuzRneNGGnGyx3tTSpiLevKNbKSdRKLtbsLklw1M4EFn.Riep0/q', // password
                    // dob: '2016-03-07', // Include in the future for TOS compliance.
                },
            ])
        })
}
