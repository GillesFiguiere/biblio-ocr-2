export default class Item {

    public borrower = "";

    constructor(
        public title: string,
        public author: string,
        public publishDate: string,
        borrower?: string
    ) {
        this.borrower = (borrower == null ? "" : borrower);
    }

    get isBorrowed(): boolean {
        return this.borrower == null || this.borrower == "" ? false : true;
    }

}