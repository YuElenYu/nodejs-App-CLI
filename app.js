const { fchown } = require("fs");
const { describe } = require("node:test");
const { type } = require("os");
const yargs = require("yargs");
const contacts = require("./contacts");

yargs
  .command({
    command: "add",
    describe: "Menambahkan Comtact baru",
    builder: {
      nama: {
        describe: "Nama Lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: false,
        type: "string",
      },
      noHP: {
        describe: "Nomor Handphone",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      contacts.simpanContacts(argv.nama, argv.email, argv.noHP);
    },
  })
  .demandCommand();

//Menampilkan kontak
yargs.command({
  command: "list",
  describe: "Menampilkan semua nama dan nomor HP",
  handler() {
    contacts.listContact();
  },
});

//  menampilkan detail sebuah kontak
yargs.command({
  command: "detail",
  describe: "Menampilkan Sebuah Detail Kontak Berdasarkan Nama",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.detailContact(argv.nama);
  },
});

// menghapus kontak berdasarkan nama
yargs.command({
  command: "delete",
  describe: "Menghapus Sebuah Kontak Berdasarkan Nama",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.deleteContact(argv.nama);
  },
});

yargs.parse();

// mengambil argumen dari CLI
// const command = process.argv[2];
// if(command === 'add') {

// } else if( command === 'remove') {

// }else if(command === 'list') {

// }

// console.log(yargs.argv);

//ellnyu_0
// const contacts = require("./contacts.js");

// const main = async () => {
//   const nama = await contacts.tulispertanyaan("Masukan nama anda :");
//   const email = await contacts.tulispertanyaan("Masukan Email anda :");
//   const noHP = await contacts.tulispertanyaan("Masukan noHP anda :");

//   contacts.simpanContacts(nama, email, noHP);
// };
// main();
