package com.ioanrobertscumpu.backend;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
public class TestController {

    @RequestMapping("/")
    public String home() {
        return "home";
    }

    @RequestMapping("/hello")
    public String hello() {
        return "hi";
    }

    @RequestMapping("/hi")
    public String hi() {
        return "hello";
    }
    
}
