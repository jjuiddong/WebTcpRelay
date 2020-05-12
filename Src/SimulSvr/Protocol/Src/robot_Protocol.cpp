#include "stdafx.h"
#include "robot_Protocol.h"
using namespace robot;

//------------------------------------------------------------------------
// Protocol: RealTimeInfo
//------------------------------------------------------------------------
void robot::s2s_Protocol::RealTimeInfo(netid targetId, const string &msg)
{
	cPacket packet(m_node->GetPacketHeader());
	packet.SetProtocolId( GetId() );
	packet.SetPacketId( 2807786615 );
	packet << msg;
	AddDelimeter(packet);
	packet.EndPack();
	GetNode()->Send(targetId, packet);
}



