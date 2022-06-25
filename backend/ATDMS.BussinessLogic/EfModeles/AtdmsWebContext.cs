using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace ATDMSAPI.BussinessLogic.EfModeles
{
    public partial class AtdmsWebContext : DbContext
    {
        public AtdmsWebContext()
        {
        }

        public AtdmsWebContext(DbContextOptions<AtdmsWebContext> options)
            : base(options)
        {
        }

        public virtual DbSet<DocumentDetail> DocumentDetails { get; set; }
        public virtual DbSet<DocumentType> DocumentTypes { get; set; }
        public virtual DbSet<EmployeeDetail> EmployeeDetails { get; set; }
        public virtual DbSet<HolidayDetail> HolidayDetails { get; set; }
        public virtual DbSet<LeaveDetail> LeaveDetails { get; set; }
        public virtual DbSet<LeaveType> LeaveTypes { get; set; }
        public virtual DbSet<Project> Projects { get; set; }
        public virtual DbSet<ProjectTask> ProjectTasks { get; set; }
        public virtual DbSet<RoleMaster> RoleMasters { get; set; }
        public virtual DbSet<Timesheet> Timesheets { get; set; }
        public virtual DbSet<UserDetail> UserDetails { get; set; }
        public virtual DbSet<UserRoleMappingDetail> UserRoleMappingDetails { get; set; }
        public virtual DbSet<WeeklyTimeSheet> WeeklyTimeSheets { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-EAJCRE1\\MYPC;Initial Catalog=atdms;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DocumentDetail>(entity =>
            {
                entity.HasKey(e => e.DocumentId);

                entity.Property(e => e.CreatedAt).HasColumnType("datetime");

                entity.Property(e => e.DocumentName).HasMaxLength(100);

                entity.Property(e => e.UniversityName).HasMaxLength(150);

                entity.Property(e => e.UpdatedAt).HasColumnType("datetime");
            });

            modelBuilder.Entity<DocumentType>(entity =>
            {
                entity.HasKey(e => e.DocumentId);

                entity.ToTable("Document_Type");

                entity.Property(e => e.DocumentId).ValueGeneratedNever();
            });

            modelBuilder.Entity<EmployeeDetail>(entity =>
            {
                entity.HasKey(e => e.EmployeeId)
                    .HasName("PK_EmployeeDetails_1");

                entity.Property(e => e.EmployeeId).ValueGeneratedNever();

                entity.Property(e => e.CaddressLine1)
                    .HasMaxLength(150)
                    .HasColumnName("CAddressLine1");

                entity.Property(e => e.CaddressLine2)
                    .HasMaxLength(150)
                    .HasColumnName("CAddressLine2");

                entity.Property(e => e.Ccity)
                    .HasMaxLength(50)
                    .HasColumnName("CCity");

                entity.Property(e => e.ChildName1).HasMaxLength(50);

                entity.Property(e => e.ChildName2).HasMaxLength(50);

                entity.Property(e => e.Cpincode)
                    .HasMaxLength(10)
                    .HasColumnName("CPincode")
                    .IsFixedLength(true);

                entity.Property(e => e.Cpstate)
                    .HasMaxLength(50)
                    .HasColumnName("CPState");

                entity.Property(e => e.CreatedAt).HasColumnType("datetime");

                entity.Property(e => e.DateOfBirth).HasColumnType("date");

                entity.Property(e => e.Department).HasMaxLength(50);

                entity.Property(e => e.Division).HasMaxLength(50);

                entity.Property(e => e.EmailId).HasMaxLength(50);

                entity.Property(e => e.EmployeeNo).HasMaxLength(50);

                entity.Property(e => e.EmployeeStatus).HasMaxLength(50);

                entity.Property(e => e.FirstName).HasMaxLength(50);

                entity.Property(e => e.Gender).HasMaxLength(50);

                entity.Property(e => e.JoiningDate).HasColumnType("date");

                entity.Property(e => e.LastName).HasMaxLength(50);

                entity.Property(e => e.MaritalStatus).HasMaxLength(50);

                entity.Property(e => e.MiddleName).HasMaxLength(50);

                entity.Property(e => e.MobileNo).HasMaxLength(50);

                entity.Property(e => e.MothersName).HasMaxLength(50);

                entity.Property(e => e.PaddressLine1)
                    .HasMaxLength(150)
                    .HasColumnName("PAddressLine1");

                entity.Property(e => e.PaddressLine2)
                    .HasMaxLength(150)
                    .HasColumnName("PAddressLine2");

                entity.Property(e => e.Pcity)
                    .HasMaxLength(150)
                    .HasColumnName("PCity");

                entity.Property(e => e.Ppincode)
                    .HasMaxLength(50)
                    .HasColumnName("PPincode");

                entity.Property(e => e.Pstate)
                    .HasMaxLength(150)
                    .HasColumnName("PState");

                entity.Property(e => e.SpouseName).HasMaxLength(50);

                entity.Property(e => e.UpdatedAt).HasColumnType("datetime");
            });

            modelBuilder.Entity<HolidayDetail>(entity =>
            {
                entity.HasKey(e => e.HolidayId);

                entity.Property(e => e.HolidayId).ValueGeneratedNever();

                entity.Property(e => e.AddedBy).HasColumnType("datetime");

                entity.Property(e => e.AddedOn).HasColumnType("datetime");

                entity.Property(e => e.Date).HasColumnType("date");
            });

            modelBuilder.Entity<LeaveDetail>(entity =>
            {
                entity.HasKey(e => e.LeaveId);

                entity.Property(e => e.CreatedBy).HasMaxLength(50);

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.FromDate).HasColumnType("datetime");

                entity.Property(e => e.LeaveTypeFrom).HasMaxLength(50);

                entity.Property(e => e.LeaveTypeTo).HasMaxLength(50);

                entity.Property(e => e.ToDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<LeaveType>(entity =>
            {
                entity.HasKey(e => e.LeaveId);

                entity.ToTable("LeaveType");

                entity.Property(e => e.LeaveId).ValueGeneratedNever();

                entity.Property(e => e.LeaveName).HasMaxLength(50);
            });

            modelBuilder.Entity<Project>(entity =>
            {
                entity.Property(e => e.ProjectName).HasMaxLength(50);
            });

            modelBuilder.Entity<ProjectTask>(entity =>
            {
                entity.HasKey(e => e.ProjectsTaskId);

                entity.Property(e => e.ProjectsTaskType).HasMaxLength(50);
            });

            modelBuilder.Entity<RoleMaster>(entity =>
            {
                entity.HasKey(e => e.RoleId)
                    .HasName("PK_RollMaster");

                entity.ToTable("RoleMaster");

                entity.Property(e => e.RoleId).ValueGeneratedNever();
            });

            modelBuilder.Entity<Timesheet>(entity =>
            {
                entity.HasKey(e => e.WorkingHourId);

                entity.Property(e => e.CreatedBy).HasMaxLength(50);

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.WorkingDay).HasColumnType("date");
            });

            modelBuilder.Entity<UserDetail>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.Property(e => e.CreatedAt).HasColumnType("datetime");
            });

            modelBuilder.Entity<UserRoleMappingDetail>(entity =>
            {
                entity.HasKey(e => e.UserRoleMapId);
            });

            modelBuilder.Entity<WeeklyTimeSheet>(entity =>
            {
                entity.HasKey(e => e.TimeSheetId);

                entity.ToTable("WeeklyTimeSheet");

                entity.Property(e => e.TimeSheetId).HasColumnName("TimeSheetID");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasColumnName("createdBy");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.FridayDate).HasColumnType("date");

                entity.Property(e => e.FridayDescription).HasMaxLength(50);

                entity.Property(e => e.MondayDate).HasColumnType("date");

                entity.Property(e => e.MondayDescription).HasMaxLength(50);

                entity.Property(e => e.SaturdayDate).HasColumnType("date");

                entity.Property(e => e.SaturdayDescription).HasMaxLength(50);

                entity.Property(e => e.Status).HasMaxLength(50);

                entity.Property(e => e.SundayDate).HasColumnType("date");

                entity.Property(e => e.SundayDescription).HasMaxLength(50);

                entity.Property(e => e.ThursdayDate).HasColumnType("date");

                entity.Property(e => e.ThursdayDescription).HasMaxLength(50);

                entity.Property(e => e.TuesdayDate).HasColumnType("date");

                entity.Property(e => e.TuesdayDescription).HasMaxLength(50);

                entity.Property(e => e.WednesdayDate).HasColumnType("date");

                entity.Property(e => e.WednesdayDescription).HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
