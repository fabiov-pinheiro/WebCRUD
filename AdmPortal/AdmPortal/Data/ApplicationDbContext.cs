using AdmPortal.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace AdmPortal.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Produto> Produtos { get; set; }
    }
}
