import java.util.Scanner;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {

    static void inPhanTuMang(int[] arrNum) {
        for (int i = 0; i < arrNum.length; i++) {
            System.out.println(arrNum[i]);
        }
    }

    static int tongCacPtuMang(int[] arrNum) {
        int sum = 0;
        for (int i = 0; i < arrNum.length; i++) {
            sum += arrNum[i]; // sum = sum + arrNum1[i];
        }
        return sum;
    }

    //    hàm tìm max, min trong mảng
//    input: int[] arrNum
//    output: [max, min]
    static int[] maxMinArray(int[] arrNum1) {
        int max = arrNum1[0];
        int min = arrNum1[0];
        int[] tupleMaxMin = new int[2];
        for (int i = 1; i < arrNum1.length; i++) {
            if (arrNum1[i] > max) {
                max = arrNum1[i];
            }
            if(arrNum1[i] < min) {
                min = arrNum1[i];
            }
        }
        tupleMaxMin[0] = max;
        tupleMaxMin[1] = min;
        return tupleMaxMin;
    }


    public static void main(String[] args) {
        //TIP Press <shortcut actionId="ShowIntentionActions"/> with your caret at the highlighted text
        // to see how IntelliJ IDEA suggests fixing it.
//        mảng
//        mảng số nguyên
//        cách 1: tạo mảng số nguyên và
//        gán giá trị sẵn
        int[] arrNum = {1, 2, 3, 4, 5, 6, 7};
//                      0  1  2  3  4  5  6
        inPhanTuMang(arrNum);

//        2. nhap tung phan tu cua mang
//        phan 1: khai bao so luong phan tu cua mang
//        phan 2: nhap tung phan tu cua mang
        int n;
        Scanner scan = new Scanner(System.in);
        System.out.println("Moi ban nhap so luong phan tu cua mang: ");
        n = scan.nextInt();
//        cap phat vung nho gom n o nho lien ke nhau
        int[] arrNum1 = new int[n];
        for (int i = 0; i < n; i++) {
            System.out.println("Phan tu thu " + (i + 1));
            arrNum1[i] = scan.nextInt();
        }
//
//        System.out.println("Cac gia tri trong arrNum1 la: ");
//        for (int i = 0; i < n; i++) {
//            System.out.println(arrNum1[i]);
//        }

//        bai 1: tinh tong cac so co trong mang
        int sum = tongCacPtuMang(arrNum1);
        System.out.println("Tong cac so trong mang la: " + sum);

//        bai 2: tim phan tu min, max co trong mang
        int max = maxMinArray(arrNum1)[0];
        int min = maxMinArray(arrNum1)[1];
        System.out.println("So lon nhat la: " + max);
        System.out.println("So nho nhat la: " + min);


        //    bai 4: tim so lon thu hai trong mang
//    VD: [1, 2, 3, 4, 5]
//    output: 4
        int maximum = Integer.MIN_VALUE;
        int secondMax = Integer.MIN_VALUE;
        for (int i = 0; i < n; i++) {
            if (arrNum1[i] > maximum) {
                secondMax = maximum;
                maximum = arrNum1[i];
            } else if (arrNum1[i] > secondMax && arrNum1[i] < maximum) {
                secondMax = arrNum1[i];
            }
        }
        System.out.println("So lon thu hai la: " + secondMax);

//        bai 5: xoa nguyen am (u,e,o,a,i)
//        input: Cybersoft
//        output: Cbrsft
        String str = "Cybersoft";
        String result = "";
//        String la tap hop cac ky tu (character), mang cac ky tu (char)
//        String <=> char[]
        for(int i = 0; i < str.length(); i++) {
//            chuyen cac ky tu ve viet thuong
            char c = str.charAt(i); // lay ky tu thu i trong mang ky tu
            char lowerC = Character.toLowerCase(c);

//            if(lowerC != 'u' && lowerC != 'e' && lowerC != 'o' && lowerC != 'a' && lowerC != 'i') {
//                result += c;
//            }
//            cach 2:
//            if ("ueoai".contains(String.valueOf(lowerC)) == false) {
//                result += c;
//            }

//            cach 3: indexOf cua String
//            khong tim thay => -1
//            tim thay => index
            if ("ueoai".indexOf(Character.toString(lowerC)) == -1) {
                result += c;
            }

//            cach khac: viet theo kieu Collection trong java
        }
        System.out.println(result);

    }

//    bai 3: nhap so can tim. In ra vi tri cua so can tim, neu khong tim thay thi in ra -1
//    VD1: [1, 2, 3, 4, 5], target =3
//    output: 2
//    VD2: [1, 2, 3, 4, 5], target = 6
//    output: -1



}