using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace SignalRTDC.hubs
{
    public class mensajesHub : Hub
    {
        //IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<mensajesHub>();
        static List<Cliente> conn = new List<Cliente>();

        public override Task OnConnected()
        {
            var serverVars = Context.Request.GetHttpContext().Request.ServerVariables;
            var Ip = serverVars["REMOTE_ADDR"];

            var o = conn.Find(c => c.Id == Context.ConnectionId);
            if(o == null)
            {
                conn.Add(new Cliente()
                {
                    Id = Context.ConnectionId,
                    Navegador = Context.Request.Headers["user-agent"] ?? String.Empty,
                    IP = Ip
                });
            }
            Clients.Client(Context.ConnectionId).Saludos(Context.ConnectionId);
            Clients.All.Listar(conn.ToArray());
            return base.OnConnected();
        }

        public override Task OnReconnected()
        {
            var serverVars = Context.Request.GetHttpContext().Request.ServerVariables;
            var Ip = serverVars["REMOTE_ADDR"];

            var o = conn.Find(c => c.Id == Context.ConnectionId);
            if (o == null)
            {
                conn.Add(new Cliente()
                {
                    Id = Context.ConnectionId,
                    Navegador = Context.Request.Headers["user-agent"] ?? String.Empty,
                    IP = Ip
                });
            }
            Clients.Client(Context.ConnectionId).Saludos(Context.ConnectionId);
            Clients.All.Listar(conn.ToArray());
            return base.OnReconnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            var o = conn.Find(c => c.Id == Context.ConnectionId);
            if (o != null)
            {
                conn.Remove(o);
            }
            Clients.Client(Context.ConnectionId).Saludos(Context.ConnectionId);
            Clients.Others.Listar(conn.ToArray());
            return base.OnDisconnected(stopCalled);
        }

        public void Saludar(string msj)
        {
            Clients.Others.SaludosDe(Context.ConnectionId, msj);
        }

        public class Cliente
        {
            public string Id { get; set; }
            public string Navegador { get; set; }
            public string IP { get; set; }
        }
    }
}