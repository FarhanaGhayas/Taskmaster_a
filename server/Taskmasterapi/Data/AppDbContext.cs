using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
namespace Taskmasterapi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<User> users => Set<User>();
        public DbSet<TaskItem> tasks => Set<TaskItem>();
    } 
}
