const formEl = document.querySelector("#bookForm");
const bookListEl = document.querySelector("#bookList");

class Db {
  constructor(books) {
    this.db = books;
  }
  create(newBook) {
    this.db = [...this.db, newBook];
  }
  render() {
    bookListEl.innerHTML = "";
    this.db.map((item) => {
      const template = `
            <!-- Book -->
            <div class="w-[300px] border border-1 border-slate-800">
                <img
                class="w-full"
                src="${item.imgURL}"
                alt="Zero to One"
                />
                <div class="p-3">
                <h2 class="text-3xl">${item.title}</h2>
                <h3 class="text-xl">${item.author}</h3>
                <p>
                    ${item.desc}
                </p>
                </div>
            </div>
        `;
      bookListEl.innerHTML += template;
    });
  }
}

const database = new Db([]);

class Book {
  constructor(imgURL, title, author, desc) {
    this.id = database[database.length - 1]?.id + 1 || 0;
    this.imgURL = imgURL;
    this.title = title;
    this.author = author;
    this.desc = desc;
  }
  save() {
    database.create(this);
  }
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const [title, author, imgURL, desc] = e.target;
  const newBook = new Book(imgURL.value, title.value, author.value, desc.value);
  newBook.save();
  database.render();
});
