using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class AutoMapperProfile:Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Activity,Activity>();
            CreateMap<Activity,ActivityDto>()
            .ForMember(x => x.HostUsername,o=>
            o.MapFrom(j=>j.attendees.FirstOrDefault(c=>c.IsHost).AppUser.UserName))
            .ForMember(x => x.Attendees,o=>o.MapFrom(j=>j.attendees));
            CreateMap<ActivityAttendee,Profiles.Profile>()
            .ForMember(x => x.UserName,o=>o.MapFrom(j=>j.AppUser.UserName))
            .ForMember(x => x.DisplayName,o=>o.MapFrom(j=>j.AppUser.DisplayName))
            .ForMember(x => x.Bio,o=>o.MapFrom(j=>j.AppUser.Bio));
        }
    }
}