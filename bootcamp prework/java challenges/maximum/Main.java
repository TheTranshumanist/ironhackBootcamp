package com.challenges.maximum;

public class Main {
    public static Integer maximum(Integer[] numList) {
        Integer max = numList[0];
        for (Integer el : numList) {
            if (el > max) {
                max = el;
            }
        }
        return max;
    }

    public static void main(String[] args) {
        Integer[] numberList = {0, 4, 10, 5, 11, 6, 1};
        System.out.println(maximum(numberList));
    }
}
