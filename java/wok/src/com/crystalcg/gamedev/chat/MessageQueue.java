package com.crystalcg.gamedev.chat;


public class MessageQueue {
	
	private Message[] array;
	private int size;
	private int buffer_size;
	private int max_size = 500;
	public int start;
	public int end;
	
	public MessageQueue(int size){
		if(size<=0 || size>max_size){
			throw new RuntimeException("wrong queue size:"+size);
		}
		this.size = size;
		this.buffer_size = size*2;
		array = new Message[buffer_size];
	}
	
	public MessageQueue(){
		this(100);
	}
	
	public void add(Message message){
		if(end<buffer_size){
			array[end] = message;
			end++;
			if(end>size){
				start++;
			}
		}else{
			if(end%size==0){
				System.arraycopy(array, size, array, 0, size);
			}
			array[end%size+size] = message;
			end++;
			start++;
		}
	}
	
	public Message[] get(ModifyIndex idx){
		int index = idx.getIndex();
		Message[] ret;
		if(index < start){//start大于0，则必定偏移
			ret = new Message[size];
			int begin = start%size;
			if(begin == 0){
				begin = size;
			}
			idx.setIndex(begin+size);
			System.arraycopy(array, begin, ret, 0, size);
		}else{
			int length = end - index;
			if(length<=0){
				return new Message[]{};
			}
			ret = new Message[end - index];
			int srcPos = start%size+index-start;
			idx.setIndex(srcPos+ret.length);
			System.arraycopy(array, srcPos, ret, 0, ret.length);
		}
		return ret;
	}
	
	public int getEnd(){
		return end;
	}
	
//	public static void main(String[] args){
//		MessageQueue mq = new MessageQueue(10);
//		for(int i=0;i<111;i++){
//			mq.set(i);
//			int[] ma = mq.get(31);
//			System.out.print(ma.length+","+mq.start+","+mq.end+",[");
//			for(int m : ma){
//				System.out.print(m+",");
//			}
//			System.out.println("]");
//		}
//	}
}
