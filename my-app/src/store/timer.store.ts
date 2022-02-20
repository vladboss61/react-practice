import { makeAutoObservable } from "mobx"
import { Data } from "../models/Data.model"

export class DifficultTimer {

    secondsPassed = 0;


        dataArray: Data[] = [{
            id: 1,
            avatar: "stub",
            first_name: "First Product Name (Pepsi)",
            last_name: "Last Product Name",
            email: 'pepsi@google.com'
        },
        {
            id: 2,
            avatar: "stub",
            first_name: "First Product Name 2 (Cola)",
            last_name: "Last Product Name 2",
            email: 'colacola@google.com'
        }];

    basket: Data[] = []
  
    constructor() {
        makeAutoObservable(this)
    }

    increase() {
        this.secondsPassed += 1
    }

    addToBasket(data: Data) {
        this.basket.push(data);
    }

    removeFromBasket(id?: number) {
        if (!id) {
            return;
        }

        const index = this.basket.findIndex(x => x.id === id);

        if (index === -1) {
            return;
        }

        this.basket.splice(index, 1);
    }

    addData(data: Data) {
        this.dataArray.push(data);
    }
  
    reset() {
        this.secondsPassed = 0
    }
  }