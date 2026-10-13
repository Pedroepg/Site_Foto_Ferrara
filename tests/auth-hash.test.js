const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { webcrypto } = require('node:crypto');

const source = fs.readFileSync('./Cadastro-Login_FotoFerrara.js', 'utf8');

const setupContext = () => {
  const storage = {};
  const localStorage = {
    getItem(key) { return Object.prototype.hasOwnProperty.call(storage, key) ? storage[key] : null; },
    setItem(key, value) { storage[key] = String(value); },
    removeItem(key) { delete storage[key]; },
    clear() { Object.keys(storage).forEach((key) => delete storage[key]); }
  };

  const context = {
    console,
    crypto: webcrypto,
    TextEncoder,
    localStorage,
    document: {
      addEventListener() {},
      getElementById() { return null; }
    },
    window: {
      location: { search: '', href: '' }
    },
    location: { search: '', href: '' },
    alert() {},
    URLSearchParams,
    fetch: async () => ({ json: async () => ({}) }),
    btoa: (value) => Buffer.from(value, 'utf8').toString('base64')
  };

  vm.createContext(context);
  vm.runInContext(source, context);
  return { context, localStorage };
};

(async () => {
  const { context } = setupContext();

  assert.equal(typeof context.hashSenha, 'function', 'A função hashSenha deve existir.');

  const senhaOriginal = 'minhaSenhaSegura123';
  const hash = await context.hashSenha(senhaOriginal);
  assert.notEqual(hash, senhaOriginal, 'A senha em texto puro não deve ser armazenada.');
  assert.match(hash, /^[a-f0-9]{64}$/);

  const usuarios = {
    'teste@teste.com': {
      nome: 'Teste',
      senha: await context.hashSenha(senhaOriginal)
    }
  };

  context.localStorage.setItem('usuarios', JSON.stringify(usuarios));
  const login = await context.fazerLogin('teste@teste.com', senhaOriginal);
  assert.equal(login, undefined, 'O login deve continuar funcionando usando hash.');

  const salvo = JSON.parse(context.localStorage.getItem('usuarios'));
  assert.notEqual(salvo['teste@teste.com'].senha, senhaOriginal, 'O localStorage não deve guardar a senha original.');
})();
