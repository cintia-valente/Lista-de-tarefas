import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode: String = 'list';
  public todos: Todo[] = []; //retorna [], tipo any é um tipo genérico, pode ser colocado quqlquer coisa na variável
  public title: String = 'Minhas tarefas'; 
  public form: FormGroup; //criar formulário
  //FormBuilder: compor formulário

  //Criar tarefas, é executado sempre q a class AppComponent inicia
  constructor(private fb: FormBuilder) { 
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required,
      ])]
    });
    this.load();
  }

  add() {
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clear();
  }
  //form.control: tem acesso a todos os controles
  //que estão listados em title

  clear() {
    this.form.reset();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo); //capturar índice de todo
    if (index !== -1) //se encontrou o ind na lista
      this.todos.splice(index, 1); //remove o item do ind 1
    this.save();
  }

  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }

  markAsUndone(todo: Todo){
    todo.done = false;
    this.save();
  }

  //Salvar os todos no localStorage, para não perder ao atualizar a página
  save() {
    const data = JSON.stringify(this.todos); //converte um JSON em string
    localStorage.setItem('todos', data); //envia os itens
    this.mode='list';
  }

  //Ler os todos do localStorage
  load() {
    const data = localStorage.getItem('todos'); //busca os itens
    if (data) {
      this.todos = JSON.parse(data); //converte uma string em JSON
    } else
        this.todos = [];
    
  }

  changeMode(mode: string) {
    this.mode = mode;
  }
}
