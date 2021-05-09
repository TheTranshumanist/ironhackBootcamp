package com.challenges.print_number;

public class Main {
    public static String printNumberInWordIf(int num) {
        if (num == 1) {
            return "ONE";
        }
        if (num == 2) {
            return "TWO";
        }
        if (num == 3) {
            return "THREE";
        }
        if (num == 4) {
            return "FOUR";
        }
        if (num == 5) {
            return "FIVE";
        }
        if (num == 6) {
            return "SIX";
        }
        if (num == 7) {
            return "SEVEN";
        }
        if (num == 8) {
            return "EIGHT";
        }
        if (num == 9) {
            return "NINE";
        }
        return "OTHER";
    }

    public static String printNumberInWordSwitch(int num) {
        return switch (num) {
            case 1 -> "ONE";
            case 2 -> "TWO";
            case 3 -> "THREE";
            case 4 -> "FOUR";
            case 5 -> "FIVE";
            case 6 -> "SIX";
            case 7 -> "SEVEN";
            case 8 -> "EIGHT";
            case 9 -> "NINE";
            default -> "OTHER";
        };
    }

    public static void main(String[] args) {
        int[] nums = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
        for (int num : nums) {
            System.out.println(printNumberInWordIf(num));
        }
        System.out.println("\n");
        for (int num : nums) {
            System.out.println(printNumberInWordSwitch(num));
        }
    }
}
