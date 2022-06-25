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

        public virtual DbSet<AccessoriesStorage> AccessoriesStorages { get; set; }
        public virtual DbSet<Accessory> Accessories { get; set; }
        public virtual DbSet<AssignProject> AssignProjects { get; set; }
        public virtual DbSet<DocumentDetail> DocumentDetails { get; set; }
        public virtual DbSet<DocumentType> DocumentTypes { get; set; }
        public virtual DbSet<EmpInfo> EmpInfos { get; set; }
        public virtual DbSet<EmployeeDetail> EmployeeDetails { get; set; }
        public virtual DbSet<EmployeeProject> EmployeeProjects { get; set; }
        public virtual DbSet<EmployeeSkillSet> EmployeeSkillSets { get; set; }
        public virtual DbSet<Forgotpassword> Forgotpasswords { get; set; }
        public virtual DbSet<Highlight> Highlights { get; set; }
        public virtual DbSet<HolidayDetail> HolidayDetails { get; set; }
        public virtual DbSet<InterviewDetail> InterviewDetails { get; set; }
        public virtual DbSet<LeaveDetail> LeaveDetails { get; set; }
        public virtual DbSet<LeaveType> LeaveTypes { get; set; }
        public virtual DbSet<Module> Modules { get; set; }
        public virtual DbSet<OfficialDocument> OfficialDocuments { get; set; }
        public virtual DbSet<PermissionMaster> PermissionMasters { get; set; }
        public virtual DbSet<Project> Projects { get; set; }
        public virtual DbSet<ProjectTask> ProjectTasks { get; set; }
        public virtual DbSet<RoleMaster> RoleMasters { get; set; }
        public virtual DbSet<RolePermission> RolePermissions { get; set; }
        public virtual DbSet<Timesheet> Timesheets { get; set; }
        public virtual DbSet<ToDoList> ToDoLists { get; set; }
        public virtual DbSet<UserDetail> UserDetails { get; set; }
        public virtual DbSet<UserRoleMappingDetail> UserRoleMappingDetails { get; set; }
        public virtual DbSet<WeeklyTimeSheet> WeeklyTimeSheets { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=SQL5079.site4now.net;Initial Catalog=db_a7ad44_hradmin;User Id=db_a7ad44_hradmin_admin;Password=Dev@654321");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AccessoriesStorage>(entity =>
            {
                entity.ToTable("AccessoriesStorage");

                entity.Property(e => e.AccessoriesName).HasMaxLength(50);

                entity.Property(e => e.AccessoriesStorage1).HasColumnName("AccessoriesStorage");
            });

            modelBuilder.Entity<Accessory>(entity =>
            {
                entity.HasKey(e => e.AccessoriesId);

                entity.Property(e => e.DateOfIssues).HasColumnType("datetime");

                entity.Property(e => e.DateOfReturn).HasColumnType("datetime");
            });

            modelBuilder.Entity<AssignProject>(entity =>
            {
                entity.Property(e => e.AssignProjectId).ValueGeneratedNever();

                entity.Property(e => e.AddedOn).HasColumnType("datetime");

                entity.Property(e => e.UpdatedOn).HasColumnType("date");
            });

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

            modelBuilder.Entity<EmpInfo>(entity =>
            {
                entity.ToTable("EmpInfo");

                entity.Property(e => e.Anniversary).HasColumnType("datetime");

                entity.Property(e => e.BloodGroup).HasMaxLength(10);

                entity.Property(e => e.EmgContNo)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.PersonalEmail)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.SkillSet)
                    .IsRequired()
                    .HasMaxLength(50);
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
                    .HasMaxLength(6)
                    .HasColumnName("CPincode");

                entity.Property(e => e.Cpstate)
                    .HasMaxLength(50)
                    .HasColumnName("CPState");

                entity.Property(e => e.CreatedAt).HasColumnType("datetime");

                entity.Property(e => e.DateOfBirth).HasColumnType("date");

                entity.Property(e => e.Department).HasMaxLength(50);

                entity.Property(e => e.Division).HasMaxLength(50);

                entity.Property(e => e.EmailId).HasMaxLength(50);

                entity.Property(e => e.EmergencyNo).HasMaxLength(50);

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

            modelBuilder.Entity<EmployeeProject>(entity =>
            {
                entity.Property(e => e.AddedOn).HasColumnType("datetime");

                entity.Property(e => e.UpdatedOn).HasColumnType("date");
            });

            modelBuilder.Entity<EmployeeSkillSet>(entity =>
            {
                entity.HasKey(e => e.SkillId);

                entity.ToTable("EmployeeSkillSet");

                entity.Property(e => e.SkillDescription)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Forgotpassword>(entity =>
            {
                entity.ToTable("Forgotpassword");

                entity.Property(e => e.Code).HasMaxLength(50);

                entity.Property(e => e.ExpiryTime).HasColumnType("datetime");
            });

            modelBuilder.Entity<Highlight>(entity =>
            {
                entity.HasKey(e => e.HighlightsId);

                entity.Property(e => e.HighlightsId).HasColumnName("highlightsId");

                entity.Property(e => e.HighlightsDescription).HasColumnName("highlightsDescription");

                entity.Property(e => e.HighlightsPath).HasColumnName("highlightsPath");

                entity.Property(e => e.HighlightsTitle)
                    .HasMaxLength(50)
                    .HasColumnName("highlightsTitle");
            });

            modelBuilder.Entity<HolidayDetail>(entity =>
            {
                entity.HasKey(e => e.HolidayId);

                entity.Property(e => e.HolidayId).ValueGeneratedNever();

                entity.Property(e => e.AddedBy).HasColumnType("datetime");

                entity.Property(e => e.AddedOn).HasColumnType("datetime");

                entity.Property(e => e.Date).HasColumnType("date");

                entity.Property(e => e.UpdatedOn).HasColumnType("date");
            });

            modelBuilder.Entity<InterviewDetail>(entity =>
            {
                entity.HasKey(e => e.CandidateId);

                entity.Property(e => e.CandidateId).HasColumnName("candidateId");

                entity.Property(e => e.CandidateName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("candidateName");

                entity.Property(e => e.Designation)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("designation");

                entity.Property(e => e.FeedbackByInterviewer).HasColumnName("feedbackByInterviewer");

                entity.Property(e => e.InterviewerName)
                    .HasMaxLength(50)
                    .HasColumnName("interviewerName");

                entity.Property(e => e.RefralName)
                    .HasMaxLength(50)
                    .HasColumnName("refralName");

                entity.Property(e => e.ScheduleDate)
                    .HasColumnType("datetime")
                    .HasColumnName("scheduleDate");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("status");
            });

            modelBuilder.Entity<LeaveDetail>(entity =>
            {
                entity.HasKey(e => e.LeaveId);

                entity.Property(e => e.CreatedBy).HasMaxLength(50);

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.FromDate).HasColumnType("datetime");

                entity.Property(e => e.LeaveBalance).HasColumnType("numeric(18, 2)");

                entity.Property(e => e.LeaveStatus).HasMaxLength(50);

                entity.Property(e => e.LeaveTypeFrom).HasMaxLength(50);

                entity.Property(e => e.LeaveTypeTo).HasMaxLength(50);

                entity.Property(e => e.ToDate).HasColumnType("datetime");

                entity.Property(e => e.UpdatedOn).HasColumnType("date");
            });

            modelBuilder.Entity<LeaveType>(entity =>
            {
                entity.HasKey(e => e.LeaveId);

                entity.ToTable("LeaveType");

                entity.Property(e => e.LeaveId).ValueGeneratedNever();

                entity.Property(e => e.AssignedDays)
                    .HasColumnType("numeric(18, 2)")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.LeaveName).HasMaxLength(50);
            });

            modelBuilder.Entity<Module>(entity =>
            {
                entity.Property(e => e.AddedOn).HasColumnType("datetime");

                entity.Property(e => e.ModuleDesc).HasMaxLength(50);

                entity.Property(e => e.ModuleName).HasMaxLength(50);

                entity.Property(e => e.OrderById).HasColumnName("orderById");
            });

            modelBuilder.Entity<OfficialDocument>(entity =>
            {
                entity.HasKey(e => e.DocumentId);

                entity.ToTable("OfficialDocument");

                entity.Property(e => e.Ctc).HasColumnName("CTC");

                entity.Property(e => e.Designation).HasMaxLength(50);

                entity.Property(e => e.DocumentDate).HasColumnType("datetime");

                entity.Property(e => e.DocumentName).HasMaxLength(50);

                entity.Property(e => e.EmailId).HasMaxLength(50);

                entity.Property(e => e.EmployeeName).HasMaxLength(50);

                entity.Property(e => e.MobileNo).HasMaxLength(50);

                entity.Property(e => e.ReferenceNo).HasMaxLength(50);

                entity.Property(e => e.Status).HasMaxLength(50);
            });

            modelBuilder.Entity<PermissionMaster>(entity =>
            {
                entity.HasKey(e => e.PermissionId);

                entity.ToTable("PermissionMaster");

                entity.Property(e => e.PermissionName)
                    .IsRequired()
                    .HasMaxLength(50);
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

                entity.Property(e => e.AddedOn).HasColumnType("datetime");
            });

            modelBuilder.Entity<RolePermission>(entity =>
            {
                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");
            });

            modelBuilder.Entity<Timesheet>(entity =>
            {
                entity.HasKey(e => e.WorkingHourId);

                entity.Property(e => e.CreatedBy).HasMaxLength(50);

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.UpdatedOn).HasColumnType("date");

                entity.Property(e => e.WorkingDay).HasColumnType("date");
            });

            modelBuilder.Entity<ToDoList>(entity =>
            {
                entity.HasKey(e => e.ToDoId);

                entity.ToTable("ToDoList");

                entity.Property(e => e.Description).HasMaxLength(50);
            });

            modelBuilder.Entity<UserDetail>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.Property(e => e.CreatedAt).HasColumnType("datetime");

                entity.Property(e => e.UpdatedOn).HasColumnType("date");
            });

            modelBuilder.Entity<UserRoleMappingDetail>(entity =>
            {
                entity.HasKey(e => e.UserRoleMapId);
            });

            modelBuilder.Entity<WeeklyTimeSheet>(entity =>
            {
                entity.HasKey(e => e.TimeSheetId)
                    .HasName("PK_WeeklyTimeSheet");

                entity.Property(e => e.TimeSheetId).HasColumnName("TimeSheetID");

                entity.Property(e => e.CreatedBy).HasColumnName("createdBy");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.FridayDate).HasColumnType("date");

                entity.Property(e => e.MondayDate).HasColumnType("date");

                entity.Property(e => e.Reason).HasMaxLength(50);

                entity.Property(e => e.SaturdayDate).HasColumnType("date");

                entity.Property(e => e.Status).HasMaxLength(50);

                entity.Property(e => e.SundayDate).HasColumnType("date");

                entity.Property(e => e.ThursdayDate).HasColumnType("date");

                entity.Property(e => e.TuesdayDate).HasColumnType("date");

                entity.Property(e => e.UpdatedOn).HasColumnType("date");

                entity.Property(e => e.WednesdayDate).HasColumnType("date");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
