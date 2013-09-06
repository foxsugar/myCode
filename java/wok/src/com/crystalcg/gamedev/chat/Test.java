package com.crystalcg.gamedev.chat;

public class Test {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		MessageStore ms = new MessageStore();
		for(int i=0;i<100;i++){
			Message msg = new Message();
			msg.setContent("test content"+i);
			msg.setFrom(1);
			msg.setFromName("张磊");
			msg.setTo(2);
			byte b = 3;
			msg.setType(b);
			ms.add(msg);
		}
		
//		Message[] msgs = ms.get(1, 1, 2, 0, 0, 0, 20);
//		for(Message m:msgs){
//			System.out.println(m);
//		}
	}

}
