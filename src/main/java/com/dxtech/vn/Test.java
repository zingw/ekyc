package com.dxtech.vn;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Test {

    private static final List<Student> students = new ArrayList<>();

    public static void main(String[] args) {
        List<Integer> father = Arrays.asList(1, 2, 3, 4, 5, 6, 7);
        List<Integer> son = Arrays.asList(1, 2, 2, 3, 4, 9);

        System.out.println(son.stream().anyMatch(father::contains));
    }
}

class Student {

    @Override
    public String toString() {
        return "Student{" + "name='" + name + '\'' + ", age=" + age + '}';
    }

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    private String name;
    private int age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
