//------------------------------------------------------------------------
// Name:    robot_ProtocolData.h
// Author:  ProtocolGenerator (by jjuiddong)
// Date:    
//------------------------------------------------------------------------
#pragma once

namespace robot {

using namespace network2;
using namespace marshalling;


	struct RealTimeInfo_Packet {
		cProtocolDispatcher *pdispatcher;
		netid senderId;
		string msg;
	};



}
