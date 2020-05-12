
#include "stdafx.h"

using namespace std;
bool g_isLoop = true;

class cSimulationServer : robot::s2s_ProtocolHandler
{
public:
	cSimulationServer() 
		: m_incT(0), m_state(0), m_pos(0,0.5f,0)
	{
		m_client.RegisterProtocol(&m_protocol);
	}

	virtual ~cSimulationServer()
	{
	}

	int Process(const float deltaSeconds) 
	{
		const Vector3 vel(1, 0, 0);

		if (m_client.IsConnect())
		{
			if (m_state == 0)
			{
				const string msg = common::format("{\"packet\":\"login\", \"name\":\"simulator\"}");
				m_protocol.RealTimeInfo(network2::SERVER_NETID, msg);

				m_state = 1;
				return 1;
			}

			static float t = 0;
			t += deltaSeconds * 0.3f;
			m_pos = Vector3(cos(t), 0.f, sin(t)) * 5.f;
			m_pos.y = 0.5f;
			m_incT += deltaSeconds;

			if (m_incT > 0.05f)
			{
				m_incT = 0.f;
				const string msg = common::format("{\"packet\":\"position\", \"name\":\"mon\""
					", \"id\":\"1\", \"x\":%f, \"y\":%f, \"z\":%f}"
					, m_pos.x, m_pos.y, m_pos.z);
				m_protocol.RealTimeInfo(network2::SERVER_NETID, msg);
			}
		}

		return m_client.IsFailConnection()? 0 : 1;
	}


public:
	int m_state;
	float m_incT;
	Vector3 m_pos;

	network2::cTcpClient m_client; // connect to relay server
	robot::s2s_Protocol m_protocol;
};


int MainThreadFunction()
{
	network2::cNetController netController;
	cSimulationServer svr;

	cout << "Try Connect Relay Server~~\n";

	if (!netController.StartTcpClient(&svr.m_client, "127.0.0.1", 10002))
	{
		cout << "Error!! connect relay server\n";
		return 0;
	}

	cout << "Success Connection to Relay Server\n";

	common::cTimer time;
	time.Create();

	while (g_isLoop)
	{
		const double dt = time.GetDeltaSeconds();
		if (svr.Process((float)dt) == 0)
			break;
		netController.Process((float)dt);
		Sleep(1);
	}

	cout << "Finish Simulation Server\n";
	dbg::TerminateLogThread();
	return 1;
}


BOOL CtrlHandler(DWORD fdwCtrlType)
{
	g_isLoop = false;
	return TRUE;
}


int main()
{
	if (!SetConsoleCtrlHandler((PHANDLER_ROUTINE)CtrlHandler, TRUE))
	{
		cout << "SetConsoleCtrlHandler failed, code : " << GetLastError() << endl;
		return -1;
	}

	std::thread thread = std::thread(MainThreadFunction);
	thread.join();
}
