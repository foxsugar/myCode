package com.crystalcg.gamedev.util;

import java.util.Random;

public class RandomFunc {
	
	
	final private static Random rand = new Random();
	/**
	 * 
	 * 随机获取 minNum和maxNum之间的值，包括minNum和maxNum,以时间为随机种子
	 * @param minNum
	 * @param maxNum
	 * @return
	 */
	public static int randomNum(int minNum,int maxNum){
		int resultNum = rand.nextInt(maxNum-minNum+1);
		resultNum = resultNum+minNum;
		return resultNum;
	}
	/**
	 * 判断操作是否成功，参数为操作成功率,操作成功返回true,一般用户装备
	 * @param percent 参数为小于1的数，精度为0.01%
	 * @return
	 */
	public static boolean isSuccessful(double percent){
		int intPercent = (int)(percent*10000);
		int resultNum = rand.nextInt(10000);
		return resultNum<intPercent;
	}
	/**
	 * 判断操作是否成功，用于技能触发
	 * @param percent 参数为0到100的整数，精度为1%
	 * @return
	 */
	public static boolean isSuccessfulForSkill(int percent){
		int resultNum = rand.nextInt(100);
		return resultNum<percent;
	}
	/**
	 * 判断操作是否成功，高精度概率，精度为0.00001%
	 * @param percent 参数为100到0.00001的数，精度为0.00001%
	 * @return
	 */
	public static boolean isSuccessfulPrecision(double percent){
		int intPercent = (int)(percent*100000);
		int resultNum = rand.nextInt(10000000);
		return resultNum<intPercent;
	}
	/**
	 * 4种概率不同的装备，看最终产生哪个，4个参数为4个装备的概率，4个参数的和为100；
	 * @param perc1
	 * @param perc2
	 * @param perc3
	 * @param perc4
	 * @return
	 */
	public static int whichSuccesss(int perc1,int perc2,int perc3,int perc4){
		if(perc1+perc2+perc3+perc4 != 100){
			throw new RuntimeException("概率不为1");
		}
		int c=rand.nextInt(100);
		if(c<perc1){
			return 1;
		}else if(c<perc1+perc2){
			return 2;
		}else if(c<perc1+perc2+perc3){
			return 3;
		}else{
			return 4;
		}
	}
	public static int whichQuility(double perc1,double perc2,double perc3,double perc4,double perc5,double perc6){
		int intPerc1 = (int)(perc1*100000);
		int intPerc2 = (int)(perc2*100000);
		int intPerc3 = (int)(perc3*100000);
		int intPerc4 = (int)(perc4*100000);
		int intPerc5 = (int)(perc5*100000);
		int intPerc6 = (int)(perc6*100000);
		if(intPerc1+intPerc2+intPerc3+intPerc4+intPerc5+intPerc6 != 100000){
			throw new RuntimeException("概率不为1");
		}
		int c=rand.nextInt(100000);
		if(c<intPerc1){
			return 1;
		}else if(c<intPerc1+intPerc2){
			return 2;
		}else if(c<intPerc1+intPerc2+intPerc3){
			return 3;
		}else if(c<intPerc1+intPerc2+intPerc3+intPerc4){
			return 4;
		}else if(c<intPerc1+intPerc2+intPerc3+intPerc4+intPerc5){
			return 5;
		}else{
			return 6;
		}
	}
	public static int whichSuccesssForHero(int perc1,int perc2,int perc3,int perc4,int perc5){
		if(perc1+perc2+perc3+perc4+perc5 != 10000){
			throw new RuntimeException("概率不为1");
		}
		int c=rand.nextInt(10000);
		if(c<perc1){
			return 1;
		}else if(c<perc1+perc2){
			return 2;
		}else if(c<perc1+perc2+perc3){
			return 3;
		}else if(c<perc1+perc2+perc3+perc4){
			return 4;
		}
		else{
			return 5;
		}
	}
	public static int whichSuccesssForHeroGift(int perc1,int perc2,int perc3){
		if(perc1+perc2+perc3 != 100){
			throw new RuntimeException("概率不为1");
		}
		int c=rand.nextInt(100);
		if(c<perc1){
			return 1;
		}else if(c<perc1+perc2){
			return 2;
		}else{
			return 3;
		}
		
	}
	/**
	 * 获取随机数
	 * @param number
	 * @return
	 */
	public static int getRandomNum(int number){
		return rand.nextInt(number);
	}

}
