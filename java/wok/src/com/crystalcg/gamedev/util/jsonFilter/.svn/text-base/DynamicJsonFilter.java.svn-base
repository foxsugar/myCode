package com.crystalcg.gamedev.util.jsonFilter;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)  
public @interface DynamicJsonFilter {
	Class<?> mixin() default Object.class;  
	 Class<?> target() default Object.class;  
}
