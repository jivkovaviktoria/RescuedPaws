using Microsoft.EntityFrameworkCore;
using RescuedPaws.Data;

public class TestDbContextOptions
{
    public static DbContextOptions<RescuedPawsDbContext> GetOptions(string connectionString)
    {
        return new DbContextOptionsBuilder<RescuedPawsDbContext>()
            .UseSqlServer(connectionString)
            .Options;
    }
}
