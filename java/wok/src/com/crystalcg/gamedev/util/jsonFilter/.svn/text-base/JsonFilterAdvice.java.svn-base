package com.crystalcg.gamedev.util.jsonFilter;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.reflect.MethodSignature;
import org.codehaus.jackson.map.ObjectMapper;

public class JsonFilterAdvice {

	public Object doAround(ProceedingJoinPoint pjp) throws Throwable {
		MethodSignature msig = (MethodSignature) pjp.getSignature();
		DynamicJsonFilter annotation = msig.getMethod().getAnnotation(
		DynamicJsonFilter.class);
		DynamicJsonFilters annotations = msig.getMethod().getAnnotation(
		DynamicJsonFilters.class);
		if (annotation == null && annotations == null) {
			return pjp.proceed();
		}
		ObjectMapper mapper = new ObjectMapper();
		if (annotation != null) {
			Class<?> mixin = annotation.mixin();
			Class<?> target = annotation.target();
			if (target != null) {
				mapper.getSerializationConfig().addMixInAnnotations(target, mixin);
			} else {
				mapper.getSerializationConfig().addMixInAnnotations(
				msig.getMethod().getReturnType(), mixin);
			}
		}
		if (annotations != null) {
			DynamicJsonFilter[] filters = annotations.value();
			for (DynamicJsonFilter filter : filters) {
				Class<?> mixin = filter.mixin();
				Class<?> target = filter.target();
				if (target != null) {
					mapper.getSerializationConfig().addMixInAnnotations(target,
					mixin);
				} else {
					mapper.getSerializationConfig().addMixInAnnotations(
					msig.getMethod().getReturnType(), mixin);
				}
			}
		}
		try {
			mapper.writeValue(WebContext.getInstance().getResponse().getOutputStream(), pjp.proceed());
		} catch (Exception ex) {
			throw new RuntimeException(ex);
		}
		return null;
	}
}
