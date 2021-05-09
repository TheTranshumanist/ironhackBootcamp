package com.challenges.calculate_average;

public class Main {
    public static double average(Integer[] numList) {
        Integer sum = 0;
        for (Integer num: numList) {
            sum += num;
        }
        return sum.doubleValue() / numList.length;
    }

    public static void main(String[] args) {
        Integer[] numList = {3, 3, 3, 5, 5, 3, 5};
        System.out.format("%.4f", average(numList));
    }
}
