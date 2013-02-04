package noumena.game.saolchat.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import noumena.game.saolchat.util.Util;



public class ContextListenerServlet implements ServletContextListener
{
	public ContextListenerServlet()
	{
		
	}
	@Override
	public void contextDestroyed(ServletContextEvent arg0)
	{
/*		try
		{
			LogUtil.writeLog(1, "shutdown tomcat");
			DwrGame.stopGame(12345);
		}
		catch (SAOLException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}*/
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0)
	{
		String param = arg0.getServletContext().getInitParameter("abc");
		if (param != null)
		{

		}
		
		Util.init();
		
/*		try
		{
			DwrGame.startGame();
			System.setProperty("yeepaytest", Util.getLogPath()+"../");
		}
		catch (SAOLException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}*/
	}
}
