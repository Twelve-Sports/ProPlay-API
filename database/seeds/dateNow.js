/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('dateNow').del();

  // Inserts seed entries
  await knex('dateNow').insert([
    { id: 1, court_id: 2, data: '2023-12-01 10:30:00', isDone: true },
    { id: 2, court_id: 4, data: '2023-12-01 11:30:00', isDone: true },
    { id: 3, court_id: 2, data: '2023-12-01 12:30:00', isDone: true },
    { id: 4, court_id: 5, data: '2023-12-01 11:30:00', isDone: true },
    { id: 5, court_id: 1, data: '2023-12-02 13:30:00', isDone: false },
    { id: 6, court_id: 1, data: '2023-12-03 13:30:00', isDone: true },
    { id: 7, court_id: 5, data: '2023-12-02 13:30:00', isDone: true },
    { id: 8, court_id: 4, data: '2023-12-02 11:30:00', isDone: false },
    { id: 9, court_id: 1, data: '2023-12-03 13:30:00', isDone: true },
    { id: 10, court_id: 3, data: '2023-12-02 09:30:00', isDone: true },
    { id: 11, court_id: 2, data: '2023-12-03 19:30:00', isDone: false },
    { id: 12, court_id: 2, data: '2023-12-02 09:30:00', isDone: true },
    { id: 13, court_id: 2, data: '2023-12-01 19:30:00', isDone: false },
    { id: 14, court_id: 2, data: '2023-12-01 19:30:00', isDone: true },

  
  ]);
}
// npx knex seed:run --knexfile database/knexfile.js
// Acho que esse é o comando
