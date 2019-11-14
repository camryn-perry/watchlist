'use strict';

const db = require('../server/db');
const {User, Film} = require('../server/db/models');

async function seed() {
  await db.sync({force: true});
  console.log('db synced!');

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ]);
  const films = await Promise.all([
    Film.create({
      title: 'North by Northwest',
      year: 1959,
      imdbid: 'tt0053125',
      type: 'movie',
      poster:
        'https://m.media-amazon.com/images/M/MV5BZDA3NDExMTUtMDlhOC00MmQ5LWExZGUtYmI1NGVlZWI4OWNiXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg'
    }),
    Film.create({
      title: 'Only Lovers Left Alive',
      year: 2013,
      imdbid: 'tt1714915',
      type: 'movie',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMTY0NTQ1NjA0OV5BMl5BanBnXkFtZTgwMDg5NjkzMTE@._V1_SX300.jpg'
    })
  ]);
  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${films.length} films`);
  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
