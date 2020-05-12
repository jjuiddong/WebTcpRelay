//------------------------------------------------------------------------
// Name:    robot_ProtocolHandler.h
// Author:  ProtocolGenerator (by jjuiddong)
// Date:    
//------------------------------------------------------------------------
#pragma once

#include "robot_ProtocolData.h"

namespace robot {

using namespace network2;
using namespace marshalling;
static const int s2s_Dispatcher_ID = 100;

// Protocol Dispatcher
class s2s_Dispatcher: public network2::cProtocolDispatcher
{
public:
	s2s_Dispatcher();
protected:
	virtual bool Dispatch(cPacket &packet, const ProtocolHandlers &handlers) override;
};
static s2s_Dispatcher g_robot_s2s_Dispatcher;


// ProtocolHandler
class s2s_ProtocolHandler : virtual public network2::iProtocolHandler
{
	friend class s2s_Dispatcher;
	virtual bool RealTimeInfo(robot::RealTimeInfo_Packet &packet) { return true; }
};


}
