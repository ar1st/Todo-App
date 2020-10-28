/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.aris.rest.webservices.restfulwebservices;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author aris
 */

    @RestController
    @CrossOrigin(origins="http://localhost:4200")
    public class HelloWorldController {

       // @RequestMapping(method=RequestMethod.GET, path="/hello-world")
        @GetMapping(path="/hello-world")
        public String helloWord(){
        return "Hello dawda";
    }
    
    @GetMapping(path = "/hello-world-bean")
    public HelloWorldBean helloWorldBean(){
        return new HelloWorldBean("Hello World");
    }
    
    @GetMapping(path="/hello-world/path-variable/{name}")
    public HelloWorldBean helloWorldPathVariable(@PathVariable String name){
        //throw new RuntimeException("something went wrong");
        return new HelloWorldBean("Hello World " + name);
    }
}
