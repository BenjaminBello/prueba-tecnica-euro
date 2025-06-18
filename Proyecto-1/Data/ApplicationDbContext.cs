using Proyecto_1.Entities;
using Microsoft.EntityFrameworkCore;

namespace Proyecto_1.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Unit> Units { get; set; }
        public DbSet<Owner> Owners { get; set; }
        public DbSet<Ownership> Ownerships { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            
            modelBuilder.Entity<Unit>()
                .HasIndex(u => new { u.Number, u.Address })
                .IsUnique();

            
            modelBuilder.Entity<Ownership>()
                .HasKey(o => new { o.OwnerId, o.UnitId });
        }
    }
}
