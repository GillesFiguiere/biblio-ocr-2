export default class Item {

    constructor(
        public title: string,
        public author: string,
        public publishDate: string,
        public borrower?: string
    ) {

    }

    get isBorrowed(): boolean {
        return this.borrower == null ? false : true;
    }
    
}