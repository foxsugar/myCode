package noumena.game.saolchat.listener;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

public class SessionListenerServlet implements HttpSessionListener
{

	@Override
	public void sessionCreated(HttpSessionEvent arg0)
	{
		// TODO Auto-generated method stub
		
	}

	@Override
	public void sessionDestroyed(HttpSessionEvent arg0)
	{
/*		// TODO Auto-generated method stub
		HttpSession session = arg0.getSession();
		InstanceId kid = (InstanceId) session.getAttribute("kid");
		if (kid != null)
		{
			SAOLGame game = SAOLGame.getGame();
			session.setAttribute(King.SESSION_KEY_LOGOUTTYPE, King.LOGOUT_TYPE_TIMEOUT);
			game.sessionOutLogoutGame(kid, session);
		}*/
	}

}
