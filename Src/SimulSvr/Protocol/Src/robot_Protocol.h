//------------------------------------------------------------------------
// Name:    robot_Protocol.h
// Author:  ProtocolGenerator (by jjuiddong)
// Date:    
//------------------------------------------------------------------------
#pragma once

namespace robot {

using namespace network2;
using namespace marshalling;
static const int s2s_Protocol_ID = 100;

class s2s_Protocol : public network2::iProtocol
{
public:
	s2s_Protocol() : iProtocol(s2s_Protocol_ID) {}
	void RealTimeInfo(netid targetId, const string &msg);
};
}
