using RescuedPaws.Core.Models.Administration.Responses.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Core.Contracts.Administration
{
    public interface IUsersService
    {
        Task<List<UserViewModel>> GetUsers();
        Task<List<UserViewModel>> GetOrganizations();
    }
}
