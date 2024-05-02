using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Contracts.Common
{
    public interface IUserDataService
    {
        string[] GetUserPermissions(string userId);
    }
}
