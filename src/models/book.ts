import Item from './item';

export default class Book extends Item {

    public isbn: string;

    constructor(
        title: string,
        author: string,
        publishDate: string,
        isbn: string,
        borrower?: string
    ) {
        super(title, author, publishDate, borrower);
        this.isbn = isbn;
    }
}