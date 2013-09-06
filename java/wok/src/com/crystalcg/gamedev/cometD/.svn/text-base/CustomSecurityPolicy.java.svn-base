package com.crystalcg.gamedev.cometD;

import org.cometd.bayeux.server.BayeuxServer;
import org.cometd.bayeux.server.ServerChannel;
import org.cometd.bayeux.server.ServerMessage;
import org.cometd.bayeux.server.ServerSession;
import org.cometd.server.DefaultSecurityPolicy;

public class CustomSecurityPolicy extends DefaultSecurityPolicy{

	@Override
	public boolean canCreate(BayeuxServer server, ServerSession session,
			String channelId, ServerMessage message) {
		// TODO Auto-generated method stub
		return super.canCreate(server, session, channelId, message);
	}

	@Override
	public boolean canHandshake(BayeuxServer server, ServerSession session,
			ServerMessage message) {
		// TODO Auto-generated method stub
		return super.canHandshake(server, session, message);
	}

	@Override
	public boolean canPublish(BayeuxServer server, ServerSession session,
			ServerChannel channel, ServerMessage message) {
		// TODO Auto-generated method stub
		return super.canPublish(server, session, channel, message);
	}

	@Override
	public boolean canSubscribe(BayeuxServer server, ServerSession session,
			ServerChannel channel, ServerMessage message) {
		// TODO Auto-generated method stub
		return super.canSubscribe(server, session, channel, message);
	}
	
}
