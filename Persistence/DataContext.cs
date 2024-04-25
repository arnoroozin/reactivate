using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<ActivityAttendee> activityAttendees { get; set; }

        protected override void OnModelCreating(ModelBuilder builder){
            base.OnModelCreating(builder);
            builder.Entity<ActivityAttendee>(o => o.HasKey(a =>new {a.AppUserId,a.ActivityId}));
            builder.Entity<ActivityAttendee>()
            .HasOne(a => a.Activity)
            .WithMany(u => u.attendees).HasForeignKey(a=>a.ActivityId);
            builder.Entity<ActivityAttendee>()
            .HasOne<AppUser>().WithMany(u => u.Activities)
            .HasForeignKey(a=>a.AppUserId);

        }
    }
}