/*
 0 Obter um usuario
 1 Obter o numero de telefone de um usuario a partir de seu Id
 2 Obter o endereco do usuario pelo Id 
*/
// importamos um módulo interno do node.js
const util = require("util");
const getAddressAsync = util.promisify(getAddress);

const getUser = () => {
  // quando der algum problea -> reject(ERRO)
  // quando sucess -> RESOLV
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      return resolve({
        id: 1,
        name: "Ana",
        birthDate: new Date(),
      });
    }, 1000);
  });
};

function getPhone(idUsuario) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        phone: "1199002",
        ddd: 47,
      });
    }, 2000);
  });
}

function getAddress(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      street: "Rua dos bobos",
      number: 0,
    });
  }, 2000);
}

// 1o passso adicionar a palavra async -> automaticamente ela retornará uma Promise
main();
async function main() {
  try {
    console.time("medida-promise");
    const usuario = await getUser();
    // const telefone = await getPhone(usuario.id)
    // const endereco = await getAddressAsync(usuario.id)
    const resultado = await Promise.all([
      getPhone(usuario.id),
      getAddressAsync(usuario.id),
    ]);
    const phone = resultado[0];
    const address = resultado[1];

    console.log(`
            Name: ${usuario.name},
            Phone: ${phone.phone},
            Address: ${address.street} ${address.number}
        `);
    console.timeEnd("medida-promise");
  } catch (error) {
    console.error("DEU RUIM", error);
  }
}

