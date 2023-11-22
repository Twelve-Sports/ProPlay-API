/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('court').del();

  // Inserts seed entries
  await knex('court').insert([
    { id: 1, name: 'Quadra 1' },
    { id: 2, name: 'Quadra 2' },
    { id: 3, name: 'Quadra 3' },
    { id: 4, name: 'Quadra 4' },
    { id: 5, name: 'Quadra 5' },
    { id: 6, name: 'Quadra 6' },
    { id: 7, name: 'Quadra 7' },
    { id: 8, name: 'Quadra 8' },
    { id: 9, name: 'Quadra 9' },
    { id: 10, name: 'Quadra 10' },
    { id: 11, name: 'Quadra 11' },
    { id: 12, name: 'Quadra 12' },
    { id: 13, name: 'Quadra 13' },
    { id: 14, name: 'Quadra 14' },
    { id: 15, name: 'Quadra 15' },
  ]);
}
