using RescuedPaws.Data.Contracts.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RescuedPaws.Data.Entities
{
    public class Video : IEntity
    {
        public Guid Id { get; set; }
        public string Url { get; set; }
        public Guid? PostID { get; set; }
        public Post? Post { get; set; }
        public Guid? SuccessStoryID { get; set; }
        public SuccessStory? SuccessStory { get; set; }
    }
}
