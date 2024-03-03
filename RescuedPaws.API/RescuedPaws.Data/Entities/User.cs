using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Data.Entities
{
    public class User : IdentityUser
    {
        public User(string email, string username)
        {
            this.Email = email;
            this.UserName = username;
        }

        public Guid? ProfileImageId { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public ICollection<Post> Posts { get; set; } = new List<Post>();
        public ICollection<EventUser> GoingOn { get; set; } = new List<EventUser>();
    }
}
