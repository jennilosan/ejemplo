// test/generadornombre.test.js
const {
  generateName,
  availableRaces,
  availableClasses,
  racePrefixes,
  classSuffixes
} = require('../src/lib/nameGenerator.js');

describe('Name Generator', () => {
  test('las raices y las clases deben estar definidas', () => {
    expect(availableRaces).toEqual(expect.arrayContaining(['Human', 'Elf', 'Dwarf']));
    expect(availableClasses).toEqual(expect.arrayContaining(['Warrior', 'Mage', 'Rogue']));
  });

  test('generateName produce un valor de tipo texto', () => {
    const name = generateName('Human', 'Warrior');
    expect(typeof name).toBe('string');
    expect(name.length).toBeGreaterThan(0);
  });

  test('el nombre inicia con un prefijo válido', () => {
    // Mock de Math.random para que siempre tome el primer elemento
    jest.spyOn(global.Math, 'random').mockReturnValue(0);
    const name = generateName('Elf', 'Mage');
    const prefix = name.split(' ')[0];
    const validPrefixes = ['Ela', 'Fin', 'Gal', 'Sil', 'Ael', 'Tho', 'Lir', 'Vel', 'Zir', 'Nil'];
    expect(validPrefixes).toContain(prefix);
    Math.random.mockRestore();
  });

  test('el nombre termina con un sufijo válido de la clase', () => {
    // Mock de Math.random para que siempre tome el primer elemento
    jest.spyOn(global.Math, 'random').mockReturnValue(0);
    const name = generateName('Dwarf', 'Rogue');
    const suffix = name.substring(name.indexOf(' ') + 1);
    const validSuffixes = [
      'of the Shadows',
      'Whispercloak',
      'the Quick',
      'Nightstalker',
      'Daggerfall',
      'Silentblade'
    ];
    expect(validSuffixes).toContain(suffix);
    Math.random.mockRestore();
  });
});
