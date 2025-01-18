using System.ComponentModel.DataAnnotations;

namespace Janus.Api.Models;

// ReSharper disable once ClassNeverInstantiated.Global
public class AppointmentSlot
{
    [Key] public Guid Id { get; init; }
    public int MaximumAppointments { get; set; }
    public int ConfirmedAppointmentCount { get; set; }
    public required IEnumerable<Appointment> Appointments { get; init; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public bool IsRepeating { get; set; }
    public RepeatType RepeatType { get; set; }
    public DateTime RepeatFromDate { get; set; }
    public DateTime RepeatToDate { get; set; }
    public Guid? ParentAppointmentSlotId { get; set; }
    public AppointmentSlot? ParentAppointmentSlot { get; set; }
    public Guid ServiceId { get; init; }
    public Service? Service { get; init; }

    public IEnumerable<AppointmentSlot> CreateAppointmentSlotChildren()
    {
        if (!IsRepeating || RepeatType is RepeatType.None) return [];

        var children = new List<AppointmentSlot>();
        var currentStart = RepeatFromDate;
        var currentEnd = RepeatFromDate.Add(EndTime - StartTime);

        while (currentStart <= RepeatToDate)
        {
            if (currentStart != StartTime)
            {
                children.Add(new AppointmentSlot
                {
                    Id = Guid.NewGuid(),
                    MaximumAppointments = MaximumAppointments,
                    ConfirmedAppointmentCount = 0,
                    Appointments = [],
                    StartTime = currentStart,
                    EndTime = currentEnd,
                    IsRepeating = false,
                    RepeatType = RepeatType.None,
                    RepeatFromDate = DateTime.MinValue,
                    RepeatToDate = DateTime.MinValue,
                    ParentAppointmentSlotId = Id,
                    ParentAppointmentSlot = this,
                    ServiceId = ServiceId,
                    Service = Service
                });
            }

            currentStart = RepeatType switch
            {
                RepeatType.Daily => currentStart.AddDays(1),
                RepeatType.Weekday =>
                    currentStart.DayOfWeek switch
                    {
                        DayOfWeek.Friday => currentStart.AddDays(3),
                        DayOfWeek.Saturday => currentStart.AddDays(2),
                        _ => currentStart.AddDays(1)
                    },
                RepeatType.Weekly => currentStart.AddDays(7),
                RepeatType.Monthly => currentStart.AddMonths(1),
                RepeatType.None => throw new InvalidOperationException(),
                _ => throw new ArgumentOutOfRangeException()
            };

            currentEnd = currentStart.Add(EndTime - StartTime);
        }

        return children;
    }
}

public class CreateAppointmentSlotDto(
    Guid serviceId,
    DateTime startTime,
    DateTime endTime,
    int maximumAppointments,
    bool isRepeating,
    RepeatType repeatType,
    DateTime? repeatFromDate,
    DateTime? repeatToDate,
    Guid? parentAppointmentSlotId)
{
    public Guid ServiceId { get; } = serviceId;
    public DateTime StartTime { get; } = startTime;
    public DateTime EndTime { get; } = endTime;
    public int MaximumAppointments { get; } = maximumAppointments;
    public bool IsRepeating { get; } = isRepeating;
    public RepeatType RepeatType { get; } = repeatType;
    public DateTime? RepeatFromDate { get; } = repeatFromDate;
    public DateTime? RepeatToDate { get; } = repeatToDate;
    public Guid? ParentAppointmentSlotId { get; } = parentAppointmentSlotId;

    public AppointmentSlot ToAppointmentSlot()
    {
        return new AppointmentSlot
        {
            StartTime = StartTime,
            EndTime = EndTime,
            MaximumAppointments = MaximumAppointments,
            IsRepeating = IsRepeating,
            RepeatType = RepeatType,
            RepeatFromDate = RepeatFromDate ?? new DateTime(), 
            RepeatToDate = RepeatToDate ?? new DateTime(),
            ParentAppointmentSlotId = ParentAppointmentSlotId,
            ServiceId = ServiceId,
            Appointments = []
        };
    }
}