import Book from "../models/book";
import CD from "../models/cd";
import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';


@Injectable()
export class ItemsService {

    constructor(private storage: Storage) { }

    booksList: Book[];

    cdsList: CD[];

    setBookBorrower(index: number, borrowerName: string): any {
        if (this.booksList[index].isBorrowed)
            throw new Error("Ce livre ne peut pas être emprunté car il est déjà emprunté par " + this.booksList[index].borrower);

        this.booksList[index].borrower = borrowerName;
        this.saveCDs;
    }

    getBookBack(index: number): any {
        if (!this.booksList[index].isBorrowed)
            throw new Error("Ce livre ne peut pas être rendu car il n'est pas emprunté");

        this.booksList[index].borrower = null;
        this.saveCDs;
    }

    setCDBorrower(index: number, borrowerName: string): any {
        if (this.cdsList[index].isBorrowed)
            throw new Error("Ce CD ne peut pas être emprunté car il est déjà emprunté par " + this.cdsList[index].borrower);

        this.cdsList[index].borrower = borrowerName;
        this.saveCDs;
    }

    getCDBack(index: number): any {
        if (!this.cdsList[index].isBorrowed)
            throw new Error("Ce CD ne peut pas être rendu car il n'est pas emprunté");

        this.cdsList[index].borrower = null;
        this.saveCDs;
    }

    saveBooks() {
        this.storage.set('Books', this.booksList);
    }

    saveCDs() {
        this.storage.set('CDs', this.cdsList);
    }

    loadBooks() {
        this.storage.get('Books').then(
            (list) => {
                if (list && list.length) {
                    this.booksList = list.slice();
                } else {
                    this.initializeBooks();
                    this.saveBooks();
                }
            }
        );
    }

    loadCDs() {
        this.storage.get('CDs').then(
            (list) => {
                if (list && list.length) {
                    this.cdsList = list.slice();
                } else {
                    this.initializeCDs();
                    this.saveCDs();
                }
            }
        );
    }

    initializeBooks(): any {
        this.booksList.push(new Book(
            "The Time Machine",
            "H. G. Wells",
            "1995-04-03",
            "0486284727"
        ));

        this.booksList.push(new Book(
            "Do Androids Dream of Electric Sheep?",
            "Philip K. Dick",
            "1996-05-28",
            "5533117542",
            "Gilles"
        ));

        this.booksList.push(new Book(
            "De la Terre à La Lune",
            "Jules Verne",
            "1976-03-01",
            "2253006319"
        ));
    }

    initializeCDs(): any {
        this.cdsList.push(
            new CD(
                "Showbiz",
                "Muse",
                "1999"
            )
        );

        this.cdsList.push(
            new CD(
                "Origin of Symmetry",
                "Muse",
                "2001"
            )
        );

        this.cdsList.push(
            new CD(
                "The 2nd Law",
                "Muse",
                "2012",
                "Valérie"
            )
        );
    }

}