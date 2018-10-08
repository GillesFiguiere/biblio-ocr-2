import Item from './item';

export default class CD extends Item {

    constructor(
        title: string,
        author: string,
        publishDate: string,
        borrower?: string
    ) {
        super(title, author, publishDate, borrower);
    }

}