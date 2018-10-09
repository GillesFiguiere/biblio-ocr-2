import Book from "../models/book";
import CD from "../models/cd";
import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { Subject } from "rxjs/Subject";

import * as firebase from 'firebase';


@Injectable()
export class ItemsService {

    booksList: Book[] = new Array();
    booksList$ = new Subject<Book[]>();

    cdsList: CD[] = new Array();
    cdsList$ = new Subject<CD[]>();

    constructor(private storage: Storage) { }

    emitBooksList() {
        this.booksList$.next(this.booksList.slice());
    }

    emitCDsList() {
        this.cdsList$.next(this.cdsList.slice());
    }

    setBookBorrower(index: number, borrowerName: string): any {
        if (this.booksList[index].isBorrowed)
            throw new Error("Ce livre ne peut pas être emprunté car il est déjà emprunté par " + this.booksList[index].borrower);

        this.booksList[index].borrower = borrowerName;
        this.saveBooksToLocalStorage();
        this.emitBooksList();
    }

    getBookBack(index: number): any {
        if (!this.booksList[index].isBorrowed)
            throw new Error("Ce livre ne peut pas être rendu car il n'est pas emprunté");

        this.booksList[index].borrower = "";
        this.saveBooksToLocalStorage();
        this.emitBooksList();
    }

    setCDBorrower(index: number, borrowerName: string): any {
        if (this.cdsList[index].isBorrowed)
            throw new Error("Ce CD ne peut pas être emprunté car il est déjà emprunté par " + this.cdsList[index].borrower);

        this.cdsList[index].borrower = borrowerName;
        this.saveCDsToLocalStorage();
        this.emitCDsList();
    }

    getCDBack(index: number): any {
        if (!this.cdsList[index].isBorrowed)
            throw new Error("Ce CD ne peut pas être rendu car il n'est pas emprunté");

        this.cdsList[index].borrower = "";
        this.saveCDsToLocalStorage();
        this.emitCDsList();
    }

    saveBooksToLocalStorage() {
        this.storage.set('Books', this.booksList);
    }

    saveCDsToLocalStorage() {
        this.storage.set('CDs', this.cdsList);
    }

    loadBooksFromLocalStorage() {
        this.storage.get('Books').then(
            (list) => {
                if (list && list.length) {
                    this.booksList.splice(0);
                    list.forEach(item => {
                        this.booksList.push(new Book(
                            item.title,
                            item.author,
                            item.publishDate,
                            item.isbn,
                            item.borrower
                        ));
                    });

                } else {
                    this.initializeBooks();
                    this.saveBooksToLocalStorage();
                }
                this.emitBooksList();
            }
        );
    }

    loadCDsFromLocalStorage() {
        this.storage.get('CDs').then(
            (list) => {
                if (list && list.length) {
                    this.cdsList.splice(0);
                    list.forEach(item => {
                        this.cdsList.push(new CD(
                            item.title,
                            item.author,
                            item.publishDate,
                            item.borrower
                        ));
                    });
                } else {
                    this.initializeCDs();
                    this.saveCDsToLocalStorage();
                }
                this.emitCDsList();
            }
        );
    }

    saveBooksToCloud() {
        return new Promise((resolve, reject) => {
            firebase.database().ref('books').set(this.booksList).then(
                (data: firebase.database.DataSnapshot) => {
                    resolve(data);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    loadBooksFromCloud() {
        return new Promise((resolve, reject) => {
            firebase.database().ref('books').once('value').then(
                (data: firebase.database.DataSnapshot) => {
                    this.booksList.splice(0);
                    data.val().forEach(item => {
                        this.booksList.push(new Book(
                            item.title,
                            item.author,
                            item.publishDate,
                            item.isbn,
                            item.borrower
                        ));
                    });;
                    this.emitBooksList();
                    this.saveBooksToLocalStorage();
                    resolve('Données récupérées avec succès !');
                }, (error) => {
                    reject(error);
                }
            );
        });
    }

    saveCDsToCloud() {
        return new Promise((resolve, reject) => {
            firebase.database().ref('cds').set(this.cdsList).then(
                (data: firebase.database.DataSnapshot) => {
                    resolve(data);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    loadCDsFromCloud() {
        return new Promise((resolve, reject) => {
            firebase.database().ref('cds').once('value').then(
                (data: firebase.database.DataSnapshot) => {
                    this.cdsList.splice(0);
                    data.val().forEach(item => {
                        this.cdsList.push(new CD(
                            item.title,
                            item.author,
                            item.publishDate,
                            item.borrower
                        ));
                    });;
                    this.emitCDsList();
                    this.saveBooksToLocalStorage();
                    resolve('Données récupérées avec succès !');
                }, (error) => {
                    reject(error);
                }
            );
        });
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