const inputTitle    = document.querySelector('#title') as HTMLInputElement;
const inputCost     =<HTMLInputElement>document.querySelector('#cost');
const inputCurrency =<HTMLInputElement>document.querySelector('#currency');
const bAdd          = document.querySelector('#bAdd') as HTMLButtonElement;
const expenses      = new Expenses('USD');
const files         = document.querySelectorAll('.fancy-file');
const span          =<HTMLElement>document.querySelector('.fancy-file__fancy-file-name span');

Array.from(files).forEach(
  (f: any) => {
    f.addEventListener('change', (e: Event) => {
       /* const span: HTMLElement = document.querySelector('.fancy-file__fancy-file-name span');  */
      if(f.files.length ==0){span.innerHTML='Ningun archivo seleccionado';
    }else if(f.files.length > 1){
      span.innerHTML =f.files.length + 'archivos seleccionados';
    }else{
      span.innerHTML = f.files[0].name;
    }
       
    });
  }
);


loadAPI();

bAdd!.addEventListener('click',e=>{
  if(inputTitle!.value !='' && inputCost!.value !='' && !isNaN(parseFloat(inputCost!.value))){
    const title = inputTitle!.value;
    const cost = inputCost!.value;
    const currency = <Currency> inputCurrency!.value;
    expenses.add({title:title, cost:{number:parseFloat(cost),currency:currency}});
    render();
  }else{
    alert('sorry!, please complete the info');
  }
});
function loadAPI(){
  fetch('../public/api/api.json')
  .then(res =>res.json())
  .then(json =>{
    const items:ExpenseItem[]=json.items;
    items.forEach(item =>{
      expenses.add(item);
    });
    render();
  });
}
function render():void{
  let html ='';
  expenses.getItems().forEach(item=>{
    const {id,title,cost}=item;
    html+=`
    <div class = "item">
    <div><span class = "currency" >${cost.currency}</span>${cost.number}</div>
    <div>${title}</div>
    <div> <button class = "bEliminar" data-id = "${id}">Eliminar</button> </div>
    </div>
    `;
  } );
  $('#items').innerHTML =html ;
  $('#display').textContent = expenses.getTotal() ;
  $('#displayup').textContent = expenses.getTotalUp();
  $('#displayup2').textContent = expenses.getTotalUp2();
  $('#displayup3').textContent = expenses.getTotalUp3();
  $$('.bEliminar').forEach(bEliminar =>{
    bEliminar.addEventListener('click', e =>{
      const id:string = (e.target as HTMLButtonElement).getAttribute('data-id') as string;
      expenses.remove(parseInt(id));
      render();
    });
  } );

}
function $(selector:string):HTMLElement{
  return document.querySelector(selector) as HTMLElement;
}
function $$(selector:string):NodeListOf<Element> {
  return document.querySelectorAll(selector) as NodeListOf<Element> ;
}


