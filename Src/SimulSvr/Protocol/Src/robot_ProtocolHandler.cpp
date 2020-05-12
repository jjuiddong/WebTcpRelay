#include "stdafx.h"
#include "robot_ProtocolHandler.h"

using namespace robot;


robot::s2s_Dispatcher::s2s_Dispatcher()
	: cProtocolDispatcher(robot::s2s_Dispatcher_ID)
{
	cProtocolDispatcher::GetDispatcherMap()->insert({s2s_Dispatcher_ID, this });
}

//------------------------------------------------------------------------
// ��Ŷ�� �������ݿ� ���� �ش��ϴ� �ڵ鷯�� ȣ���Ѵ�.
//------------------------------------------------------------------------
bool robot::s2s_Dispatcher::Dispatch(cPacket &packet, const ProtocolHandlers &handlers)
{
	const int protocolId = packet.GetProtocolId();
	const int packetId = packet.GetPacketId();
	switch (packetId)
	{
	case 2807786615:
		{
			ProtocolHandlers prtHandler;
			if (!HandlerMatching<s2s_ProtocolHandler>(handlers, prtHandler))
				return false;

			SetCurrentDispatchPacket( &packet );

			RealTimeInfo_Packet data;
			data.pdispatcher = this;
			data.senderId = packet.GetSenderId();
			packet >> data.msg;
			SEND_HANDLER(s2s_ProtocolHandler, prtHandler, RealTimeInfo(data));
		}
		break;

	default:
		assert(0);
		break;
	}
	return true;
}



