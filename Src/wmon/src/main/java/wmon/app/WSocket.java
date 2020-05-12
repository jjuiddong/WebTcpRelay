package wmon.app;

import java.io.IOException;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.json.simple.*;
import org.json.simple.parser.*;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Component;


@Component
@ServerEndpoint(value="/wsock")
public class WSocket {
	private Session session;	
	private String name = "monitor"; // monitor or simulator 
	public static Set<WSocket> _listeners = new CopyOnWriteArraySet<>();
	private static int _onlineCount = 0;

	
	@OnOpen
	public void onOpen(Session session) 
	{
		_onlineCount++;
		this.session = session;
		_listeners.add(this);
		System.out.println("onOpen called, userCount:" + _onlineCount);
	}
	
	@OnClose
	public void onClose(Session session)
	{
		_onlineCount--;
		_listeners.remove(this);		
		System.out.println("onClose called, userCount:" + _onlineCount);
	}
	
	@OnMessage
	public void onMessage(String message)
	{
		try {
			JSONParser jsonParse = new JSONParser();
			JSONObject jsonObj = (JSONObject)jsonParse.parse(message);
			String packet = (String)jsonObj.get("packet");
			String name = (String)jsonObj.get("name");
			if (packet.equals("login"))
			{
				this.name = name;
			}
			else if (packet.equals("position"))
			{
				broadcast(message);
			}
		}
		catch (ParseException e)
		{
			
		}
		
	}
	
	@OnError
	public void onError(Session session, Throwable throwable)
	{
		System.out.println("onClose called, error:" + throwable.getMessage());
		_listeners.remove(this);
	}
	
	public static void broadcast(String message)
	{
		for (WSocket listener : _listeners)
			if (listener.name.equals("mon"))
				listener.sendMessage(message);
	}
	
	private void sendMessage(String message)
	{
		try {
			this.session.getBasicRemote().sendText(message);
		} catch (IOException e) {
			System.out.println("Caught exception while sending message to Session " + this.session.getId() + "error:" + e.getMessage());
		}
	}

}
