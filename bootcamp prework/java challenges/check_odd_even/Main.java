package com.challenges.check_odd_even;

public class Main {
    public static void checkOddEven(int num) {
        if (num % 2 == 0) {
            System.out.println("EVEN NUMBER");
        }
        else {
            System.out.println("ODD NUMBER");
        }
    }

    public static void main(String[] args) {
        for (int i = 0; i < 6; i++) {
            checkOddEven(i);
        }
    }
}
