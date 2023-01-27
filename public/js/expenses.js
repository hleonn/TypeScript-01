"use strict";
/* Lo anterior no existe en expenses.js */
class Expenses {
    /* iniciar variables */
    constructor(currency) {
        this.count = 0;
        this.expenses = new ArrayList();
        this.finalCurrency = currency;
    }
    add(item) {
        item.id = this.count;
        this.count++;
        this.expenses.add(item);
        return true;
    }
    get(index) {
        return this.expenses.get(index);
    }
    getItems() {
        return this.expenses.getAll();
    }
    sumExpenses() {
        const total = this.expenses.getAll().reduce((acc, item) => {
            return acc += this.convertCurrency(item, this.finalCurrency);
        }, 0);
        return total;
    }
    getTotal() {
        const total = this.sumExpenses();
        return `${this.finalCurrency} $${total.toFixed(2).toString()}`;
    }
    getTotalUp() {
        const total = this.sumExpenses();
        const totalUp = total * 18.60; /* PESOS MEX */
        return ` MXN $${totalUp.toFixed(2).toString()}`;
    }
    getTotalUp2() {
        const total = this.sumExpenses();
        const totalUp2 = total * (18.60 / 20.55); /* EUROS */
        return ` EUR $${totalUp2.toFixed(2).toString()}`;
    }
    getTotalUp3() {
        const total = this.sumExpenses();
        const totalUp3 = total * (18.60 / 14.04); /* CANADIENSES */
        return ` CAN $${totalUp3.toFixed(2).toString()}`;
    }
    remove(id) {
        const items = this.getItems().filter(item => {
            return item.id != id;
        });
        this.expenses.createFrom(items);
        return true;
    }
    convertCurrency(item, currency) {
        switch (item.cost.currency) {
            case 'USD':
                switch (currency) {
                    case 'MXN':
                        return item.cost.number * 22; /* 1Dolar=MXN$20 */
                        break;
                    default:
                        return item.cost.number;
                }
                break;
            case 'MXN':
                switch (currency) {
                    case 'USD':
                        return item.cost.number / 20;
                        break;
                    default:
                        return item.cost.number;
                }
                break;
            case 'EUR':
                switch (currency) {
                    case 'MXN':
                        return item.cost.number * 22;
                        break;
                    default:
                        return item.cost.number;
                }
                break;
            case 'MXN':
                switch (currency) {
                    case 'EUR':
                        return item.cost.number / 22;
                        break;
                    default:
                        return item.cost.number;
                }
                break;
            default:
                return 0;
        }
    }
}
/* ArrayList de tipo genérico con T */
class ArrayList {
    constructor() {
        this.items = []; /* T es un arreglo[] "= iniciado" en vacio [], requiere asignarse a un constructor */
    }
    add(item) {
        this.items.push(item);
    }
    get(index) {
        const item = this.items.filter((x, i) => {
            return i === index;
        });
        if (item.length === 0) {
            return null;
        }
        else {
            return item[0];
        }
    }
    createFrom(value) {
        this.items = [...value];
    }
    getAll() {
        return this.items;
    }
}
