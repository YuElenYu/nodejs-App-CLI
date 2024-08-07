const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

//Readline
// const readline = require("readline");
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
// Membuat folder data
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

//membuat file contact JSON
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

// const tulispertanyaan = (pertanyaan) => {
//   return new Promise((resolve, reject) => {
//     rl.question(pertanyaan, (nama) => {
//       resolve(nama);
//     });
//   });
// };
const loadContact = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

const simpanContacts = (nama, email, noHP) => {
  const contact = { nama, email, noHP };
  // const file = fs.readFileSync("data/contacts.json", "utf-8");
  // const contacts = JSON.parse(file);
  const contacts = loadContact();

  //validasi duplicate
  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log(chalk.red.inverse.bold("Contact sudah terdaftar, gunakan nama lain!"));
    return false;
  }

  //cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold("Email tidak valid!"));
      return false;
    }
  }

  //cek noHP
  if (!validator.isMobilePhone(noHP, "id-ID")) {
    console.log(chalk.red.inverse.bold("NO HP tidak valid!"));
    return false;
  }

  contacts.push(contact);
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

  console.log(chalk.blue.inverse.bold("Terimakasi sudah menginput data"));
};

const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.cyan.inverse.bold("DAFTAR KONTAK :"));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
  });
};

const detailContact = (nama) => {
  const contacts = loadContact();

  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

  if (!contact) {
    console.log(chalk.red.inverse.bold(`${nama} Tidak di Temukan !`));
    return false;
  }
  console.log(chalk.cyan.inverse.bold(contact.nama));
  console.log(contact.noHP);
  if (contact.email) {
    console.log(contact.email);
  }
};

const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());

  if (contacts.length === newContacts.length) {
    console.log(chalk.red.inverse.bold(`${nama} Tidak di Temukan !`));
    return false;
  }

  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));

  console.log(chalk.blue.inverse.bold(` data kontak ${nama} berhasil di hapus`));
};

module.exports = { simpanContacts, listContact, detailContact, deleteContact };
