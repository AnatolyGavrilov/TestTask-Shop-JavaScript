const array = ['Вася', 'Петя', 'Андрей'];

const ruCollator = new Intl.Collator('ru-RU');
const sortRu = [...array].sort((a, b) => ruCollator.compare(a, b));
console.log(sortRu);
