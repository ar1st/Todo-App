package com.aris.todo.restfulwebservices.todo;


import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@Service
public class TodoHardCodedService {

    private static List<Todo> todos = new ArrayList<>();
    private static int idCounter =0;
    static {
        todos.add(new Todo(++idCounter, "aris", "Learn to Dance",new Date(), false));
        todos.add(new Todo(++idCounter, "aris", "Learn microservices",new Date(), false));
        todos.add(new Todo(++idCounter, "aris", "Learn React",new Date(), false));
        todos.add(new Todo(++idCounter, "aris", "aadawda React",new Date(), false));
    }

    public List<Todo> findAll(){
        return todos;
    }

    public Todo deleteById(long id){
        Todo todo = findById(id);

        if ( todo == null) return null;
        todos.remove(todo);
        return todo;
    }

    public Todo findById(long id) {
        for (Todo todo:todos){
            if (todo.getId() == id)
                return todo;
        }
        return null;
    }


}
