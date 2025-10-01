import { generateName, availableRaces, availableClasses } from '../src/lib/nameGenerator.js';
//gruebas unitarias 
describe('generateName', () => {
  test('debe generar un nombre válido para cada raza y clase', () => {
    availableRaces.forEach((race) => {
      availableClasses.forEach((charClass) => {
        const name = generateName(race, charClass);
        expect(typeof name).toBe('string');
        expect(name.length).toBeGreaterThan(0);

        
        expect(name).toMatch(/\s/);
      });
    });
  });

  //pruebas 
  test('debe lanzar un error si la raza no es válida', () => {
    expect(() => generateName('Orc', 'Warrior')).toThrow('Raza inválida: Orc');
  });

  test('debe lanzar un error si la clase no es válida', () => {
    expect(() => generateName('Human', 'Paladin')).toThrow('Clase inválida: Paladin');
  });

  test('los resultados deben variar (probando aleatoriedad)', () => {
    const results = new Set();
    for (let i = 0; i < 20; i++) {
      results.add(generateName('Human', 'Warrior'));
    }
    expect(results.size).toBeGreaterThan(1);
  });
});
