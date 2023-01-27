type Currency = 'MXN'| 'USD'|'EUR';/* Tipos de datos explicitos */
/* TypeScript permite definir interfaces para establecer un 
contrato entre objetos, las cuales no existen en javascript */
interface Price{
  number:number,
  currency:Currency
}
/* interface, declaración de tipo de objeto de datos */
interface ExpenseItem{
  id?:number,
  title:string,
  cost:Price
}

interface IExpenses{
  expenses:ArrayList<ExpenseItem>,
  finalCurrency:Currency,
  add(item:ExpenseItem):boolean,/* (necesito un elemento de tipo:) */
  get(index:number):ExpenseItem | null,/* va a regresar una variable de tipo ExpenseItem */
  getTotal():string,
  getTotalUp():string,
  remove(id:number):boolean,/* remover un item o elemento */
}
/* Lo anterior no existe en expenses.js */

class Expenses implements IExpenses{
  expenses:ArrayList<ExpenseItem>;
  finalCurrency:Currency;
  private count:number = 0;
  
/* iniciar variables */
  constructor(currency:Currency){
    this.expenses = new ArrayList<ExpenseItem>();
    this.finalCurrency = currency;
  }

  add(item:ExpenseItem):boolean{
    item.id = this.count;
    this.count++;
    this.expenses.add(item);
    return true;
  }

  get(index:number):ExpenseItem|null{
    return this.expenses.get(index);
  }

  getItems():ExpenseItem[]{
    return this.expenses.getAll();
  }

  sumExpenses(): number {
    const total : number = this.expenses.getAll().reduce((acc:number,item:ExpenseItem)=>{
      return acc += this.convertCurrency(item, this.finalCurrency);
    }, 0);
    return total;
  }

  getTotal():string{
    const total = this.sumExpenses();
    return `${this.finalCurrency} $${total.toFixed(2).toString()}`;
  }
  getTotalUp(): string {
    const total = this.sumExpenses();
    const totalUp : number = total*18.60;/* PESOS MEX */
    return ` MXN $${totalUp.toFixed(2).toString()}`;
  }
  getTotalUp2(): string {
    const total = this.sumExpenses();
    const totalUp2 : number = total*(18.60/20.55);/* EUROS */
    return ` EUR $${totalUp2.toFixed(2).toString()}`;
  }
  getTotalUp3(): string {
    const total = this.sumExpenses();
    const totalUp3 : number = total*(18.60/14.04);/* CANADIENSES */
    return ` CAN $${totalUp3.toFixed(2).toString()}`;
  }

  remove (id: number):boolean{
    const items : ExpenseItem[] =this.getItems().filter(item =>{
      return item.id !=id
    });
    this.expenses.createFrom(items);
    return true;
  }

  private convertCurrency(item : ExpenseItem, currency:Currency):number{
    switch(item.cost.currency){
      case 'USD':
      switch(currency){
        case 'MXN':
        return item.cost.number*22;/* 1Dolar=MXN$20 */
        break;
        default:
        return item.cost.number;
      }
      break;

      case 'MXN':
      switch(currency){
        case 'USD':
        return item.cost.number/20;
        break;
        default:
        return item.cost.number;
      }
      break;

      case 'EUR':
      switch(currency){
        case 'MXN':
        return item.cost.number*22;
        break;
        default:
        return item.cost.number;
      }
      break;

      case 'MXN':
      switch(currency){
        case 'EUR':
        return item.cost.number/22;
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
class ArrayList<T>{
  private items:T[] = [];/* T es un arreglo[] "= iniciado" en vacio [], requiere asignarse a un constructor */
  add(item:T){
    this.items.push(item);
  }
  get(index:number):T|null{
    const item:T[] = this.items.filter( (x:T, i) =>{
      return i === index;
    });
    if(item.length === 0){
      return null;
    }else{
      return item[0];
    }
  }

  createFrom(value:T[]):void{
      this.items = [...value];
  }

  getAll():T[]{
      return this.items;
  }

}


















































































